// Display the user's name and the selected machine name
document.getElementById("user_id").textContent = localStorage.getItem("userName");

// Function to update the machine's name and GIF dynamically when the page loads
function updateMachineDisplay() {
    let selectedMachine = localStorage.getItem("selectedMachine") || "None Selected"; // Get the selected machine from localStorage
    let machineGifs = {
        "Leg Press": "leg_press.gif",
        "Bench Press": "bench_press.gif",
        "Lat Pulldown": "lat_pulldown.gif"
    };

    document.getElementById("machine_name").textContent = selectedMachine;  // Update machine name on the page
    document.getElementById("exercise_gif").src = machineGifs[selectedMachine] || "default.gif";  // Update the GIF based on selected machine
}

// Run update on page load
document.addEventListener("DOMContentLoaded", updateMachineDisplay);

// Function to save the workout details to the server
function saveWorkout() {
    let sets = parseInt(document.getElementById("sets").value);
    let reps = parseInt(document.getElementById("reps").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let user = localStorage.getItem("userName");
    let exercise = localStorage.getItem("selectedMachine");  // Use the selected machine from localStorage
    let date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    if (sets <= 0 || reps <= 0 || weight <= 0) {
        alert("Please enter valid workout details.");
        return;
    }

    let oneRepMax = Math.round(weight * (1 + reps / 30));

    fetch("workout.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user, exercise, sets, reps, weight, oneRepMax, date })
    })
    .then(response => response.text())
    .then(data => console.log("Server Response:", data))
    .catch(error => console.error("Error:", error));

    // Create a new workout log item
    let logItem = document.createElement("li");
    logItem.innerHTML = `<strong>${exercise}</strong> - ${sets}x${reps} @ ${weight} lbs 
        <br> 1-Rep Max: <strong>${oneRepMax} lbs</strong> 
        <br> <em>${date}</em>`;

    // Prepend the log item to the workout list
    document.getElementById("workout_list").prepend(logItem);
}

// Function to log out the user and redirect to the login page
function logout() {
    localStorage.removeItem("userCode");
    localStorage.removeItem("userName");
    window.location.href = "index.html";
}
