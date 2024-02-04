const good_audio = new Audio("../media/audio/yippee.mp3");
const bad_audio  = new Audio("../media/audio/vine_boom.mp3");

const image = document.getElementById('water_image');
const buttons = document.getElementsByTagName("button");


let factNum = Math.floor(Math.random() * 9);
let ranFact = fetch("../scripts/hydrationFacts.json")
    .then(response => response.json())
    .then(data =>{
        document.getElementById("hydrationFactText").innerText = data["hydrationFacts"][factNum]["fact"];
    })
    .catch(error => console.error('Error: ',error));

document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(function() {
        document.getElementById("firstFade").style.opacity = 0;
        switchContent();
        // Fix the fade in and fade out for this.
        // Currently 5 seconds is the longest it can go before it's a funky transition
    }, 5000);
});

function yes(){
    const image = document.getElementById('water_image');
    let curDate = new Date();
    chrome.storage.sync.get(["hydrationCount"]).then((res)=>{
        chrome.storage.sync.set({hydrationCount: res.hydrationCount+1},function(){});
    });
    chrome.storage.sync.get(["timeSinceHydrate"]).then((res)=>{
        chrome.storage.sync.set({timeSinceHydrate: curDate.getTime()},function(){});
    });
    // show happy bottle
    good_audio.play();
    image.src = "../media/uwu.png";
    while(buttons[0]) buttons[0].parentNode.removeChild(buttons[0]);
    const goodP = document.createElement("p");
    goodP.setAttribute("id","endText");
    const goodText = document.createTextNode("Good :)");
    goodP.appendChild(goodText);
    const addHere = document.getElementById("secondFade");
    addHere.appendChild(goodP);
    delayClose();
}

function no(){
    const image = document.getElementById('water_image');
    chrome.storage.sync.get(["cactusCount"]).then((res)=>{
        chrome.storage.sync.set({cactusCount: res.cactusCount+1},function(){});
    });
    //show angry bottle
    bad_audio.play();
    image.src="../media/angry.png";
    while(buttons[0]) buttons[0].parentNode.removeChild(buttons[0]);
    const meanP = document.createElement("p");
    meanP.setAttribute("id","endText");
    const meanText = document.createTextNode("Hydrate you cactus >:(");
    meanP.appendChild(meanText);
    const addHere = document.getElementById("secondFade");
    addHere.appendChild(meanP);
    delayClose();
}

function switchContent(){
    const firstFade = document.getElementById("firstFade");
    firstFade.remove();

    const secondDiv = document.createElement("div");
    secondDiv.setAttribute("id","secondFade");
    const p = document.createElement("p");
    p.setAttribute("id","headerText");
    const pText = document.createTextNode("Did you hydrate?");
    p.appendChild(pText);
    const img = document.createElement("img");
    img.setAttribute("src","../media/hydrate.png");
    img.setAttribute("alt","water bottle");
    img.setAttribute("id","water_image");

    const btnDiv = document.createElement("div");
    btnDiv.setAttribute("id","btnGroup");

    const btn1 = document.createElement("button");
    btn1.setAttribute("type","button");
    btn1.setAttribute("id","yes");
    btn1.innerText = "yeah, i'm hydrated asf";

    const btn2 = document.createElement("button");
    btn2.setAttribute("type","button");
    btn2.setAttribute("id","no");
    btn2.innerText = "no >:(";

    secondDiv.append(p);
    secondDiv.append(img);
    btnDiv.append(btn1);
    btnDiv.append(btn2);

    secondDiv.append(btnDiv);
    
    document.body.appendChild(secondDiv);

    document.getElementById("yes").addEventListener("click",yes);
    document.getElementById("no").addEventListener("click",no);
    document.getElementById("secondFade").style.opacity = 1;
}

function delayClose(){
    setTimeout(function(){
        window.close();
    }, 7000);
}