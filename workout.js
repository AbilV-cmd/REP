function saveWorkout() {
    let sets = parseInt(document.getElementById("sets").value);
    let reps = parseInt(document.getElementById("reps").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let user = localStorage.getItem("userName") || "Guest";
    let exercise = localStorage.getItem("machine") || "Unknown Exercise";
    let oneRepMax = Math.round(weight * (1 + reps / 30));

    if (sets <= 0 || reps <= 0 || weight <= 0 || isNaN(sets) || isNaN(reps) || isNaN(weight)) {
        alert("Please enter valid workout details.");
        return;
    }

    let requestData = {
        user: user,
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight,
        oneRepMax: oneRepMax
    };

    console.log("Sending data to Google Sheets:", requestData);

    fetch("https://script.google.com/macros/s/AKfycbyGd2KJuYyVMspXuc1Ptg4-hvzRZGgefIELZPrvlpKA9yDZt6ppqpW0p0sixNDCoB3RxA/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Workout saved successfully!");
            document.getElementById("sets").value = '';
            document.getElementById("reps").value = '';
            document.getElementById("weight").value = '';
        } else {
            alert("Failed to save workout.");
        }
    })
    .catch(error => {
        console.error("Error saving workout:", error);
        alert("Failed to save workout. Check console for details.");
    });
}
