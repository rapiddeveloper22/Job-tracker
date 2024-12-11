chrome.runtime.onInstalled.addListener(() => {
    // On extension installation, check login status
    checkLoginStatusForLogin();
});

chrome.action.onClicked.addListener(() => {
    // Show logout popup only when the extension icon is clicked
    console.log("Extension icon clicked");
    checkLoginStatusForLogout();
});

// Listen for when a new tab is activated or updated
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url && !tab.url.startsWith("chrome://")) {
            console.log("Tab activated:", tab.url); // Debug log
            checkLoginStatusForLogin();
        } else {
            console.log("Tab activated is a Chrome system page, ignoring.");
        }
    });
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "complete" && !tab.url.startsWith("chrome://")) {
        injectContentScript(tabId); // Inject content script if needed
    }
});

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

// Function to inject the content script
function injectContentScript(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["scripts/content.js"]
    });
}









// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkLoginStatus") {
        // Respond with the login status (auth token or not)
        chrome.storage.local.get('authToken', (result) => {
            sendResponse({ authToken: result.authToken });
        });
        return true; // To indicate that the response is asynchronous
    }
});