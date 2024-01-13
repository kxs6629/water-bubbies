// Start timer consistent throughout browser being open
// Set a scheduled reminder to drink

chrome.runtime.onInstalled.addListener( async({reason}) => {
    if(reason !== "install") {
        return;
    }

    await chrome.alarms.create('wawa-alarm', {
        delayInMinutes: 0.2,
        periodInMinutes: 0.2
    });

});

chrome.alarms.onAlarm.addListener((alarm) =>{
    chrome.storage.sync.get(["alarm_enabled"]).then((res)=>{
        if(res.alarm_enabled){
            console.log("here");
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
            console.log(res.alarm_enabled);
        }
    });
    chrome.notifications.onClicked.addListener(clickNotification);
})

chrome.storage.sync.set({
    alarm_enabled:true,
    hydrationCount:0,
    cactusCount:0
});


function clickNotification(){
    chrome.tabs.create({
        url: "../html/popup.html"
    });
}