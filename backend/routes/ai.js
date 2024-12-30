const express = require('express');
const axios = require('axios'); // For sending requests to Gemini API
const pdfParse = require('pdf-parse'); // For PDF text extraction
const mammoth = require('mammoth'); // For DOCX text extraction
const multer = require('multer'); // For handling file uploads
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Set up multer to store the file in memory
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Define the Gemini API endpoint and API key (replace with actual)
const GEMINI_API_KEY = 'AIzaSyCRTW69xL9c7Ht8Wo7MwN5Fk6UupDQalEU'; // Replace with your actual API key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const queryGemini = async (prompt) => {
    try {
        const url = GEMINI_API_URL;

        const requestBody = JSON.stringify({
            contents: [
                {
                    parts: [{ text: prompt }], // Assuming this is the correct structure
                },
            ],
        });

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error(`Gemini API request failed with status ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        // Safely access the similarity score from the response
        const candidates = result?.candidates;
        if (Array.isArray(candidates) && candidates[0]?.content?.parts?.[0]?.text) {
            return candidates[0].content.parts[0].text.trim(); // Return the similarity score or content
        } else {
            throw new Error("Invalid response format from Gemini API.");
        }
    } catch (error) {
        console.error("Error querying Gemini API:", error);
        throw error; // Propagate the error to the caller for handling
    }
}

// Helper function to extract text from a PDF
const extractTextFromPDF = async (pdfBuffer) => {
    try {
        // Ensure the buffer is in the correct format
        const buffer = Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer);

        const data = await pdfParse(buffer);
        return data.text;
    } catch (error) {
        throw new Error('Error extracting text from PDF: ' + error.message);
    }
};


// Helper function to extract text from a DOCX file
const extractTextFromDOCX = async (docxBuffer) => {
    try {
        const { value } = await mammoth.extractRawText({ buffer: docxBuffer });
        return value;
    } catch (error) {
        throw new Error('Error extracting text from DOCX: ' + error.message);
    }
};

// Backend route to get similarity score
router.post('/getSimilarityScore', upload.single('resume'), authenticate, async (req, res) => {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    if (!jobDescription || !resumeFile) {
        return res.status(400).json({ error: 'Both job description and resume are required.' });
    }

    // Extract text from the resume file based on its type
    let resumeText = '';
    try {
        if (resumeFile.mimetype === 'application/pdf') {
            resumeText = await extractTextFromPDF(resumeFile.buffer);
        } else if (resumeFile.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            resumeText = await extractTextFromDOCX(resumeFile.buffer);
        } else {
            return res.status(400).json({ error: 'Unsupported resume file format. Please upload a PDF or DOCX file.' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Error extracting text from resume: ${error.message}` });
    }

    // Define the prompt for Gemini
    const prompt = `
    I am an Applicant Tracking System (ATS) that analyzes resumes against job descriptions who is very strict and analyzes each and every point with utmost care. Given the following job description and resume text, please calculate a similarity score based on how well the resume matches the job requirements. The score should be between 0 and 100, where 100 means a perfect match, and 0 means no match. Consider factors like relevant experience, skills, job responsibilities, and qualifications.

    ### Job Description:
    ${jobDescription}

    ### Resume:
    ${resumeText}

    Please provide the similarity score based on the relevance of the resume to the job description first then provide the reason for the same as well. The format should be like Similarity score: (Calculated score) Reason: (Found reasons)
    `;

    // Inside your main route handler:
    try {
        const responseContent = await queryGemini(prompt);

        if (!responseContent) {
            return res.status(500).json({ error: 'Failed to calculate similarity score.' });
        }

        // Parse the responseContent to extract similarity score and reasons
        const similarityScoreMatch = responseContent.match(/Similarity score:\s*(\d+)/);
        const reasonMatch = responseContent.match(/Reason:\s*(.+)/s);

        const similarityScore = similarityScoreMatch ? parseInt(similarityScoreMatch[1], 10) : null;
        const scoreReason = reasonMatch ? reasonMatch[1].trim() : null;

        if (similarityScore === null || !scoreReason) {
            return res.status(500).json({ error: 'Failed to parse the response content.' });
        }

        return res.json({ similarityScore, scoreReason });


    } catch (error) {
        console.error('Error querying Gemini API:', error);
        return res.status(500).json({ error: 'An error occurred while querying Gemini API.' });
    }


});

router.post('/getReferralText', upload.single('resume'), authenticate, async (req, res) => {
    const { jobDescription } = req.body;
    const resumeFile = req.file;
    console.log(resumeFile);

    if (!jobDescription || !resumeFile) {
        return res.status(400).json({ error: 'Job description and resume are required.' });
    }

    // Extract text from the resume file based on its type
    let resumeText = '';
    try {
        if (resumeFile.mimetype === 'application/pdf') {
            resumeText = await extractTextFromPDF(resumeFile.buffer);
        } else if (resumeFile.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            resumeText = await extractTextFromDOCX(resumeFile.buffer);
        } else {
            return res.status(400).json({ error: 'Unsupported resume file format. Please upload a PDF or DOCX file.' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Error extracting text from resume: ${error.message}` });
    }

    try {
        // Prompt for the AI to generate a referral message
        const prompt = `
        Assume the user is a job seeker applying for the role described below. Using their resume content and the job description, 
        create a professional self-referral message they can send to someone in the company to request a referral.
        The message should be polite, concise, and emphasize why they are a strong fit for the role.

        Include the following in the message:
        - A professional introduction.
        - Brief mention of the user's skills and achievements from the resume.
        - An explanation of how these align with the job description.
        - A request for the referral.

        Job Description:
        ${jobDescription}

        Candidate Resume:
        ${resumeText}

        Referral Message:
        `;

        // Use queryGemini to get the AI-generated referral message
        const referralMessage = await queryGemini(prompt);

        if (!referralMessage) {
            throw new Error('Failed to generate referral message.');
        }

        console.log(referralMessage);

        // Respond with the referral message
        res.json({ referralMessage });
    } catch (error) {
        console.error('Error generating referral message:', error);
        res.status(500).json({ error: 'An error occurred while generating the referral message.' });
    }
});

module.exports = router;
