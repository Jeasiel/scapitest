const setField = document.getElementById("set");
let passed = false;

async function checkSet(code){
    if(code == "" || code.length != 3){
        setField.style.outlineColor = "red";
        setField.focus();
    } else if(!passed) {
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
            }
        } catch(error){
            console.error(error);
        }
    }
}

async function getRandomCard(){
    try{
        const response = await fetch("https://api.scryfall.com/cards/random");
        const data = await response.json();
        console.log(data);
    } catch(error){
        console.error(error);
    }
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}