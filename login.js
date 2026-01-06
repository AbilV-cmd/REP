let enteredCode = "";
const validCodes = { "1234": "Abil", "5678": "Maxwell" };
const adminCode = "9999";

// Machine GIFs and their corresponding names
let machineGifs = {
    "Leg Press": "leg_press.png",
    "Bench Press": "bench_press.png",
    "Lat Pulldown": "lat_pulldown.png"
};

// Function to update machine name and GIF dynamically
function updateMachineDisplay() {
    let selectedMachine = localStorage.getItem("selectedMachine") || "None Selected";

    // Set the machine name in the exercise name display
    document.getElementById("machine_name").innerHTML = selectedMachine.replace(" ", "<br>");

    // Get the correct GIF for the selected machine
    let gifSrc = machineGifs[selectedMachine] || "default.gif";

    // Get the GIF element and update the source
    let gifElement = document.getElementById("exercise_gif");
    gifElement.src = gifSrc;

    // To ensure the GIF restarts, you can briefly set the `src` to a blank image and then back to the GIF
    gifElement.src = "";
    gifElement.src = gifSrc;
}

// Run the update function when the page is loaded and whenever the machine is selected
document.addEventListener("DOMContentLoaded", updateMachineDisplay);
setInterval(updateMachineDisplay, 1000); // This will check every second for updates

// Function to handle keypad input
function enterDigit(digit) {
    if (enteredCode.length < 4) {
        enteredCode += digit;
        updateCodeDisplay();
    }
}

// Function to clear entered code
function clearCode() {
    enteredCode = "";
    updateCodeDisplay();
}

// Function to update the display of the entered code
function updateCodeDisplay() {
    document.getElementById("code_display").textContent = enteredCode.padEnd(4, "•");
}

// Function to handle login
function login() {
    if (enteredCode === adminCode) {
        window.location.href = "admin.html"; // Redirect to admin page
    } else if (validCodes[enteredCode]) {
        localStorage.setItem("userCode", enteredCode);
        localStorage.setItem("userName", validCodes[enteredCode]);
        window.location.href = "workout.html"; // Redirect to workout page
    } else {
        alert("Invalid Code!");
        clearCode();
    }
}
