document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://job-tracker-production-e381.up.railway.app/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log(data);
            // Save the JWT token to localStorage
            chrome.storage.local.set({ authToken: data.token, userEmail: email }, function () {
                if (chrome.runtime.lastError) {
                    console.error('Error storing authToken:', chrome.runtime.lastError);
                } else {
                    console.log('Token stored successfully!');
                }
            });


            chrome.storage.local.get('authToken', (result) => {
                console.log(result);
            });

            alert("Login successful!");
            // window.close()
            // window.location.href = "index.html"; // Redirect to the main page after successful login
        } else {
            alert(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
});
