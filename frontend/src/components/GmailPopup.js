import React, { useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '505792993495-s0fuo4pilb8k9u2tj0u3ggv75os3vjl1.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDViSkkMRFM8SMDg-gA0_Aefjy6YfQkeF0';
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
const GEMINI_API_KEY = 'AIzaSyCRTW69xL9c7Ht8Wo7MwN5Fk6UupDQalEU';

const GmailPopup = ({ isConnected, onConnect }) => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to clean up and extract JSON from wrapped string
    function extractJSON(rawResponse) {
        try {
            const cleanedString = rawResponse.replace(/```[a-z]*\n|```/g, "").trim();
            return JSON.parse(cleanedString);
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return null;
        }
    }

    async function queryGemini(email) {
        try {
            const prompt = `You are an assistant that extracts job application details from email content. Check if the email is about a job application, if yes then return a JSON object with: - "company": the company name, - "role_name": the job role mentioned, - "application_submitted": true if it seems like an application was submitted. If its not about a job application, return NA for all fields. Text: ${email}`;
            const url =
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
            const data = JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            });

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            });

            if (!response.ok) {
                throw new Error(`Gemini API request failed: ${response.statusText}`);
            }

            const result = await response.json();
            return result.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Error querying Gemini API:", error);
            return "Error querying API";
        }
    }

    const handleConnectGmail = () => {
        gapi.load('client:auth2', async () => {
            try {
                await gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
                    scope: SCOPES,
                });

                const authInstance = gapi.auth2.getAuthInstance();
                const isSignedIn = authInstance.isSignedIn.get();

                if (!isSignedIn) {
                    await authInstance.signIn();
                }

                onConnect(); // Update parent state
                fetchEmails(); // Fetch top 10 emails
            } catch (err) {
                console.error('Error connecting to Gmail:', err);
            }
        });
    };

    const fetchEmails = async () => {
        setLoading(true);
        try {
            const response = await gapi.client.gmail.users.messages.list({
                userId: 'me',
                maxResults: 10,
            });

            const messagePromises = response.result.messages.map((message) =>
                gapi.client.gmail.users.messages.get({
                    userId: 'me',
                    id: message.id,
                })
            );

            const messages = await Promise.all(messagePromises);

            const emailDataPromises = messages.map(async (message) => {
                const headers = message.result.payload.headers;
                const subject = headers.find((header) => header.name === 'Subject')?.value;
                const from = headers.find((header) => header.name === 'From')?.value;
                const dateHeader = headers.find((header) => header.name === 'Date')?.value;
                const date = dateHeader ? new Date(dateHeader).toLocaleString() : 'Unknown Date';

                let body = '';

                // Extract the body from the message payload
                if (message.result.payload.parts) {
                    const part = message.result.payload.parts.find(
                        (part) => part.mimeType === 'text/plain' || part.mimeType === 'text/html'
                    );

                    if (part && part.body?.data) {
                        body = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
                    }
                } else if (message.result.payload.body?.data) {
                    body = atob(message.result.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
                }

                // Call queryGemini for each email body
                const geminiResult = await queryGemini(body);
                const result = extractJSON(geminiResult);
                result.user_email = localStorage.getItem("userEmail");
                result.current_date = date;
                result.is_careers_page = 'Yes';
                console.log('Gemini Result for Email:', result);


                fetch("https://job-tracker-production-e381.up.railway.app/api/app/apply", {
                    method: "POST",
                    body: JSON.stringify(result),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    }
                })
                    .then(response => response.json())
                    .then(json => console.log(json))
                    .catch(error => console.error("Error submitting application:", error));


                return { subject, from, body, geminiResult };
            });

            const emailData = await Promise.all(emailDataPromises);
            setEmails(emailData);
        } catch (err) {
            console.error('Error fetching emails:', err);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="gmail-popup">
            {!isConnected ? (
                <button
                    onClick={handleConnectGmail}
                    className="py-2 px-6 rounded-lg bg-gradient-to-r from-[#ff0088] to-[#ff8800] text-white font-medium hover:opacity-90 transition ease-in-out duration-300"
                >
                    Connect Gmail
                </button>
            ) : (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Recent Emails</h3>
                    {loading ? (
                        <p>Loading emails...</p>
                    ) : emails.length > 0 ? (
                        <ul className="text-gray-100">
                            {emails.map((email, index) => (
                                <li key={index} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-md">
                                    <p>
                                        <strong>From:</strong> {email.from}
                                    </p>
                                    <p>
                                        <strong>Subject:</strong> {email.subject}
                                    </p>
                                    <p>
                                        <strong>Body:</strong> {email.body || 'No body content available'}
                                    </p>
                                </li>
                            ))}
                        </ul>

                    ) : (
                        <p>No emails found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GmailPopup;
