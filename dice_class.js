    // We create a first Dices class here which has 3 attribues
    // One attribute of an array in which we will push 5 Dice Objects (with a random value)
    // One attribute in which we will keep track of how many of each dice we've had.
    // One attribute for the checkboxes below the dices 
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
        // In this method we're mapping the this.dice array and incrementing the value of each dice
        // For example, if we've had 2x Ones and 3x Fives in a dice throw this map function will give the
        // this.dice_values array the following values [0, 2, 0, 0, 0, 3, 0]
        calculateDiceValues(){
            this.dice.map(current_value => {
                this.dice_values[current_value.value]++;
            })
        }

        // Method that sets new dice image depending on value of the dice 
        // If a checkbox is checked it doesn't change the image for the next roll.
        showDiceImages(i){
            if(!this.checkbox[i]){
                let updatefield = `<img src='./images/Alea_${this.dice[i].value}.png'><input id="save-input-${(i+1)}" class="check-input" type="checkbox">`
                document.getElementById("dice-show-"+(i+1)).innerHTML=updatefield
            }
            

        }

        // Method that calculates the points for the upper table (Ones to Sixes).
        // Does it by checking each element in the dice_values array and multiplies them by the index
        // i.e If there are 5x threes it will multiply the element (5) by the index number (3) and return 15.
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

        // Method that calculates the upper table results and shows them to the right of the yatzy form
        printTableResults(game){
            let count = (game.game_rounds-1) % game.number_of_players;
            let playerId = game.players[count].id
            let UpperPointsArray = this.upperTablePoints();
            // We need to get rid of index = 0. The shift() method does just that!
            UpperPointsArray.shift();
            let tdShowPoints = Array.from(document.getElementsByClassName("pointsDisplay"))
            let player1Points = [];

            for(let i = 0; i<6; i++){
                player1Points[i] = document.getElementById("player"+playerId+"-"+(i+1));
                if(!player1Points[i].innerHTML){
                    tdShowPoints[i].innerHTML = "+" + UpperPointsArray[i]                
                } else tdShowPoints[i].innerHTML = ""
            }
            
            for (let i=6; i<15; i++){
                player1Points[i] = document.getElementById("player"+playerId+"-"+(i+1));
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

        // In this Method we have an event listener that will make sure that when we click on the points we want to save
        // It will be transfered into the correct column/row and it will also update the total sum/bonus for the player 
        // when we've pressed the points we want.
  
        confirmUpperPoints(j,game){
            let tdShowPoints = Array.from(document.getElementsByClassName("pointsDisplay"));
            let count = (game.game_rounds-1) % game.number_of_players;
            let playerId = game.players[count].id
            let upperPoints = [];

            for (let i = 0; i < 6; i++){                
                upperPoints[i] = document.getElementById("player"+(playerId)+"-"+(i+1))
                                
                    if(i==j){
                        upperPoints[i].innerHTML = Number(tdShowPoints[i].innerHTML); //Here is where the users choose their points
                    }
                    
                    

            
                
                tdShowPoints.forEach(element =>{
                    element.style.display="none";// Then we need to remove the whole column with point display
                });                
                this.upperTableTotalSum(game);
                this.checkForBonus(game);
                this.totalSum(game)
             
            }
        }
        // Method that updates the player points.

        upperTableTotalSum(game){
            let count = (game.game_rounds-1) % game.number_of_players;
            let playerId = game.players[count].id
            let playerPoints = Array.from(document.getElementsByClassName("column-"+playerId)).map(e=>Number(e.innerHTML)).filter((e,index)=>index<6);
            
            let playerSum = document.getElementById("sum-"+playerId);            
            
            return playerPoints.reduce((previous_value, current_die) => {
                return playerSum.innerHTML = previous_value + current_die;
            }, 0);    
    }
        // Method that checks for bonus. If sum is >= 63 you get a bonus, else you get 0.

        checkForBonus(game){
            let count = (game.game_rounds-1) % game.number_of_players;
            let playerId = game.players[count].id
            let playerSum = document.getElementById("sum-"+playerId).innerHTML;
            let playerBonus = document.getElementById("bonus-"+playerId);

            if (Number(playerSum)>=63){
                playerBonus.innerHTML = 50
            }
            return playerBonus;

        }

        confirmBottomPoints(j,game){
            let count = (game.game_rounds-1) % game.number_of_players;
            let playerId = game.players[count].id
            let tdShowPoints = Array.from(document.getElementsByClassName("pointsDisplay"));
            let bottomPoints = [];
            //console.log(game.current_player)
            for (let i = 0; i < 9; i++){
                console.log(i)
                bottomPoints[i] = document.getElementsByClassName("column-"+playerId)[i+6];//Börjar räkna från rad 6
                
                if((i+6)==j){
                    bottomPoints[i].innerHTML = Number(tdShowPoints[i+6].innerHTML); //Behövs för att fåbort poängen på sidan
                }        
                
                        

                tdShowPoints.forEach(element =>{
                    element.style.display="none";
                    this.totalSum(game)
                })
            }
        }

        totalSum(game){
            let count = (game.game_rounds-1) % game.number_of_players;
            let playerId = game.players[count].id
            let playerPoints = Array.from(document.getElementsByClassName("column-"+playerId)).map(e=>Number(e.innerHTML));
            
            let bonus = Number(document.getElementById("bonus-"+playerId).innerHTML);
            playerPoints.push(bonus);
            let sum = document.getElementById("totalSumma-"+playerId);            
            
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
    