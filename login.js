let enteredCode = "";
const adminCode = "9999";
let validCodes = {};  // Stores login codes and usernames
let machineGifs = {
    "Leg Press": "leg_press.gif",
    "Bench Press": "bench_press.gif",
    "Lat Pulldown": "lat_pulldown.gif"
};

// Function to update machine name and GIF
function updateMachineDisplay() {
    let selectedMachine = localStorage.getItem("selectedMachine") || "None Selected";

    document.getElementById("machine_name").innerHTML = selectedMachine.replace(" ", "<br>"); // Break name into two lines

    let gifElement = document.getElementById("exercise_gif");
    let newSrc = machineGifs[selectedMachine] || "default.gif";

    // Force reload GIF
    gifElement.src = newSrc + "?t=" + new Date().getTime();
}

// Fetch users from Google Sheets
function fetchUsers() {
    fetch("https://script.google.com/macros/s/AKfycbxvRWjBiFloA8yelDhfLuOCk6SKQ6_FttfgtnrITTlmn9wyjImbvk5B_Il3KCMLKevaKg/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "getUsers" }) // Request user data
    })
    .then(response => response.json())
    .then(data => {
        validCodes = data;
        console.log("User Data Loaded:", validCodes);
    })
    .catch(error => {
        console.error("Error fetching users:", error);
        alert("⚠️ Error fetching users. Make sure Google Sheets script is published correctly.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchUsers();
    updateMachineDisplay();
});

// Function to enter digits
function enterDigit(digit) {
    if (enteredCode.length < 4) {
        enteredCode += digit;
        updateCodeDisplay();
    }
}

// Function to update the code display
function updateCodeDisplay() {
    document.getElementById("code_display").textContent = enteredCode.padEnd(4, "•");
}

// Function to clear the entered code
function clearCode() {
    enteredCode = "";
    updateCodeDisplay();
}

// Login function (integrated with Google Sheets)
function login() {
    if (enteredCode === adminCode) {
        window.location.href = "admin.html";  // Redirect to admin page
    } else if (validCodes[enteredCode]) {
        localStorage.setItem("userCode", enteredCode);
        localStorage.setItem("userName", validCodes[enteredCode]); // Store username
        window.location.href = "workout.html"; // Redirect to workout page
    } else {
        alert("Invalid Code! Please try again.");
        clearCode();
    }
}

// Function to handle key presses (optional for keyboard support)
document.addEventListener("keydown", function(event) {
    if (event.key >= "0" && event.key <= "9") {
        enterDigit(event.key);
    } else if (event.key === "Backspace") {
        enteredCode = enteredCode.slice(0, -1);
        updateCodeDisplay();
    } else if (event.key === "Enter") {
        login();
    }
});
