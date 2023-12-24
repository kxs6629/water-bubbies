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

    localStorage.setItem("hydrationCount", "0");
    localStorage.setItem("cactusCount","0");

});

chrome.alarms.onAlarm.addListener((alarm) =>{
    notification();
    chrome.notifications.onClicked.addListener(clickNotification);
})


function notification(){
    chrome.notifications.create(
        {
            title:"Hydration Check",
            message:"Did you hydrate? Click here to submit your answer :)",
            iconUrl: "../media/hydrate-128.png",
            type: "basic"
        }
    )
};

function clickNotification(){
    chrome.tabs.create({
        url: "../html/popup.html"
    });
}