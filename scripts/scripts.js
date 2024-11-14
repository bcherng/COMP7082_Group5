// scripts.js - JavaScript to enable editing and saving functionality

const editButton = document.getElementById('edit-button');
const saveButton = document.getElementById('save-button');

const weeklyGoalText = document.getElementById('weekly-goal-text');
const weeklyGoalInput = document.getElementById('weekly-goal-input');
const workoutFrequencyText = document.getElementById('workout-frequency-text');
const workoutFrequencyInput = document.getElementById('workout-frequency-input');

// Function to toggle display between text and input fields
function toggleEditMode(isEditable) {
    if (isEditable) {
        // Show inputs, hide texts and Edit button
        weeklyGoalText.style.display = 'none';
        weeklyGoalInput.style.display = 'block';
        workoutFrequencyText.style.display = 'none';
        workoutFrequencyInput.style.display = 'block';
        saveButton.style.display = 'block';
        editButton.style.display = 'none';
    } else {
        // Show texts, hide inputs and Save button
        weeklyGoalText.textContent = `Goal: Lose ${weeklyGoalInput.value} kg/week`;
        workoutFrequencyText.textContent = `Workout Frequency: ${workoutFrequencyInput.value} times/week`;

        weeklyGoalText.style.display = 'block';
        weeklyGoalInput.style.display = 'none';
        workoutFrequencyText.style.display = 'block';
        workoutFrequencyInput.style.display = 'none';
        saveButton.style.display = 'none';
        editButton.style.display = 'block';
    }
}


toggleEditMode(false);

// Enable editing when Edit button is clicked
editButton.addEventListener('click', () => {
    toggleEditMode(true);
});

// Save changes and switch back to text display when Save button is clicked
saveButton.addEventListener('click', () => {
    toggleEditMode(false);
});

//update profile
const profileImage = document.getElementById('profile-image');
const profileImageInput = document.getElementById('profile-image-input');
const updateProfileButton = document.getElementById('update-profile-button');


// Show file input when "Update Profile Picture" button is clicked
updateProfileButton.addEventListener('click', () => {
    profileImageInput.click();
});

// Update profile picture when a new file is selected
profileImageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result; // Update the image source
        };
        reader.readAsDataURL(file); // Convert the image file to a data URL
    }
});

//progress tracking
// Update progress numbers dynamically
function updateProgress(weightProgress, workoutProgress, caloriesProgress) {
    const weightProgressNumber = document.getElementById('weight-progress-number');
    const workoutProgressNumber = document.getElementById('workout-progress-number');
    const caloriesProgressNumber = document.getElementById('calories-progress-number');

    // Update the progress numbers
    weightProgressNumber.textContent = `${weightProgress}%`;
    workoutProgressNumber.textContent = `${workoutProgress}%`;
    caloriesProgressNumber.textContent = `${caloriesProgress}%`;
}

// Example usage: Update with sample values
updateProgress(30, 60, 80);

