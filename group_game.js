
window.addEventListener("DOMContentLoaded", ()=>{
    //let numberOfPlayers = parseInt(prompt("How many players? Min: 1 Max: 4"))
    
    this.checkbox = Array.from(document.getElementsByClassName("check-input")).map(element=>element.style.display = "none")

    let startGameButton = document.getElementById("startGameButton");
    let addPlayersButton = document.getElementById("addPlayersButton");



    // We create a class here...
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
            console.log(this.game_rounds)
            return this.game_rounds % this.number_of_players;
            
            
        }

        turnControl(){
            console.log(this.players)
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

    class Player {
        constructor(i=1){
            this.id = i;
            this.name = "";
            this.final_points = 0;
        }
    }


    class Dices {
        constructor(size = 5){
            this.dice = [];
            this.dice_values = [0, 0, 0, 0, 0, 0, 0];
            this.checkbox = Array.from(document.getElementsByClassName("check-input")).map(element=>element.checked)
            for (let i = 0; i < size; i++) {
                this.dice.push(new Dice(i, this.checkbox[i]));
                this.showDiceImages(i);
            }
            this.calculateDiceValues();
        }

        calculateDiceValues(){
            this.dice.map(current_value => {
                this.dice_values[current_value.value]++;
            })
        }

        showDiceImages(i){
            if(!this.checkbox[i]){
                let updatefield = `<img src='./images/Alea_${this.dice[i].value}.png'><input id="save-input-${(i+1)}" class="check-input" type="checkbox">`
                document.getElementById("dice-show-"+(i+1)).innerHTML=updatefield
            }
            

        }

        upperTablePoints(){
            let pointsArray = [0, 0, 0, 0, 0, 0, 0];
            //[0, 2, 1, 0, 0, 2, 0] -> 2*1 + 1*2 + 2*5 = 14
            // pointsArray = [0, 2, 2, 0, 0, 10, 0]
            this.dice_values.forEach((element,index)=>{
                pointsArray[index] = element * index;
            })
            return pointsArray;
        }


        pointsForTwoOfAKind(){
            let arr = this.checkForPairs()
            return arr[1]>arr[0] ? arr[1] : arr[0]
        }

        pointsForTwoPairs(){
            let arr = this.checkForPairs()
            return arr[0]*arr[1] == 0 ? 0 : arr[0] + arr[1]
        }

        checkForPairs(){
            let pair = []
            for (let i=0; i<this.dice_values.length; i++){
                if (this.dice_values[i] == 2 || this.dice_values[i] == 3){
                    pair.push(i * 2)
                    
                }else if (this.dice_values[i] == 4 || this.dice_values[i] == 5){
                    pair[0] = i * 2
                    pair[1] = i * 2
                }
                
            }
            
        if (pair.length == 0){
            return [0,0]
        }else if (pair.length == 1){
            return [pair[0],0]

        }else if (pair.length == 2){
            return pair
        }
            
        }

        pointsForThreOfAKind() {
            let threes = 0;
            if (this.dice_values.includes(3)) {
                threes = this.dice_values.indexOf(3) * 3
            }else if (this.dice_values.includes(4)){
                threes = this.dice_values.indexOf(4) * 3
            } else if (this.dice_values.includes(5)){
                threes = this.dice_values.indexOf(5) * 3
            }

            return threes
        }
        pointsForFourOfAKind() {
            let fours=0;

            if (this.dice_values.includes(4)){
                fours = this.dice_values.indexOf(4) * 4
            } else if (this.dice_values.includes(5)){
                fours = this.dice_values.indexOf(5) * 4
            }             
            return fours
        }

        pointsForFullHouse() {
            let twos = 0;
            let threes = 0;
            for(let i = 1; i <= 6; i++) {
                if (this.dice_values[i] == 2) {
                    twos = i * 2;
                }
                if (this.dice_values[i] == 3) {
                    threes = i * 3;
                }
            }
            if ( (twos > 0) && (threes > 0) ) {
                return twos + threes;
            } else {
                return 0;
            }
        }
        pointsForSmallStraight(){
            
            let arr = this.dice_values.slice(1, this.dice_values.length)
            arr.pop()
            let new_arr = arr.filter(e => e === 1)
            
            return new_arr.length === 5? 15 : 0
            
        }

        pointsForLargeStraight(){
            let arr = this.dice_values.slice(1, this.dice_values.length)
            arr.shift()
            let new_arr = arr.filter(e => e === 1)
            
            return new_arr.length === 5? 20 : 0
            
        }

        pointsForYatzy() {
            return this.dice_values.includes(5) ? 50 : 0
        }

        pointsForChance() {

            return this.dice.reduce((previous_value, current_die) => {
                return previous_value + current_die.value;
            }, 0);
 
        }

        printTableResults(){
            let UpperPointsArray = this.upperTablePoints();
            // We need to get rid of index = 0. The shift() method does just that!
            UpperPointsArray.shift();
            let tdShowPoints = Array.from(document.getElementsByClassName("pointsDisplay"))
            let player1Points = []
            for(let i = 0; i<6; i++){
                player1Points[i] = document.getElementById("player1-"+(i+1));
                if(!player1Points[i].innerHTML){
                    tdShowPoints[i].innerHTML = "+" + UpperPointsArray[i]                
                } else tdShowPoints[i].innerHTML = ""
            }
            for (let i=6; i<15; i++){
                player1Points[i] = document.getElementById("player1-"+(i+1));
            }

            if(!player1Points[6].innerHTML){
                tdShowPoints[6].innerHTML = "+" + this.pointsForTwoOfAKind()
            }else tdShowPoints[6].innerHTML = ""
            
            if(!player1Points[7].innerHTML){
                tdShowPoints[7].innerHTML = "+" + this.pointsForTwoPairs()
            }else tdShowPoints[7].innerHTML = ""

            if(!player1Points[8].innerHTML){
                tdShowPoints[8].innerHTML = "+" + this.pointsForThreOfAKind()
            }else tdShowPoints[8].innerHTML = ""

            if(!player1Points[9].innerHTML){
                tdShowPoints[9].innerHTML = "+" + this.pointsForFourOfAKind()
            }else tdShowPoints[9].innerHTML = ""
            
            if(!player1Points[10].innerHTML){
                tdShowPoints[10].innerHTML = "+" + this.pointsForSmallStraight()
            }else tdShowPoints[10].innerHTML = ""

            if(!player1Points[11].innerHTML){
                tdShowPoints[11].innerHTML = "+" + this.pointsForLargeStraight()
            }else tdShowPoints[11].innerHTML = ""

            if(!player1Points[12].innerHTML){
                tdShowPoints[12].innerHTML = "+" + this.pointsForFullHouse()
            }else tdShowPoints[12].innerHTML = ""

            if(!player1Points[13].innerHTML){
                tdShowPoints[13].innerHTML = "+" + this.pointsForChance()
            }else tdShowPoints[13].innerHTML = ""
            
            if(!player1Points[14].innerHTML){
                tdShowPoints[14].innerHTML = "+" + this.pointsForYatzy()
            }else tdShowPoints[14].innerHTML = ""
            

    
            
            tdShowPoints.filter(e=>e.innerHTML!="").forEach(element =>{ //Behövs för att få tillbaka poängen nästa runda
                element.style.display="block";
            });
   
        }

        confirmUpperPoints(){
            
            let tdShowPoints = Array.from(document.getElementsByClassName("pointsDisplay"));
            
            let playerId = game.players[index].id;
            
            let upperPoints = [];
            for (let i = 0; i < 6; i++){                
                upperPoints[i] = document.getElementById("player1-"+(i+1))
                tdShowPoints[i].addEventListener("click", e=>{
               
                    //console.log(playerId)
                    //game.current_player++;
                    upperPoints[i].innerHTML = Number(tdShowPoints[i].innerHTML); //Here is where the users choose their points
                    tdShowPoints.forEach(element =>{
                            element.style.display="none";// Then we need to remove the whole column with point display
                        });                
                        this.upperTableTotalSum();
                        this.checkForBonus();
                        this.totalSum()
                    })
                
            }
            
        }


        upperTableTotalSum(){
            let playerPoints = Array.from(document.getElementsByClassName("column-1")).map(e=>Number(e.innerHTML)).filter((e,index)=>index<6);
            
            let player1Sum = document.getElementById("sum-1");            
            
            return playerPoints.reduce((previous_value, current_die) => {
                return player1Sum.innerHTML = previous_value + current_die;
            }, 0);    
    }

        checkForBonus(){
            let player1Sum = document.getElementById("sum-1").innerHTML;
            let player1Bonus = document.getElementById("bonus-1");

            if (Number(player1Sum)>=63){
                player1Bonus.innerHTML = 50
            }

        }

        confirmBottomPoints(){
            let tdShowPoints = Array.from(document.getElementsByClassName("pointsDisplay"));
            let bottomPoints = [];
            //console.log(game.current_player)
            for (let i = 0; i < 9; i++){
                
                bottomPoints[i] = document.getElementsByClassName("column-1")[i+6];//Börjar räkna från rad 6
                
                tdShowPoints[i+6].addEventListener("click", e=>{
                    
                        bottomPoints[i].innerHTML = Number(tdShowPoints[i+6].innerHTML); //Behövs för att fåbort poängen på sidan

                    tdShowPoints.forEach(element =>{
                        element.style.display="none";
                    });                
                    this.totalSum()
                })
            }
        }

        totalSum(){
            let playerPoints = Array.from(document.getElementsByClassName("column-1")).map(e=>Number(e.innerHTML));

            let sum = document.getElementById("totalSumma");            
            
            return playerPoints.reduce((previous_value, current_die) => {
                return sum.innerHTML = previous_value + current_die;
            }, 0);    
        }


     
        
}
    // Creating a new object with one property,
    // the property is a random value between 1-6.
    class Dice {
        constructor(i=0, isCheckBoxChecked = false) {
            if(!isCheckBoxChecked){
                this.value = this.new_value();
            }else{
                let imgstr = document.getElementById("dice-show-"+(i+1)).firstChild.src
                this.value = Number(imgstr.split("_")[1].slice(0,1))
            }
            
        }
        new_value() {
            return Math.floor(Math.random() * 6) + 1;
        }
    }
    
    
    
    let n = 1;
    let game;
    
    addPlayersButton.addEventListener("click", e=>{
        let player_box = document.getElementById("player-box")
        let pBoxInput = document.getElementById("player-box-input")
        n = pBoxInput.value
       
        game = new Game(n);    
        player_box.remove();
        
    })
    
    

    startGameButton.addEventListener("click", () => { 
        game.initializeState()
        game.turnControl();

        let newThrow = new Dices();
        newThrow.printTableResults();

        newThrow.confirmUpperPoints(game.current_player);
        newThrow.confirmBottomPoints();
    
               
    })

 
})
