// Display the user's name and the selected machine name
document.getElementById("user_id").textContent = localStorage.getItem("userName");

// Function to update the machine's name and image dynamically when the page loads
function updateMachineDisplay() {
    let selectedMachine = localStorage.getItem("selectedMachine") || "None Selected"; 
    let machineImages = {
        "Leg Press": "leg_press.png",
        "Bench Press": "bench_press.png",
        "Lat Pulldown": "lat_pulldown.png"
    };

    document.getElementById("machine_name").innerHTML = selectedMachine.replace(" ", "<br>");
    document.getElementById("exercise_gif").src = machineImages[selectedMachine] || "default.png";
}

// Run update on page load
document.addEventListener("DOMContentLoaded", updateMachineDisplay);

// Function to save the workout details to Google Sheets
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

    // Send data to Google Sheets
    fetch(process.env.REACT_APP_GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            user, 
            exercise, 
            sets, 
            reps, 
            weight, 
            oneRepMax, 
            date 
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server Response:", data);
        if (data.status === "Success") {
            alert("✅ Workout saved successfully!");
        } else {
            alert("⚠️ Error saving workout. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("⚠️ Error connecting to server.");
    });

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
