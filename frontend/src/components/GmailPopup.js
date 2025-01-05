import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import API_CONFIG from '../apiConfig';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const API_KEY = process.env.REACT_APP_API_KEY;
const SCOPES = process.env.REACT_APP_SCOPES;

const GmailPopup = ({ isConnected, onConnect, onClose }) => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [showPopup, setShowPopup] = useState(true); // State for controlling the popup visibility

    useEffect(() => {
        const isGmailConnected = localStorage.getItem('isGmailConnected') === 'true';
        if (isGmailConnected) {
            handleAutoConnectGmail();
        }
    }, []);

    function extractJSON(rawResponse) {
        try {
            const cleanedString = rawResponse.replace(/```[a-z]*\n|```/g, "").trim();
            return JSON.parse(cleanedString);
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return null;
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

                onConnect();
                localStorage.setItem('isGmailConnected', 'true');
                fetchEmails();
                // setShowPopup(false); // Close popup after successful connection
            } catch (err) {
                console.error('Error connecting to Gmail:', err);
            }
        });
    };

    const handleAutoConnectGmail = () => {
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

                if (isSignedIn) {
                    fetchEmails();
                } else {
                    localStorage.removeItem('isGmailConnected');
                }
            } catch (err) {
                console.error('Error during auto-connect to Gmail:', err);
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

                var apiCall = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AI.EXTENSIONCALL}`, {
                    method: "POST",
                    body: JSON.stringify({ bodyText: body }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    }
                })

                const geminiResult = await apiCall.json();
                const result = extractJSON(geminiResult);
                result.user_email = localStorage.getItem("userEmail");
                result.current_date = date;
                result.is_careers_page = 'Yes';
                console.log('Gemini Result for Email:', result);

                fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.APPLICATION.APPLY}`, {
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
            {!isConnected && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center">
                    <div className="bg-gray-800 rounded-lg p-6 text-center shadow-xl w-96 border border-gray-700">
                        <h2 className="text-xl font-bold text-white mb-4">Why Connect to Gmail?</h2>
                        <p className="mb-6 text-gray-300">
                            Connecting your Gmail allows us to automatically track the applications you submit,
                            even from your mobile, and keep all your job applications organized.
                        </p>
                        <div className="flex justify-between">
                            <button
                                className="py-2 px-6 rounded-lg bg-gray-600 text-gray-200 font-medium hover:bg-gray-500 transition ease-in-out duration-300"
                                // onClick={() => setShowPopup(false)}
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                className="py-2 px-6 rounded-lg bg-gradient-to-r from-[#ff0088] to-[#ff8800] text-white font-medium hover:opacity-90 transition ease-in-out duration-300"
                                onClick={handleConnectGmail}
                            >
                                Connect Gmail
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default GmailPopup;
