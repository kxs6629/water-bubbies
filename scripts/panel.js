let toggleButton = document.getElementById("alarmToggle");

chrome.storage.sync.get(["alarm_enabled"]).then((res) => {
    toggleButton.checked = res.alarm_enabled;
});

// listener for alarm toggle
toggleButton.addEventListener('change',() =>{
    chrome.storage.sync.get(["alarm_enabled"]).then((res)=>{
        chrome.storage.sync.set({alarm_enabled: !res.alarm_enabled},function(){});
    });
});

statusCheck();


async function statusCheck() {
    const passCount = await chrome.storage.sync.get(["hydrationCount"]).then((result) =>{
        document.getElementById("counterPass").innerText = "Hydration Count: "+result.hydrationCount;
        return result.hydrationCount;
    });
    const failCount = await chrome.storage.sync.get(["cactusCount"]).then((result) =>{
        document.getElementById("counterFail").innerText = "Cactus Count: "+result.cactusCount;
        return result.cactusCount;
    });

    const sum = await passCount-failCount;
    populateImage(sum);
}

function populateImage(sum){;
    const statusImg = document.getElementById("statusImg");
    const statusText = document.getElementById("statusText");
    if(sum > 0){
        statusImg.setAttribute("src", "../media/uwu.png");
        statusImg.setAttribute("alt", "hydrated_image");
        statusText.innerText = "You're so hydrated!!";
    } else if(sum < 0){
        statusImg.setAttribute("src", "../media/cactus.png");
        statusImg.setAttribute("alt", "cactus_image");
        statusText.innerText = "You're a currently a cactus.";
    } else if (sum == 0){
        statusImg.setAttribute("src", "../media/hydrate.png");
        statusImg.setAttribute("alt", "neutral_image");
        statusText.innerText = "You feel neutral.";
    } else{
        console.log("how?");
    }
}