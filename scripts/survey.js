// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Retrieve the username of the logged-in user
    const username = localStorage.getItem('username');
    console.log('Logged-in username:', username);

    if (!username) {
        alert('User is not logged in!');
        return;
    }

    // Create a FormData object to gather all form data
    const formData = new FormData(event.target);

    // Create an object to store the collected form data
    const data = {
        username: username, // Assuming 'name' is the field for the username
        questionnaire: {}
    };

    // Collect all form responses and store them in the 'questionnaire' object
    formData.forEach((value, key) => {
        // Handle multiple selections (checkboxes)
        if (key === 'goals' || key === 'exercise_types' || key === 'workout_days') {
            if (!data.questionnaire[key]) {
                data.questionnaire[key] = [];
            }
            data.questionnaire[key].push(value);
        } else if (key !== username) { // Exclude 'name' from being added to 'questionnaire'
            data.questionnaire[key] = value;
        }
    });

    // API request to submit the form data to the backend via the '/api/questionnaire' endpoint
    try {
        const response = await fetch('https://7082-backend-node.vercel.app/api/questionnaire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send the data as JSON
        });

        const result = await response.json();
        if (response.ok) {
            alert('Form submitted successfully!');
            // window.location.reload();
            window.location.href = '/workout_page.html';
        } else {
            alert('There was a problem with the submission: ' + result.message);
        }
    } catch (error) {
        console.error('Error submitting the form:', error);
        alert('There was an error with the submission.');
    }
}

// Attach the form submission handler to the form
document.querySelector('#survey-form').addEventListener('submit', handleSubmit);
 