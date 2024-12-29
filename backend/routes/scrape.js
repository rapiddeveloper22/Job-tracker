const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { authenticate } = require('../middleware/auth');

puppeteer.use(StealthPlugin());
const router = express.Router();

router.post('/scrapeLinkedInProfiles', authenticate, async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    let browser;
    try {
        browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        const sanitizeQuery = (query) => query.replace(/[^a-zA-Z0-9\s]/g, '');
        const safeQuery = sanitizeQuery(query);
        const searchQuery = `site:linkedin.com/in/ ${safeQuery}`;

        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, {
            waitUntil: 'domcontentloaded',
        });

        // Wait for results to load
        await page.waitForSelector('div#search', { timeout: 10000 });

        // Extract LinkedIn profile links
        const profiles = await page.evaluate(() => {
            const extractNameFromTitle = (title) => {
                if (!title) return null;
                const parts = title.split('-');
                return parts.length > 1 ? parts[0].trim() : title.trim();
            };

            const extractJObFromTitle = (title) => {
                if (!title) return null;
                const parts = title.split('-');
                return parts.length > 1 ? parts.slice(1).join('-').trim() : '';
            };

            const results = [];
            const items = document.querySelectorAll('div#search .tF2Cxc');

            items.forEach((item) => {
                const title = item.querySelector('h3')?.innerText || 'No name available';
                const name = extractNameFromTitle(title);
                const job = extractJObFromTitle(title);
                const snippet = item.querySelector('.IsZvec')?.innerText || '';
                const link = item.querySelector('a')?.href;

                if (link && link.includes('linkedin.com/in/')) {
                    results.push({ name, job, snippet, link });
                }
            });

            return results;
        });

        // console.log(profiles);

        res.json({ profiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error during scraping' });
    } finally {
        if (browser) await browser.close();
    }
});

router.post('/scrapeJobDescription', authenticate, async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Job link is required.' });
    }

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
        );

        // Navigate to the job posting URL
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

        // Extract JSON-LD structured data
        const jobDescriptionFromJSONLD = await page.evaluate(() => {
            const scriptTags = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
            for (const script of scriptTags) {
                try {
                    const jsonData = JSON.parse(script.textContent);
                    if (jsonData["@type"] === "JobPosting" && jsonData.description) {
                        return jsonData.description.trim();
                    }
                } catch (e) {
                    // Ignore parsing errors and continue
                }
            }
            return null;
        });

        let jobDescription = jobDescriptionFromJSONLD;

        // If JSON-LD is not found, fallback to visible content extraction
        if (!jobDescription) {
            jobDescription = await page.evaluate(() => {
                const keywords = [
                    'job description',
                    'responsibilities',
                    'qualifications',
                    'requirements',
                    'about the role',
                    'about the position',
                ];
                const allElements = Array.from(document.querySelectorAll('*'));
                let bestMatch = null;
                let maxKeywordsFound = 0;

                allElements.forEach((element) => {
                    const text = element.innerText;
                    if (text && typeof text === 'string') {
                        const lowerText = text.toLowerCase();
                        const keywordCount = keywords.filter((keyword) =>
                            lowerText.includes(keyword)
                        ).length;

                        if (keywordCount > maxKeywordsFound && lowerText.length > 100) {
                            maxKeywordsFound = keywordCount;
                            bestMatch = lowerText.trim();
                        }
                    }
                });

                return bestMatch;
            });
        }

        await browser.close();

        // Return the result
        if (jobDescription) {
            return res.json({ jobDescription });
        } else {
            return res.status(404).json({ error: 'Job description not found. Please check the link or provide manually.' });
        }
    } catch (error) {
        console.error('Error scraping job description:', error);
        return res.status(500).json({ error: 'An error occurred while scraping the job description.' });
    }
});



module.exports = router;
