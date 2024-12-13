let debounceTimer = null;
let lastScrapedData = "";

function waitForContentChangeWithDebounce(selector, timeout = 3000) {
    scrapeAndProcess();
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);

        if (!element) {
            return reject(new Error(`Element with selector "${selector}" not found.`));
        }

        let observer;

        const stopObserving = () => {
            if (observer) {
                observer.disconnect();
            }
        };

        const checkContent = () => {
            const currentText = element.innerText.trim();
            if (currentText !== lastScrapedData && currentText.length > 0) {
                // Reset debounce timer if content is different from last scrape
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    lastScrapedData = currentText; // Update last scraped data
                    resolve(currentText); // Trigger scrape and send to Gemini
                }, timeout);
            }
        };

        observer = new MutationObserver(() => {
            checkContent();
        });

        // Observe the element for changes
        observer.observe(element, { childList: true, subtree: true, characterData: true });

        // Fallback for timeout if no changes happen within the timeout period
        setTimeout(() => {
            stopObserving();
            resolve(element.innerText); // Return current content after timeout
        }, timeout);

        checkContent(); // Initial check
    });
}


// Helper function to wait for an element to fully load
function waitForCompleteContent(selector, timeout = 5000, interval = 100) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const element = document.querySelector(selector);

        if (!element) {
            return reject(new Error(`Element with selector "${selector}" not found.`));
        }

        let observer;

        const stopObserving = () => {
            if (observer) {
                observer.disconnect();
            }
        };

        const checkContent = () => {
            if (element.innerText.trim().length > 0) {
                const currentText = element.innerText;
                stopObserving();
                resolve(currentText);
            }
        };

        observer = new MutationObserver(() => {
            checkContent();
        });

        // Observe the element for changes
        observer.observe(element, { childList: true, subtree: true, characterData: true });

        // Fallback to timeout if content doesn't load fully
        setTimeout(() => {
            stopObserving();
            if (element.innerText.trim().length > 0) {
                resolve(element.innerText);
            } else {
                reject(new Error("Element content did not fully load within the timeout period."));
            }
        }, timeout);

        checkContent(); // Initial check
    });
}

// Function to detect relevant form fields
function detectFormFields() {
    const formFields = [];

    // Get all input, select, and textarea elements that are visible
    const elements = [...document.querySelectorAll('input, select, textarea, button')];

    elements.forEach((element) => {
        // Check if element is visible and not hidden
        if (element.offsetParent !== null) {
            const field = {
                type: element.tagName.toLowerCase(),
                name: element.name || element.id || element.placeholder || "Unnamed Field",
                value: element.value || "",
                id: element.id,
                class: element.className,
                placeholder: element.placeholder || "",
            };

            formFields.push(field);
        }
    });

    return formFields;
}

// Function to scrape and process data dynamically
async function scrapeAndProcess() {
    let bodyText = "";
    const GEMINI_API_KEY = "AIzaSyCRTW69xL9c7Ht8Wo7MwN5Fk6UupDQalEU";

    try {
        if (window.location.href.includes("linkedin")) {
            console.log("On a LinkedIn page. Checking for job details...");
            bodyText = await waitForContentChangeWithDebounce("div.jobs-search__job-details--wrapper");
        } else {
            // Fallback logic for non-LinkedIn pages
            console.log("Not a LinkedIn page, extracting body text.");
            bodyText = await waitForContentChangeWithDebounce("body");
            bodyText = document.body.innerText;
        }

        console.log("Scraped content:", bodyText);

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

        const prompt = `So basically the paragraph below is a scraped content of a webpage. Analyse the contents of the webpage and check whether the page is a careers page of a company or a normal website. If it is not a careers webpage then return NA as result if it is a careers webpage then do the following. You need to find 3 things here. 1. What is the company which the user is applying for?  2. Does this paragraph contain anything about the role name which the user is applying. If role name is present then reply the role name or else with 'No'  3. Does this paragraph contain anything that the user has submitted an application? Reply with 'Yes' or 'No'. Return them in JSON format with keys is_careers_page, company, role_name, application_submitted. Text: ${bodyText}. Give it in JSON format with all the keys as string`;

        const applicationCheck = await queryGemini(prompt);
        console.log(applicationCheck);
        const result = extractJSON(applicationCheck);

        if (!result) {
            console.error("Failed to process Gemini response");
            return;
        }

        console.log("Processed result:", result);

        var isRoleNamePresent = result.role_name && (result.role_name.toLowerCase() != "no" && result.role_name.toLowerCase() != "na");

        if (result.is_careers_page && ((result.is_careers_page).toLowerCase() === "true" || (result.is_careers_page).toLowerCase() === "yes") && isRoleNamePresent) {
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
            // result.form_fields_relevance = relevanceResult;

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

// Start monitoring when the user is logged in
chrome.runtime.sendMessage({ action: "checkLoginStatus" }, (response) => {
    if (response && response.authToken) {
        console.log("User is logged in. Starting DOM monitoring...");
        waitForContentChangeWithDebounce("body");
        // waitForContentChangeWithDebounce(body);
    } else {
        console.log("User is not logged in");
    }
});
