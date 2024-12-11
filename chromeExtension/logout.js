document.getElementById("logoutButton").addEventListener("click", () => {
    chrome.storage.local.clear(() => {
        console.log("User logged out.");
        window.location.href = "login.html"; // Redirect to login page
    });
});
