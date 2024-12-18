import React, { useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '505792993495-s0fuo4pilb8k9u2tj0u3ggv75os3vjl1.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDViSkkMRFM8SMDg-gA0_Aefjy6YfQkeF0';
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

const GmailPopup = ({ isConnected, onConnect }) => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);

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
            console.log(messages);
            const emailData = messages.map((message) => {
                const headers = message.result.payload.headers;
                const subject = headers.find((header) => header.name === 'Subject')?.value;
                const from = headers.find((header) => header.name === 'From')?.value;
                return { subject, from };
            });

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
                                <li key={index} className="mb-2">
                                    <p>
                                        <strong>From:</strong> {email.from}
                                    </p>
                                    <p>
                                        <strong>Subject:</strong> {email.subject}
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
