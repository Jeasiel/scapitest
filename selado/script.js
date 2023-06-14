

async function getRandomCardByTag(tag){
    try{
        const response = await fetch("https://api.scryfall.com/cards/random");
        const data = await response.json();
        console.log(data);
    } catch(error){
        console.error(error);
    }
}