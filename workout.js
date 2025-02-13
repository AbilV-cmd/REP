function saveWorkout() {
    const workoutData = {
        user: document.getElementById('user_id').textContent,
        exercise: document.getElementById('machine_name').textContent,
        sets: document.getElementById('sets').value,
        reps: document.getElementById('reps').value,
        weight: document.getElementById('weight').value,
        oneRepMax: 1 // Calculate this if needed
    };

    console.log("Sending data to Google Sheets:", workoutData);

    fetch("https://script.google.com/macros/s/AKfycbyGd2KJuYyVMspXuc1Ptg4-hvzRZGgefIELZPrvlpKA9yDZt6ppqpW0p0sixNDCoB3RxA/exec", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(workoutData)
})
.then(response => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
})
.then(data => {
    console.log("Success:", data);
    alert("Workout saved successfully!");
})
.catch(error => {
    console.error("Error saving workout:", error);
    alert("Failed to save workout. Please try again.");
});
