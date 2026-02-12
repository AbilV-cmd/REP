// Load user and machine
window.onload = function() {
    const userName = localStorage.getItem("userName") || "Guest";
    const selectedMachine = localStorage.getItem("selectedMachine") || "No Machine Selected";
    document.getElementById("user_id").textContent = userName;
    document.getElementById("machine_name").textContent = selectedMachine;

    renderWorkoutLog();
};

// Save workouts persistently
function saveWorkout() {
    const sets = parseInt(document.getElementById("sets").value);
    const reps = parseInt(document.getElementById("reps").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const user = localStorage.getItem("userName");
    const exercise = localStorage.getItem("selectedMachine");
    const date = new Date().toLocaleDateString("en-US", {month:"short",day:"numeric",year:"numeric"});

    // Input validation
    if(!sets || !reps || !weight || sets<=0 || reps<=0 || weight<=0 || reps>100 || sets>50 || weight>2000){
        alert("Please enter realistic workout details.");
        return;
    }

    const oneRepMax = Math.round(weight*(1+reps/30));

    const newWorkout = {exercise, sets, reps, weight, oneRepMax, date};

    // Save persistently in localStorage per user
    const stored = JSON.parse(localStorage.getItem("workouts")||"{}");
    stored[user] = stored[user] || [];
    stored[user].unshift(newWorkout); // prepend
    localStorage.setItem("workouts", JSON.stringify(stored));

    // Clear inputs
    document.getElementById("sets").value="";
    document.getElementById("reps").value="";
    document.getElementById("weight").value="";

    renderWorkoutLog();
}

// Render workout log from localStorage
function renderWorkoutLog(){
    const user = localStorage.getItem("userName");
    const list = document.getElementById("workout_list");
    list.innerHTML = "";
    const stored = JSON.parse(localStorage.getItem("workouts")||"{}");
    if(stored[user]){
        stored[user].forEach(w=>{
            const li = document.createElement("li");
            li.innerHTML=`<strong>${w.exercise}</strong> - ${w.sets}x${w.reps} @ ${w.weight} lbs
                <br>1-Rep Max: <strong>${w.oneRepMax} lbs</strong><br><em>${w.date}</em>`;
            list.appendChild(li);
        });
    }
}

// Logout
function logout(){
    localStorage.removeItem("userCode");
    localStorage.removeItem("userName");
    window.location.href="index.html";
}