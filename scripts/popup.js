const good_audio = new Audio("../media/audio/yippee.mp3");
const bad_audio  = new Audio("../media/audio/vine_boom.mp3");

const image = document.getElementById('water_image');
const buttons = document.getElementsByTagName("button");


let factNum = Math.floor(Math.random() * 9);
let ranFact = fetch("../scripts/hydrationFacts.json")
    .then(response => response.json())
    .then(data =>{
        console.log(data["hydrationFacts"][factNum]);
        // document.getElementById("hydrationFactHeader").innerText = data["hydrationFacts"][factNum]["title"]; 
        document.getElementById("hydrationFactText").innerText = data["hydrationFacts"][factNum]["fact"];
    })
    .catch(error => console.error('Error: ',error));

document.getElementById("yes").addEventListener("click",yes);
document.getElementById("no").addEventListener("click",no);

document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(function() {
      document.getElementById("firstFade").style.opacity = 0;
      document.getElementById("secondFade").style.opacity = 1;
    }, 2500);
});

function yes(){
    chrome.storage.sync.get(["hydrationCount"]).then((res)=>{
        chrome.storage.sync.set({hydrationCount: res.hydrationCount+1},function(){});
    });
    // show happy bottle
    good_audio.play();
    image.src = "../media/uwu-128.png";
    while(buttons[0]) buttons[0].parentNode.removeChild(buttons[0]);
    document.getElementsByTagName("p")[0].innerText = "Good :)";
}

function no(){
    chrome.storage.sync.get(["cactusCount"]).then((res)=>{
        chrome.storage.sync.set({cactusCount: res.cactusCount+1},function(){});
    });
    //show angry bottle
    bad_audio.play();
    image.src="../media/angry-128.png";
    while(buttons[0]) buttons[0].parentNode.removeChild(buttons[0]);
    document.getElementsByTagName("p")[0].innerText = "Hydrate >:(";
}
//TODO
// Make page pretty >:(