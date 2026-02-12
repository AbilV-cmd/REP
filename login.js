let enteredCode = "";
const validCodes = { "1234": "Abil", "5678": "Maxwell" }; // demo codes

function enterDigit(digit) {
    if (enteredCode.length < 4) {
        enteredCode += digit;
        updateDisplay();
    }
}

function clearCode() {
    enteredCode = "";
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("code-display").textContent = enteredCode.padEnd(4,"•");
}

function login() {
    if (validCodes[enteredCode]) {
        localStorage.setItem("userCode", enteredCode);
        localStorage.setItem("userName", validCodes[enteredCode]);
        window.location.href = "workout.html";
    } else {
        alert("Invalid code!");
        clearCode();
    }
}