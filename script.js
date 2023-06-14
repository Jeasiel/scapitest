



/* async function getRandomCard(){
    await wait(150);
    try {
        //otag:, game:paper, set:, etc
        const response = await fetch("https://api.scryfall.com/cards/random?unique=cards");
        const data = await response.json();
        console.log(data);
    } catch(error) {
        console.error(error);
    }
} // Essa é a função base (pega o dado da api) 

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
} // E essa é a de delay (necessária no scryfall)
*/