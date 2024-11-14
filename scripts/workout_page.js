const workoutRoutines = {
    Monday: [
        { name: "Push-Ups", sets: 3, reps: 15, rest: "1 min", icon: "fas fa-dumbbell" },
        { name: "Squats", sets: 4, reps: 12, rest: "1 min", icon: "fas fa-running" },
        { name: "Plank", duration: "1 min", rest: "30 sec", icon: "fas fa-child" }
    ],
    Tuesday: [
        { name: "Lunges", sets: 3, reps: 10, rest: "1 min", icon: "fas fa-walking" },
        { name: "Mountain Climbers", duration: "45 sec", rest: "15 sec", icon: "fas fa-mountain" },
        { name: "Jumping Jacks", duration: "1 min", rest: "30 sec", icon: "fas fa-bolt" }
    ],
    Wednesday: [
        { name: "Burpees", sets: 3, reps: 10, rest: "1 min", icon: "fas fa-burn" },
        { name: "Sit-Ups", sets: 4, reps: 20, rest: "1 min", icon: "fas fa-heartbeat" },
        { name: "High Knees", duration: "1 min", rest: "30 sec", icon: "fas fa-running" }
    ],
    Thursday: [
        { name: "Bicep Curls", sets: 4, reps: 12, rest: "1 min", icon: "fas fa-dumbbell" },
        { name: "Tricep Dips", sets: 3, reps: 15, rest: "1 min", icon: "fas fa-hand-rock" },
        { name: "Shoulder Press", sets: 3, reps: 12, rest: "1 min", icon: "fas fa-hand-paper" }
    ],
    Friday: [
        { name: "Pull-Ups", sets: 3, reps: 10, rest: "1 min", icon: "fas fa-bars" },
        { name: "Deadlifts", sets: 4, reps: 10, rest: "1.5 min", icon: "fas fa-weight-hanging" },
        { name: "Lat Pulldown", sets: 4, reps: 12, rest: "1 min", icon: "fas fa-hands" }
    ],
    Saturday: [
        { name: "Running", duration: "30 mins", rest: "N/A", icon: "fas fa-running" },
        { name: "Cycling", duration: "20 mins", rest: "N/A", icon: "fas fa-bicycle" },
        { name: "Rowing", duration: "15 mins", rest: "N/A", icon: "fas fa-water" }
    ],
    Sunday: [
        { name: "Yoga", duration: "45 mins", rest: "N/A", icon: "fas fa-spa" },
        { name: "Stretching", duration: "15 mins", rest: "N/A", icon: "fas fa-leaf" },
        { name: "Breathing Exercises", duration: "10 mins", rest: "N/A", icon: "fas fa-wind" }
    ]
};


const daysOfWeek = Object.keys(workoutRoutines);
const tabsContainer = document.getElementById('weekdaysTab');
const contentContainer = document.getElementById('workoutContent');

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

// Function to load workout content for a specific day
function loadWorkout(day) {
    // Clear previous workout content
    contentContainer.innerHTML = '';
    
    // Remove 'active' class from all tabs
    document.querySelectorAll('.nav-link').forEach(tab => {
        tab.classList.remove('active');
    });

    // Add 'active' class to the selected tab
    document.getElementById(`${day}-tab`).classList.add('active');

    // Load the workout content for the selected day
    const exercises = workoutRoutines[day];
    exercises.forEach(exercise => {
        const { name, sets, reps, duration, rest, icon } = exercise;
        const exerciseDetails = sets && reps ? `Sets: ${sets} | Reps: ${reps} | Rest: ${rest}` : `Duration: ${duration} | Rest: ${rest}`;
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card text-white bg-dark h-100">
                    <div class="card-body text-center">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${exerciseDetails}</p>
                        <i class="${icon} fa-3x mb-3"></i>
                    </div>
                </div>
            </div>
        `;
        contentContainer.insertAdjacentHTML('beforeend', card);
    });
}


// Initialize page with tabs and load the first day's workout
generateTabs();
loadWorkout(daysOfWeek[0]);