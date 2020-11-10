window.addEventListener("DOMContentLoaded", ()=>{
    //let numberOfPlayers = parseInt(prompt("How many players? Min: 1 Max: 4"))
    
   // this.checkbox = Array.from(document.getElementsByClassName("check-input")).map(element=>element.style.display = "none")

    let startGameButton = document.getElementById("startGameButton");
    let addPlayersButton = document.getElementById("addPlayersButton");
    let tdShowPoints = Array.from(document.getElementsByClassName("pointsDisplay"));
    const checkboxes = Array.from(document.getElementsByClassName("check-input"))
    let n = 1;
    let game;
    
    addPlayersButton.addEventListener("click", e=>{
        let player_box = document.getElementById("player-box")
        let pBoxInput = document.getElementById("player-box-input")
        n = pBoxInput.value
        checkboxes.forEach(checkbox=>{
            checkbox.style.display="none";
        })
        game = new Game(n);    
        player_box.remove();
        

    })
    let newThrow;
    startGameButton.addEventListener("click", () => { 
        game.initializeState()
        game.turnControl();
      

        newThrow = new Dices();
        newThrow.printTableResults(game);
    
    })

    tdShowPoints.map((e, i)=>{
        e.addEventListener("click",()=>{
            console.log(game.players)
            newThrow.confirmUpperPoints(i, game);
            newThrow.confirmBottomPoints(i, game);
        })
    })



})