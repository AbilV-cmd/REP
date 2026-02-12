window.onload = function() {
    document.getElementById("welcome").textContent = `Hi, ${localStorage.getItem("userName")}`;
    document.getElementById("machine-name").textContent = localStorage.getItem("selectedMachine") || "Machine";
};

function saveWorkout() {
    const sets = parseInt(document.getElementById("sets").value);
    const reps = parseInt(document.getElementById("reps").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const user = localStorage.getItem("userName");
    const machine = localStorage.getItem("selectedMachine");
    const date = new Date().toLocaleString();

    if (!sets || !reps || !weight) {
        alert("Enter all fields!");
        return;
    }

    const oneRepMax = Math.round(weight * (1 + reps/30));

    const payload = { user, machine, sets, reps, weight, oneRepMax, date };

    fetch("https://script.google.com/macros/s/AKfycbyLuqCOn_pvN4Vg6ttQzq1jmZ58Kn79gau3rZ3DpDXD5vWpMO683VsYKMn7xfeleWhfoA/exec", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json()).then(data => {
        alert("Workout saved!");
        document.getElementById("sets").value = "";
        document.getElementById("reps").value = "";
        document.getElementById("weight").value = "";
    }).catch(err => alert("Error sending data"));
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}