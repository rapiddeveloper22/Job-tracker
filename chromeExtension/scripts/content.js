var debounceTimer = null;
var lastScrapedData = "";

// Wait for changes with debounce
function waitForContentChangeWithDebounce(selector, timeout = 3000) {
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
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    lastScrapedData = currentText;
                    resolve(currentText);
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

// Function to wait until the page is fully loaded
function waitForPageLoad() {
    return new Promise((resolve) => {
        if (document.readyState === "complete") {
            resolve();
        } else {
            window.addEventListener("load", resolve);
        }
    });
}

// Function to clean up and extract JSON from wrapped string
function extractJSON(rawResponse) {
    try {
        // const cleanedString = rawResponse.replace(/```[a-z]*\n|```/g, "").trim();
        console.log(rawResponse);
        const cleanedString = rawResponse.replace(/```json\n|```/g, '').trim();
        return JSON.parse(cleanedString);
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
    }
}

function escapeTextForJSON(text) {
    return text
        .replace(/\\/g, '\\\\')     // Escape backslashes
        .replace(/"/g, '\\"')       // Escape double quotes
        .replace(/\n/g, '\\n')      // Escape newlines
        .replace(/\r/g, '\\r');     // Escape carriage returns
}

// Scrape and process logic
async function scrapeAndProcess() {
    let bodyText = "";

    try {
        if (window.location.href.includes("linkedin")) {
            console.log("On a LinkedIn page. Checking for job details...");
            bodyText = await waitForContentChangeWithDebounce("div.jobs-search__job-details--wrapper");
        } else {
            console.log("Not a LinkedIn page, extracting body text.");
            bodyText = await waitForContentChangeWithDebounce("body");
        }

        console.log("Scraped content:", bodyText);
        var applicationCheck;

        chrome.runtime.sendMessage({ action: "checkLoginStatus" }, async (response) => {
            console.log(JSON.stringify(bodyText));
            if (response && response.authToken) {
                var applicationCheckCall = await fetch("https://job-tracker-production-e381.up.railway.app/api/ai/extensionCall", {
                    method: "POST",
                    body: JSON.stringify({ bodyText: escapeTextForJSON(bodyText) }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${response.authToken}`,
                    }
                })
            }

            applicationCheck = await applicationCheckCall.json();
            // applicationCheck = escapeTextForJSON(applicationCheck);
            console.log(applicationCheck);

            // Further processing
            const result = extractJSON(applicationCheck.applicationCheck);
            console.log(result);

            if (!result) {
                console.error("Failed to process Gemini response");
                return;
            }

            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
            result.current_date = formattedDate;
            result.job_link = window.location.href;

            console.log("Processed result:", result);

            var isRoleNamePresent = result.role_name && (result.role_name.toLowerCase() != "no" && result.role_name.toLowerCase() != "na");

            if (result.is_careers_page && ((result.is_careers_page).toLowerCase() === "true" || (result.is_careers_page).toLowerCase() === "yes") && isRoleNamePresent) {
                console.log("Careers page detected. Proceeding with further processing...");

                // Detect form fields on the page
                // const formFields = detectFormFields();
                // console.log("Detected form fields:", formFields);

                chrome.runtime.sendMessage({ action: "checkLoginStatus" }, (response) => {
                    if (response && response.authToken) {
                        result.user_email = response.userEmail;

                        console.log("Before API call");
                        console.log(result);

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
        });
    } catch (error) {
        console.error("Error while scraping or processing:", error);
    }
}

// Main logic to wait for page load and start monitoring
async function startMonitoring() {
    try {
        await waitForPageLoad();
        console.log("Page fully loaded.");

        // Add a slight delay to allow dynamic content to stabilize
        setTimeout(() => {
            console.log("Starting content monitoring...");
            if (!window.location.href.includes("localhost") && !window.location.href.includes("jobossy"))
                scrapeAndProcess();
        }, 2000);
    } catch (error) {
        console.error("Error during page load monitoring:", error);
    }
}

// Start the monitoring process when the user is logged in
chrome.runtime.sendMessage({ action: "checkLoginStatus" }, (response) => {
    if (response && response.authToken) {
        console.log("User is logged in. Initiating monitoring process...");
        startMonitoring();
    } else {
        console.log("User is not logged in. Skipping monitoring.");
    }
});










