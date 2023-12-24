const image = document.getElementById('water_image');
const buttons = document.getElementsByTagName("button");

document.getElementById("yes").addEventListener("click",yes);
document.getElementById("no").addEventListener("click",no);

let factNum = Math.floor(Math.random() * 9);
fetch("../scripts/hydrationFacts.json")
    .then(response => response.json)
    .then(document.getElementById('hydrationFactHeader').innerText());

function yes(){
    let hydrationCount = parseInt(localStorage.getItem("hydrationCount"))+1;
    localStorage.setItem("hydrationCount", String(hydrationCount));
    // show happy bottle
    image.src = "../media/uwu-128.png";
    while(buttons[0]) buttons[0].parentNode.removeChild(buttons[0]);
    document.getElementsByTagName("p")[0].innerText = "Good :)";
}

function no(){
    let cactusCount = parseInt(localStorage.getItem("cactusCount"))+1;
    localStorage.setItem("cactusCount", String(cactusCount));
    //show angry bottle
    image.src="../media/angry-128.png";
    while(buttons[0]) buttons[0].parentNode.removeChild(buttons[0]);
    document.getElementsByTagName("p")[0].innerText = "Hydrate >:(";
}



//TODO
// update stats tracker in storage
// Make page pretty >:(