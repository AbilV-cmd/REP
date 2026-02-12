// --- User & Machine Setup ---
const machineGifs = {
  "Leg Press": "leg_press.png",
  "Bench Press": "bench_press.png",
  "Lat Pulldown": "lat_pulldown.png"
};

window.onload = function() {
  const user = localStorage.getItem("userName") || "Guest";
  const machine = localStorage.getItem("selectedMachine") || "None Selected";
  document.getElementById("user_id").textContent = user;
  document.getElementById("machine_name").textContent = machine;

  // Set demo GIF/video
  document.getElementById("exercise_demo").src = machineGifs[machine] || "default.gif";

  // Load local log if exists
  loadWorkoutLog();
};

// --- Google Sheets Web App URL ---
const SHEET_URL = "<YOUR_WEB_APP_URL>"; // Replace with your deployed Apps Script Web App URL

// --- Workout Log Array ---
let workoutLog = [];

// --- Save Workout ---
function saveWorkout() {
  const sets = parseInt(document.getElementById("sets").value);
  const reps = parseInt(document.getElementById("reps").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const user = localStorage.getItem("userName");
  const machine = localStorage.getItem("selectedMachine");
  const oneRepMax = Math.round(weight * (1 + reps/30));
  const date = new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});

  if(!sets || !reps || !weight || sets<=0 || reps<=0 || weight<=0){
    alert("Enter valid workout details!");
    return;
  }

  // Save locally
  const entry = {date,user,machine,sets,reps,weight,oneRepMax};
  workoutLog.unshift(entry);
  localStorage.setItem("workoutLog", JSON.stringify(workoutLog));
  renderWorkoutLog();

  // Save to Google Sheets
  fetch(SHEET_URL,{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(entry)
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.status!=="success") console.error("Sheets Error:", data.message);
  })
  .catch(err=>console.error("Sheets Error:", err));

  // Clear inputs
  document.getElementById("sets").value="";
  document.getElementById("reps").value="";
  document.getElementById("weight").value="";

  // Update Smart Progression
  updateNextPlan(entry);
}

// --- Render Local Log ---
function renderWorkoutLog(){
  const list = document.getElementById("workout_list");
  list.innerHTML="";
  workoutLog.forEach(item=>{
    const li = document.createElement("li");
    li.innerHTML=`<strong>${item.machine}</strong> - ${item.sets}x${item.reps} @ ${item.weight} lbs
      <br>1RM: <strong>${item.oneRepMax} lbs</strong>
      <br><em>${item.date}</em>`;
    list.appendChild(li);
  });
}

// --- Load from Local Storage ---
function loadWorkoutLog(){
  const saved = JSON.parse(localStorage.getItem("workoutLog")||"[]");
  if(saved.length>0) workoutLog=saved;
  renderWorkoutLog();
}

// --- Logout ---
function logout(){
  localStorage.removeItem("userName");
  window.location.href="index.html";
}

// --- Smart Progression ---
function updateNextPlan(lastWorkout){
  const nextWeight = Math.round(lastWorkout.weight*1.05); // Suggest +5% weight
  const nextReps = lastWorkout.reps; // Keep reps same
  const nextSets = lastWorkout.sets; // Keep sets same
  const planText = `Next session: ${nextSets}x${nextReps} @ ${nextWeight} lbs for ${lastWorkout.machine}`;
  document.getElementById("plan_text").textContent=planText;
}