let enteredCode = "";
const validCodes = { "1234": "Abil", "5678": "Maxwell" };
const adminCode = "9999";

const machineGifs = { "Leg Press":"leg_press.png", "Bench Press":"bench_press.png", "Lat Pulldown":"lat_pulldown.png" };
const keypadContainer = document.getElementById("keypad");
const codeDisplay = document.getElementById("code_display");
const feedback = document.getElementById("login_feedback");
const exerciseGif = document.getElementById("exercise_gif");
const machineNameDisplay = document.getElementById("machine_name");

// Generate keypad dynamically
[1,2,3,4,5,6,7,8,9,'⌫',0,'✔'].forEach(val => {
    const btn = document.createElement("button");
    btn.className = "pushable";
    if(val === '⌫') btn.classList.add("clear");
    else if(val === '✔') btn.classList.add("confirm");
    else btn.classList.add("number");

    const front = document.createElement("span");
    front.className = "front";
    front.textContent = val;
    btn.appendChild(front);

    btn.onclick = () => {
        if(val === '⌫') clearCode();
        else if(val === '✔') login();
        else enterDigit(val);
    };
    keypadContainer.appendChild(btn);
});

// Update machine display and GIF
function updateMachineDisplay() {
    const selectedMachine = localStorage.getItem("selectedMachine") || "None Selected";
    machineNameDisplay.innerHTML = selectedMachine.replace(" ", "<br>");
    exerciseGif.src = machineGifs[selectedMachine] || "default.gif";
}

// Call once on page load
document.addEventListener("DOMContentLoaded", updateMachineDisplay);

function enterDigit(digit) {
    if(enteredCode.length<4){ enteredCode+=digit; updateCodeDisplay(); }
}

function clearCode(){ enteredCode=""; updateCodeDisplay(); }

function updateCodeDisplay(){
    codeDisplay.textContent = enteredCode.padEnd(4,'•');
}

// Login logic with inline feedback
function login() {
    if(enteredCode===adminCode){ window.location.href="admin.html"; return; }
    if(validCodes[enteredCode]){
        localStorage.setItem("userCode", enteredCode);
        localStorage.setItem("userName", validCodes[enteredCode]);
        window.location.href="workout.html";
    } else {
        feedback.textContent="Invalid Code!";
        clearCode();
    }
}