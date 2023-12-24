// listener for alarm toggle
document.getElementById("").addEventListener(toggleAlarm);

// get stored stats and display to user
document.getElementById("counterPass").innerText("You've hydrated "+ localStorage.getItem("hydrationCount")+" times");
document.getElementById("counterFail").innerText("You were a cactus "+ localStorage.getItem("cactusCount")+" times >:(");

function toggleAlarm(){
    chrome.alarms.clear();
    chrome.alarms.create({
        name:"wawa"
    });
}
//TODO
// Alarm toggle functionality