document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the form from submitting the traditional way

    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;

    // Send a POST request to the backend
    fetch('https://7082-backend-node.vercel.app/api/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        console.log('Response status:', response.status);  // Log status code
        return response.json();  // Parse JSON data from response
    })
    .then(data => {
        console.log('Response data:', data);  // Log the response data
        if (data.token) {
            // If the token is returned
            localStorage.setItem('authToken', data.token);  // Store token in localStorage
            window.location.href = '/survey.html';  // Redirect to survey page
        } else {
            // Handle the case where token is missing (login failed)
            alert('Invalid login credentials: ' + (data.message || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);  // Log any error in the catch block
        alert('An error occurred: ' + error.message);
    });
});


