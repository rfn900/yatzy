class Game {
    constructor(n=1){
        
        this.number_of_players = n;
        this.players = [];
        this.current_player = 1;
        for (let i=1; i<=this.number_of_players;i++){
            this.players.push(new Player(i));
        }
        this.calculateNumberOfRounds();
    }

    calculateNumberOfRounds(){
        let totalRoundsSpan = document.getElementById("totalNumberOfRounds");
        this.total_game_rounds = 16 * this.number_of_players;
        totalRoundsSpan.innerHTML = 16 * this.number_of_players;
    }
    

    initializeState(){
        this.tdShowPoints = Array.from(document.getElementsByClassName("pointsDisplay"));
        this.dice_rolls = Number(document.getElementById("antalSpel").innerHTML);
        this.game_rounds = Number(document.getElementById("antalRounds").innerHTML);
        this.checkbox = document.getElementsByClassName("check-input");
        this.totalNumberOfRounds = Number(document.getElementById("totalNumberOfRounds").innerHTML)
    }

    updateCurrentPlayer(){
        //console.log(this.game_rounds)
        return this.game_rounds % this.number_of_players;
        
        
    }

    turnControl(){
        //console.log(this.players)
        let dice_rolls = this.dice_rolls
        //console.log(this.current_player)
        
        dice_rolls--
         
        document.getElementById("antalSpel").innerHTML = dice_rolls
        
        let startButton = document.getElementById("startGameButton")
        if (dice_rolls === 0){
            startButton.style.display = "none"
        }
        this.tdShowPoints.map((element,index)=>{
            element.addEventListener("click",(event)=>{
                Array.from(this.checkbox).map(element => element.checked = false)
                Array.from(this.checkbox).map(element => element.style.display = "none")
                let game_rounds = this.game_rounds // Update number of rounds
                game_rounds++ // Update number of rounds 
                document.getElementById("antalRounds").innerHTML = game_rounds // Update number of rounds
                

                startButton.style.display = "initial"
                
                if (game_rounds == this.total_game_rounds){
                    
                    startButton.style.display = "none"
                }
                document.getElementById("antalSpel").innerHTML = 3 // Reset number of Dice Throws
            })
        })
    }
    testingMyShit(){
        this.my_shit = 1;
    }
    consoleTest(){
        this.my_shit++
        
    }
    // tellUserToChoosePoints(){   
    //   let divWithButton = document.getElementById("calculateButton")
    //   let message = document.createElement("H3")
    //   message.innerHTML = "Choose Your Points on the Side of the Table"
    //   divWithButton.appendChild(message) 
    // }
  
}
