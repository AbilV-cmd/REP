// Display the username and selected exercise
window.onload = function() {
    let userName = localStorage.getItem("userName");
    let selectedMachine = localStorage.getItem("selectedMachine");
    document.getElementById("user_id").textContent = userName || "Guest";
    document.getElementById("machine_name").textContent = selectedMachine || "No Machine Selected";
};

// Save Workout Function
function saveWorkout() {
    let sets = parseInt(document.getElementById("sets").value);
    let reps = parseInt(document.getElementById("reps").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let user = localStorage.getItem("userName");
    let exercise = localStorage.getItem("selectedMachine"); 
    let date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    if (sets <= 0 || reps <= 0 || weight <= 0) {
        alert("Please enter valid workout details.");
        return;
    }

    let oneRepMax = Math.round(weight * (1 + reps / 30));
    let totalVolume = sets * reps * weight;
    let averageIntensity = Math.round((weight / oneRepMax) * 100);
    let estimatedDuration = sets * 2; // Assuming 2 minutes per set
    let workoutDensity = Math.round(totalVolume / estimatedDuration);
    let estimatedCalories = Math.round(6 * (weight / 2.2) * (estimatedDuration / 60)); // MET value of 6 for strength training

    // Display Workout Log
    let logItem = document.createElement("li");
    logItem.innerHTML = `
        <strong>${exercise}</strong> - ${sets}x${reps} @ ${weight} lbs 
        <br> 1-Rep Max: <strong>${oneRepMax} lbs</strong>
        <br> Total Volume: <strong>${totalVolume} lbs</strong>
        <br> Avg. Intensity: <strong>${averageIntensity}%</strong>
        <br> Workout Density: <strong>${workoutDensity} lbs/min</strong>
        <br> Estimated Calories: <strong>${estimatedCalories} kcal</strong>
        <br> <em>${date}</em>`;

    document.getElementById("workout_list").prepend(logItem);

    // Clear input fields
    document.getElementById("sets").value = "";
    document.getElementById("reps").value = "";
    document.getElementById("weight").value = "";
}

// Logout Function
function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("selectedMachine");
    window.location.href = "index.html";  // Redirect to login page
}
