let curState = chrome.storage.sync.get(["alarm_enabled"]);
let toggleButton = document.getElementById("alarmToggle");
toggleButton.checked = curState;

// listener for alarm toggle
toggleButton.addEventListener('change',function(){
    if(this.checked){
        chrome.storage.sync.set({alarm_enabled:false});
    }
    else{
        chrome.storage.sync.set({alarm_enabled:true})
    }
});

// get stored stats and display to user
document.getElementById("counterPass").innerText = "You've hydrated "+ chrome.storage.sync.get(["hydrationCount"])+" times";
document.getElementById("counterFail").innerText = "You were a cactus "+ chrome.storage.sync.get(["cactusCount"])+" times >:(";

//TODO
// Alarm toggle functionality