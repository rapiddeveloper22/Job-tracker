document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://job-tracker-production-e381.up.railway.app/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Sign Up successful! Please log in.");
            window.location.href = "login.html"; // Redirect to login page after successful sign up
        } else {
            alert(data.message || "Sign Up failed");
        }
    } catch (error) {
        console.error("Error signing up:", error);
    }
});
