let toggleButton = document.getElementById("alarmToggle");
let passCount = 0;
let failCount = 0;

chrome.storage.sync.get(["alarm_enabled"]).then((res) => {
    toggleButton.checked = res.alarm_enabled;
    console.log(res);
});

// listener for alarm toggle
toggleButton.addEventListener('change',() =>{
    chrome.storage.sync.get(["alarm_enabled"]).then((res)=>{
        chrome.storage.sync.set({alarm_enabled: !res.alarm_enabled},function(){});
    });
});


// get stored stats and display to user
chrome.storage.sync.get(["hydrationCount"]).then((result) =>{
    document.getElementById("counterPass").innerText = "You've hydrated "+result.hydrationCount+" times";
    passCount = result.hydrationCount;
});

chrome.storage.sync.get(["cactusCount"]).then((result) =>{
    document.getElementById("counterFail").innerText = "You've been a cactus "+result.cactusCount+" times";
    failCount = result.cactusCount;
    statusCheck();
});

    



function statusCheck() {
    let sum = passCount - failCount;
    const statusImg = document.getElementById("statusImg");
    const statusText = document.getElementById("statusText");
    switch (sum) {
        case sum > 0:
            statusImg.setAttribute("src", "../media/uwu.png");
            statusImg.setAttribute("alt", "hydrated_image");
            statusText.innerText = "You're so hydrated!!";
            break;
        case sum < 0:
            statusImg.setAttribute("src", "../media/cactus.png");
            statusImg.setAttribute("alt", "cactus_image");
            statusText.innerText = "You're a currently a cactus.";
            break;
        case sum == 0:
            statusImg.setAttribute("src", "../media/hydrate.png");
            statusImg.setAttribute("alt", "neutral_image");
            statusText.innerText = "You feel...neutral?";
            break;
    }
}
//TODO
// Make cactus icon
// Display whether hydrated or cactus ( what about neutral??)