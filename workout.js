// ================================
// CONFIG
// ================================
const SHEET_URL = "https://script.google.com/macros/s/AKfycbyLuqCOn_pvN4Vg6ttQzq1jmZ58Kn79gau3rZ3DpDXD5vWpMO683VsYKMn7xfeleWhfoA/exec";

const machineGifs = {
  "Leg Press": "leg_press.png",
  "Bench Press": "bench_press.png",
  "Lat Pulldown": "lat_pulldown.png"
};

let workoutLog = [];

// ================================
// ON LOAD
// ================================
window.onload = function () {
  const user = localStorage.getItem("userName") || "Guest";
  const machine = localStorage.getItem("selectedMachine") || "Leg Press";

  document.getElementById("user_id").textContent = user;
  document.getElementById("machine_name").textContent = machine;
  document.getElementById("exercise_demo").src =
    machineGifs[machine] || "default.gif";

  loadWorkoutLog();
};

// ================================
// SAVE WORKOUT
// ================================
function saveWorkout() {
  const sets = parseInt(document.getElementById("sets").value);
  const reps = parseInt(document.getElementById("reps").value);
  const weight = parseFloat(document.getElementById("weight").value);

  const user = localStorage.getItem("userName");
  const machine = localStorage.getItem("selectedMachine");

  if (!sets || !reps || !weight || sets <= 0 || reps <= 0 || weight <= 0) {
    alert("Enter valid workout details.");
    return;
  }

  const oneRepMax = Math.round(weight * (1 + reps / 30));
  const date = new Date().toISOString();

  const entry = {
    date,
    user,
    machine,
    sets,
    reps,
    weight,
    oneRepMax
  };

  // Save locally
  workoutLog.unshift(entry);
  localStorage.setItem("workoutLog", JSON.stringify(workoutLog));
  renderWorkoutLog();

  // Send to Google Sheets
  fetch(SHEET_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry)
  })
    .then(res => res.json())
    .then(data => {
      if (data.status !== "success") {
        console.error("Sheet error:", data.message);
      }
    })
    .catch(err => console.error("Network error:", err));

  updateNextPlan(entry);

  document.getElementById("sets").value = "";
  document.getElementById("reps").value = "";
  document.getElementById("weight").value = "";
}

// ================================
// SMART PROGRESSION
// ================================
function updateNextPlan(lastWorkout) {
  const nextWeight = Math.round(lastWorkout.weight * 1.05);
  const planText = `
    Next session suggestion:
    ${lastWorkout.sets} sets x ${lastWorkout.reps} reps
    @ ${nextWeight} lbs
  `;
  document.getElementById("plan_text").textContent = planText;
}

// ================================
// LOCAL LOG RENDER
// ================================
function renderWorkoutLog() {
  const list = document.getElementById("workout_list");
  list.innerHTML = "";

  workoutLog.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.machine}</strong>
      — ${item.sets}x${item.reps} @ ${item.weight} lbs
      <br>1RM: <strong>${item.oneRepMax}</strong>
      <br><small>${new Date(item.date).toLocaleString()}</small>
    `;
    list.appendChild(li);
  });
}

function loadWorkoutLog() {
  const saved = JSON.parse(localStorage.getItem("workoutLog") || "[]");
  workoutLog = saved;
  renderWorkoutLog();
}

function logout() {
  localStorage.removeItem("userName");
  window.location.href = "index.html";
}