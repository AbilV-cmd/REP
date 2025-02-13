const proxyUrl = "https://my-cors-proxy.herokuapp.com/";
const endpoint = "https://script.google.com/macros/s/AKfycbyGd2KJuYyVMspXuc1Ptg4-hvzRZGgefIELZPrvlpKA9yDZt6ppqpW0p0sixNDCoB3RxA/exec";

const workoutData = {
    user: "JohnDoe",
    exercise: "Bench Press",
    sets: 4,
    reps: 12,
    weight: 200,
    oneRepMax: 240
};

console.log("Sending data to Google Sheets:", workoutData);

fetch(proxyUrl + endpoint, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(workoutData)
})
.then(response => {
    if (!response.ok) {
        console.error("Response not OK:", response);
        throw new Error("Network response was not ok");
    }
    return response.json();
})
.then(data => {
    if (data.status === "success") {
        console.log("Success:", data);
        alert("Workout saved successfully!");
    } else {
        console.error("Error response from server:", data);
        alert("Failed to save workout: " + data.message);
    }
})
.catch(error => {
    console.error("Request failed:", error);
    alert("Failed to save workout. Please try again later.");
});
