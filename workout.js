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

    // Create a new workout log item
    let logItem = document.createElement("li");
    logItem.innerHTML = `<strong>${exercise}</strong> - ${sets}x${reps} @ ${weight} lbs 
        <br> 1-Rep Max: <strong>${oneRepMax} lbs</strong> 
        <br> <em>${date}</em>`;

    // Prepend the log item to the workout list
    document.getElementById("workout_list").prepend(logItem);

    // Clear input fields
    document.getElementById("sets").value = "";
    document.getElementById("reps").value = "";
    document.getElementById("weight").value = "";

    alert("Workout saved successfully!");
}

// Logout Function
function logout() {
    localStorage.removeItem("userName");
    window.location.href = "index.html";  // Redirect to login page
}
