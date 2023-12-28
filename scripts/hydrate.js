// Start timer consistent throughout browser being open
// Set a scheduled reminder to drink

chrome.runtime.onInstalled.addListener( async({reason}) => {
    if(reason !== "install") {
        return;
    }

    await chrome.alarms.create('wawa-alarm', {
        delayInMinutes: 0.5,
        periodInMinutes: 0.5
    });

    chrome.storage.sync.set({
        alarm_enabled:true,
        hydrationCount:0,
        cactusCount:0
    });
});

chrome.alarms.onAlarm.addListener((alarm) =>{
    notification();
    chrome.notifications.onClicked.addListener(clickNotification);
})


function notification(){
    if(chrome.storage.sync.get(["alarm_enabled"])){
        chrome.notifications.create(
            {
                title:"Hydration Check",
                message:"Did you hydrate? Click here to submit your answer :)",
                iconUrl: "../media/hydrate-128.png",
                type: "basic"
            }
        ) 
    }
    else{
        console.log(chrome.storage.sync.get(["alarm_enabled"]));
    }
    
};

function clickNotification(){
    chrome.tabs.create({
        url: "../html/popup.html"
    });
}