const setField = document.getElementById("set");
let passed = false;

async function checkSet(code){
    if(code == "" || code.length != 3){
        setField.style.outlineColor = "red";
        setField.focus();
    } else if(!passed) {
        let setYear = 0;
        try{
            passed = true;
            await wait(150);
            const response = await fetch("https://api.scryfall.com/sets/" + code);
            const data = await response.json();
            console.log(data);
            setField.style.outlineColor = "black";
            if (data["status"] != undefined){
                setField.style.outlineColor = "red";
                setField.focus();
                console.error("Erro! " + data["status"]);
                passed = false;
            } else {
                const confirm = document.createElement("p");
                confirm.innerText = "Tudo certo! Vamos ao próximo passo.";
                document.getElementById("options").appendChild(confirm);
                passed = true;
                setYear = Number(data["released_at"].slice(0, 4));
            }
        } catch(error){
            console.error(error);
        }
        //os 6 booster
        for(let i = 0; i < 6; i++){
            await createBooster(code, i, setYear);
            await wait(150);
        }
    }
}

async function createBooster(code, number, setYear){
    const booster = document.createElement("div");
    booster.className = "booster";
    const pack = document.createElement("h2");
    pack.innerText = "Pacote " + (number + 1);
    booster.appendChild(pack);
    const element = document.createElement("div");
    //15: 1 Basica, 10 comuns, 3 incomuns, 1 rara/mítica
    for(let i = 1; i <= 15; i++){
        const card = document.createElement("img");
        var data;
        if(i == 1){
            //basic
            data = await getRandomCard("set:" + code + "+t:basic");
        } else if(i == 2){
            //foil
            if(Math.floor(Math.random() * 3) == 2){
                data = await getRandomCard("set:" + code);
            } else {
                data = await getRandomCard("set:" + code + "+r:c");
            }
        } else if(i > 2 && i <= 11){
            //comum
            data = await getRandomCard("set:" + code + "+r:c+-t:basic");
        } else if(i > 11 && i <= 14){
            //incomun
            data = await getRandomCard("set:" + code + "+r:u");
        } else if(i == 15){
            //mr/r
            if(Math.floor(Math.random() * 8) == 7 && setYear > 2008){
                data = await getRandomCard("set:" + code + "+r:m");
            } else {
                data = await getRandomCard("set:" + code + "+r:r");
            }
        }
        card.alt = data["name"];
        const checker = document.createElement("input");
        checker.type = "checkbox";
        checker.value = data["name"];
        checker.className = "checkbox";
        try{            
            card.src = data["image_uris"]["normal"];
            element.appendChild(card);
        } catch(error){
            if(data["card_faces"].length > 1){
                const img2 = document.createElement("img");
                card.src = data["card_faces"]["1"]["image_uris"]["normal"];
                element.appendChild(card);
                img2.src = data["card_faces"]["0"]["image_uris"]["normal"];
                element.appendChild(img2);
            }
        }
        card.appendChild(checker);
        element.appendChild(checker);
        booster.appendChild(element);
    }
    document.getElementById("boosterArea").appendChild(booster);
}

async function getRandomCard(annex){
    try{
        const response = await fetch("https://api.scryfall.com/cards/random?q=game:paper+" + annex);
        const data = await response.json();
        //console.log(data);
        return data;
    } catch(error){
        console.error(error);
        return undefined;
    }
}

function getAllCards(){
    const allCards = document.getElementsByClassName("checkbox");
    let checkedCards = new Array();
    for(let i = 0; i < allCards.length; i++){
        if(allCards[i].checked){
            checkedCards.push([allCards[i].value, 1]);
            console.log(allCards[i]);
        }
    }
    let fixedCardList = new Array();
    for(let i = 0; i < checkedCards.length; i++){
        if(i != 0){
            let found = false;
            for(let j = 0; j < fixedCardList.length; j++){
                if(checkedCards[i][0] == fixedCardList[j][0]){
                    fixedCardList[j][1] += 1;
                    found = true;
                }
            }
            if(!found){
                fixedCardList.push(checkedCards[i]);
            }
        } else {
            fixedCardList.push(checkedCards[i]);
        }
        //checar repetições
    }
    for(let j = 0; j < fixedCardList.length; j++){
        console.log(fixedCardList[j]);
    }
    //console.log(document.getElementsByClassName("checkbox"));
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}