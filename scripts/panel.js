let curState = chrome.storage.sync.get(["alarm_enabled"]).alarm_enabled;
let toggleButton = document.getElementById("alarmToggle");

chrome.storage.sync.get(["alarm_enabled"]).then((res) => {
    toggleButton.checked = res.alarm_enabled;
    console.log(res);
});

// listener for alarm toggle
toggleButton.addEventListener('change',() =>{
    if(this.checked){
        chrome.storage.sync.get(["alarm_enabled"]).then((res)=>{
            chrome.storage.sync.set({alarm_enabled: true},function(){});
        })
    }
    else{
        chrome.storage.sync.get(["alarm_enabled"]).then((res)=>{
            chrome.storage.sync.set({alarm_enabled: false},function(){});
        })
    }
});


// get stored stats and display to user
chrome.storage.sync.get(["hydrationCount"]).then((result) =>{
    document.getElementById("counterPass").innerText = "You've hydrated "+result.hydrationCount+" times";
});

chrome.storage.sync.get(["cactusCount"]).then((result) =>{
    document.getElementById("counterFail").innerText = "You've been a cactus "+result.cactusCount+" times";
});
    


//TODO