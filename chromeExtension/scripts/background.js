chrome.runtime.onInstalled.addListener(() => {
    // On extension installation, check login status
    checkLoginStatusForLogin();
});

chrome.action.onClicked.addListener(() => {
    // Show logout popup only when the extension icon is clicked
    console.log("Extension icon clicked");
    checkLoginStatusForLogout();
});

// Listen for when a new tab is activated
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url && !tab.url.startsWith("chrome://")) {
            console.log("Tab activated:", tab.url);
            injectContentScriptIfNeeded(activeInfo.tabId);
            checkLoginStatusForLogin();
        } else {
            console.log("Tab activated is a Chrome system page, ignoring.");
        }
    });
});

// Listen for when a tab is updated (e.g., page loaded)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && !tab.url.startsWith("chrome://")) {
        console.log("Tab updated and loaded:", tab.url);
        injectContentScriptIfNeeded(tabId); // Inject content script if needed
    }
});

// Function to inject the content script if not already injected
function injectContentScriptIfNeeded(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["scripts/content.js"]
    }).then(() => {
        console.log("Content script injected successfully.");
    }).catch((error) => {
        console.error("Failed to inject content script:", error);
    });
}

// Function to check if the user is logged in for login purposes
function checkLoginStatusForLogin() {
    chrome.storage.local.get("authToken", (result) => {
        if (chrome.runtime.lastError) {
            console.error("Error accessing storage:", chrome.runtime.lastError);
            return;
        }

        if (!result.authToken) {
            console.log("User not logged in. Opening login page.");
            openLoginPage();
        } else {
            console.log("User is already logged in.");
        }
    });
}

// Function to check if the user is logged in for logout purposes
function checkLoginStatusForLogout() {
    chrome.storage.local.get("authToken", (result) => {
        const isLoggedIn = !!result.authToken;
        if (isLoggedIn) {
            // If logged in, show logout popup
            openLogoutPopup();
        } else {
            console.log("User not logged in. Opening login page.");
            openLoginPage();
        }
    });
}

// Function to open the login page in a new tab
function openLoginPage() {
    chrome.tabs.query({ url: "chrome-extension://*/*login.html" }, (tabs) => {
        if (tabs.length === 0) {
            chrome.tabs.create({ url: "login.html" });
            console.log("Login page opened in a new tab.");
        }
    });
}

// Function to open the logout popup
function openLogoutPopup() {
    chrome.windows.create({
        url: "logout.html",
        type: "popup",
        width: 400,
        height: 400,
    });
    console.log("Logout popup opened.");
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkLoginStatus") {
        // Retrieve both `authToken` and `userEmail` from storage
        chrome.storage.local.get(["authToken", "userEmail"], (result) => {
            if (chrome.runtime.lastError) {
                console.error("Error accessing storage:", chrome.runtime.lastError);
                sendResponse({ error: chrome.runtime.lastError.message });
                return;
            }

            // Send back both authToken and userEmail
            sendResponse({
                authToken: result.authToken || null,
                userEmail: result.userEmail || null,
            });
        });

        return true; // Indicate that the response is asynchronous
    }
});


