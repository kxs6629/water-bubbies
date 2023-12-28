const image = document.getElementById('water_image');
const buttons = document.getElementsByTagName("button");

document.getElementById("yes").addEventListener("click",yes);
document.getElementById("no").addEventListener("click",no);

let factNum = Math.floor(Math.random() * 9);
fetch("../scripts/hydrationFacts.json")
    .then(response => response.json())
    .then(data => console.log(data["hydrationFacts"][factNum]))
    .catch(error => console.error('Error: ',error));
    // .then(document.getElementById('hydrationFactHeader').innerText = response[][]);

function yes(){
    let hCount = chrome.storage.sync.get(["hydrationCount"])+1;
    chrome.storage.sync.set({hydrationCount: hCount});
    // show happy bottle
    image.src = "../media/uwu-128.png";
    while(buttons[0]) buttons[0].parentNode.removeChild(buttons[0]);
    document.getElementsByTagName("p")[0].innerText = "Good :)";
}

function no(){
    let cCount = chrome.storage.sync.get(["cactusCount"])+1;
    chrome.storage.sync.set({cactusCount: cCount});
    //show angry bottle
    image.src="../media/angry-128.png";
    while(buttons[0]) buttons[0].parentNode.removeChild(buttons[0]);
    document.getElementsByTagName("p")[0].innerText = "Hydrate >:(";
}



//TODO
// update stats tracker in storage
// Make page pretty >:(