document.getElementById("user_id").textContent = localStorage.getItem("userName");
document.getElementById("machine_name").innerHTML = (localStorage.getItem("selectedMachine") || "None Selected").replace(" ", "<br>");

// Function to save the workout details to Google Sheets
function saveWorkout() {
    let sets = parseInt(document.getElementById("sets").value);
    let reps = parseInt(document.getElementById("reps").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let user = localStorage.getItem("userName");
    let exercise = localStorage.getItem("selectedMachine");
    let oneRepMax = Math.round(weight * (1 + reps / 30));

    // Validate inputs
    if (sets <= 0 || reps <= 0 || weight <= 0 || isNaN(sets) || isNaN(reps) || isNaN(weight)) {
        alert("Please enter valid workout details.");
        return;
    }

    if (!user || !exercise) {
        alert("No user or exercise selected!");
        return;
    }

    let requestData = {
        user: user,
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight,
        oneRepMax: oneRepMax,
        timestamp: new Date().toISOString()
    };

    console.log("Sending data to Google Sheets:", requestData);

    // Send data to Google Sheets (Your Google Apps Script URL)
    fetch("https://script.google.com/macros/s/AKfycbyGd2KJuYyVMspXuc1Ptg4-hvzRZGgefIELZPrvlpKA9yDZt6ppqpW0p0sixNDCoB3RxA/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        console.log("Google Sheets Response:", response);
        if (response.ok) {
            alert("✅ Workout saved successfully!");
        } else {
            alert("⚠️ Error saving workout. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error saving workout:", error);
        alert("⚠️ Error connecting to server.");
    });

    // Create a new workout log item for the UI
    let date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    let logItem = document.createElement("li");
    logItem.innerHTML = `<strong>${exercise}</strong> - ${sets}x${reps} @ ${weight} lbs 
        <br> 1-Rep Max: <strong>${oneRepMax} lbs</strong> 
        <br> <em>${date}</em>`;
    document.getElementById("workout_list").prepend(logItem);
}

function logout() {
    localStorage.removeItem("userCode");
    localStorage.removeItem("userName");
    window.location.href = "index.html";
}
