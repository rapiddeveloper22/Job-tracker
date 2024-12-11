// Continuous Monitoring and Processing Function
function continuousMonitorDomChanges(processChangeCallback) {
    const targetNode = document.body; // Monitor the entire body
    const observerConfig = {
        childList: true,        // Detect additions/removals of nodes
        subtree: true,          // Monitor changes within descendants
        characterData: true,    // Detect text content changes
    };

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            console.log("Detected a DOM change:", mutation);
            if (processChangeCallback) {
                processChangeCallback(); // Trigger the callback to scrape and process
            }
        }
    });

    // Start observing the target node for configured changes
    observer.observe(targetNode, observerConfig);
    console.log("Started continuous monitoring of DOM changes...");

    // Return a function to stop monitoring when needed
    return () => {
        observer.disconnect();
        console.log("Stopped continuous monitoring of DOM changes.");
    };
}

// Helper function to scrape and process data
async function scrapeAndProcess() {
    console.log("Scraping and processing data after DOM change...");

    let bodyText = "";
    const GEMINI_API_KEY = "AIzaSyCRTW69xL9c7Ht8Wo7MwN5Fk6UupDQalEU";

    try {
        if (window.location.href.includes("linkedin")) {
            console.log("On a LinkedIn page. Checking for job details...");
            bodyText = await waitForCompleteContent("div.jobs-search__job-details--wrapper");
        } else {
            // Fallback logic for non-LinkedIn pages
            console.log("Not a LinkedIn page, extracting body text.");
            bodyText = document.body.innerText;
        }

        console.log(bodyText);

        // Checking whether the user has applied for the job
        async function queryGemini(prompt) {
            try {
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

        const prompt = `So basically the paragraph below is a scraped content of a webpage. Analyse the contents of the webpage and check whether the page is a careers page of a company or a normal website. If it is not a careers webpage then return NA as result if it is a careers webpage then do the following. You need to find 3 things here. 1. What is the company which the user is applying for?  2. Does this paragraph contain anything about the role name which the user is applying. If role name is present then reply the role name or else with 'No'  3. Does this paragraph contain anything that the user has submitted an application? Reply with 'Yes' or 'No'. Return them in JSON format with keys is_careers_page, company, role_name, application_submitted. Text: ${bodyText}. Give it in JSON format`;

        const applicationCheck = await queryGemini(prompt);
        console.log(applicationCheck);
        const result = extractJSON(applicationCheck);

        if (!result) {
            console.error("Failed to process Gemini response");
            return;
        }

        console.log("Processed result:", result);

        if (result.is_careers_page && ((result.is_careers_page).toLowerCase() === "true" || (result.is_careers_page).toLowerCase() === "yes")) {
            console.log("Careers page detected. Proceeding with further processing...");

            // Detect form fields on the page
            const formFields = detectFormFields();
            console.log("Detected form fields:", formFields);

            // Send detected fields to Gemini for relevance analysis
            const formFieldsPrompt = `Here are the form fields detected on a job application page. Please determine if they are relevant for applying to the job or not. Return in JSON format with field names which are relevant. Fields: ${JSON.stringify(formFields, null, 2)}`;

            const relevanceCheck = await queryGemini(formFieldsPrompt);
            const relevanceResult = extractJSON(relevanceCheck);

            console.log("Relevance Check Result:", relevanceResult);

            // Combine both the job details and form field relevance into one result object
            result.form_fields_relevance = relevanceResult;

            // Send data to your backend
            chrome.runtime.sendMessage({ action: "checkLoginStatus" }, (response) => {
                if (response && response.authToken) {
                    fetch("https://job-tracker-production-e381.up.railway.app/api/app/apply", {
                        method: "POST",
                        body: JSON.stringify(result),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "Authorization": `Bearer ${response.authToken}`,
                        }
                    })
                        .then(response => response.json())
                        .then(json => console.log(json))
                        .catch(error => console.error("Error submitting application:", error));
                } else {
                    console.log("User not logged in. Skipping backend submission.");
                }
            });
        }
    } catch (error) {
        console.error("Error while scraping or processing:", error);
    }
}

// Send message to background script to check login status
chrome.runtime.sendMessage({ action: "checkLoginStatus" }, (response) => {
    console.log("Response : " + response.authToken + " " + response.userEmail);

    if (response && response.authToken) {
        console.log("User is logged in. Starting DOM monitoring...");

        // Start continuous monitoring with scrape-and-process logic
        continuousMonitorDomChanges(() => {
            console.log("Triggering scrape-and-process after DOM change...");
            scrapeAndProcess();
        });
    } else {
        console.log("User is not logged in");
    }
});
