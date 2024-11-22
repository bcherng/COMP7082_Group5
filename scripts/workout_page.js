// Replace with your actual backend URL
const API_BASE_URL = 'https://7082-backend-node.vercel.app/api';

const tabsContainer = document.getElementById('weekdaysTab');
const contentContainer = document.getElementById('workoutContent');

// Days of the week for tabs
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Function to generate tabs
function generateTabs() {
    daysOfWeek.forEach((day, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const tabItem = `
            <li class="nav-item" role="presentation">
                <button class="nav-link ${activeClass}" id="${day}-tab" data-day="${day}" type="button" onclick="loadWorkout('${day}')">${day}</button>
            </li>
        `;
        tabsContainer.insertAdjacentHTML('beforeend', tabItem);
    });
}

// Function to fetch workout data from the backend
async function fetchWorkout(day) {
    try {
        const username = 'testuser'; // Replace with dynamic username if needed
        const response = await fetch(`${API_BASE_URL}/workout-routine?day=${day}&username=${username}`);
        if (!response.ok) {
            throw new Error(`Error fetching workout data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching workout data:', error);
        return null;
    }
}

// Function to load workout content for a specific day
async function loadWorkout(day) {
    contentContainer.innerHTML = ''; // Clear previous content

    try {
        const data = await fetchWorkout(day);

        if (!data || !data.exercises) {
            contentContainer.innerHTML = `<p class="text-center text-warning">No workout data available for ${day}.</p>`;
            return;
        }

        // Populate workout content
        data.exercises.forEach(exercise => {
            const { name, sets, reps, duration, rest, icon } = exercise;
            const exerciseDetails = sets && reps
                ? `Sets: ${sets} | Reps: ${reps} | Rest: ${rest}`
                : `Duration: ${duration} | Rest: ${rest}`;
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card text-white bg-dark h-100">
                        <div class="card-body text-center">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${exerciseDetails}</p>
                            <i class="${icon || 'fas fa-dumbbell'} fa-3x mb-3"></i>
                        </div>
                    </div>
                </div>
            `;
            contentContainer.insertAdjacentHTML('beforeend', card);
        });
    } catch (error) {
        contentContainer.innerHTML = `<p class="text-center text-danger">Failed to load workout data for ${day}. Please try again later.</p>`;
    }
}

// Initialize page with tabs and load the first day's workout
generateTabs();
loadWorkout(daysOfWeek[0]);
