document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form input values
    const username = document.getElementById("username-input").value;
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const repeatPassword = document.getElementById("repeat-password-input").value;

    // Check if the passwords match
    if (password !== repeatPassword) {
        document.getElementById("error-message").textContent = "Passwords do not match!";
        return;
    }

    // Create an object with the signup data
    const signupData = {
        username,
        email,
        password
    };

    // Send the data to the backend API
    fetch("https://7082-backend-node.vercel.app/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Response data:', data);
        if (data.message === 'User created successfully') {
            // Redirect to login page or display success message
            window.location.replace("/login.html");// Redirect to login page
            alert('User created successfully');
        } else {
            // Display the error message
            document.getElementById("error-message").textContent = data.message;
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        document.getElementById("error-message").textContent = "An error occurred. Please try again later.";
    });
});
