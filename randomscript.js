const htmltext = document.getElementById("title");
const img = document.getElementById("cardImage");
const img2 = document.getElementById("cardImage2");
const set = document.getElementById("set");
const history = document.getElementById("history");

async function getRandomCard(){
    reset();
    await wait(150);
    try{
        //otag:, game:paper, set:, etc
        const response = await fetch("https://api.scryfall.com/cards/random");
        const data = await response.json();
        htmltext.innerText = data["name"];
        try{
            if(data["card_faces"].length > 1){
                img.src = data["card_faces"]["0"]["image_uris"]["normal"];
                img2.src = data["card_faces"]["1"]["image_uris"]["normal"];
            }
        } catch(error){
            img.src = data["image_uris"]["normal"];
        }
        //document.body.style.backgroundImage = "url(" + data["image_uris"]["art_crop"] + ")";
        set.innerText = "Set: " + data["set"].toUpperCase();
        console.log(data);
        toHistory(img.src)
    } catch(error){
        console.error(error);
    }
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

function reset(){
    img.src = "magic_card_back.png";
    img2.src = "";
    htmltext.innerText = "Carregando...";
    set.innerText = "Set: SET";
}

function toHistory(imgsource){
    const newLog = document.createElement("img");
    newLog.src = imgsource;
    newLog.className = "tinyImage";
    history.appendChild(newLog);
}