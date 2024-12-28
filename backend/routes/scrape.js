const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { authenticate } = require('../middleware/auth');

puppeteer.use(StealthPlugin());
const router = express.Router();

router.post('/scrape', authenticate, async (req, res) => {
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

        res.json({ profiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error during scraping' });
    } finally {
        if (browser) await browser.close();
    }
});

module.exports = router;
