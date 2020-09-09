
function showUserAddButton (){
  let isPlaceholderFilled = document.getElementById("userAddButton").innerHTML && true
  let button = "<button class='button' onclick='confirmUserName()'>Add Player</button>"
  console.log(isPlaceholderFilled)
  if (!isPlaceholderFilled) document.getElementById("userAddButton").innerHTML=button;
}

/*function removeUserAddButton (){
  document.getElementById("userAddButton").innerHTML=""
}*/

document.getElementById("startGameButton").addEventListener("click", function(){

  document.getElementById("userAddButton").innerHTML=""
})

function confirmUserName () {

let names = [
document.getElementById("player_1_input"),
document.getElementById("player_2_input"),
document.getElementById("player_3_input"),
document.getElementById("player_4_input")
]
console.log("aqui")
names.forEach((item,index) => {
  let test = item && true
  var theid = ""
  var new_td = ""
  
  if (test && (item.value != "")){
    theid = `player_${index+1}`  
    var name_display = document.getElementById(theid)
    new_td = `<h2>${item.value}</h2>`
    name_display.innerHTML=new_td
    gameButton = document.getElementById("calculateButton")
    gameButton.innerHTML = "<button id='startGameButton' class='calculate-button' onclick='countTheDices()'>Click to Play</button>"
  }else if (test && item.value == ""){
    let button = "<button class='button' onclick='confirmUserName()'>Add Another Player</button>"
    document.getElementById("userAddButton").innerHTML=button
  }
  
})
let names_updated = [
  document.getElementById("player_1_input"),
  document.getElementById("player_2_input"),
  document.getElementById("player_3_input"),
  document.getElementById("player_4_input")
  ]
}

function calculateTotal (){
  let sum = 0    
  let bonus = 63
  for (let i=0; i<6; i++){
    let rowValue = document.getElementsByClassName("row-number")  
    sum += rowValue[i].valueAsNumber
    
  }
  if (sum>12) {
    sum += bonus
    document.getElementById("bonus").innerHTML=bonus    
  }else document.getElementById("bonus").innerHTML="0"
  
  document.getElementById("summa").innerHTML=sum
  

}

function rollTheDice(){
  let nofsides = 6
  let dice = []
  for (let i=0; i<5; i++){
    dice[i]=Math.floor(Math.random() * nofsides +1)
  } 
  console.log(dice)
  return dice
}

function countTheDices(){
  dices=rollTheDice()

  count = [0,0,0,0,0,0,0]
  dices.forEach(element => {
    count[element]++
  })

  writeResultOnScreen(count)

  //console.log(count)
  isFullHouse(count)
  
  return count
}

function writeResultOnScreen(count){
  let sum = [0,0,0,0,0,0]
// console.log(Number(tmp1))
  //let tmp2 = 0

  for (i=0; i<6; i++){
    let read = document.getElementById(`player1-${i + 1}`).innerText
    console.log(read)
    if (!isNaN(Number(read))){
      sum[i] = Number(read)
    }   
  }

  count.forEach((element, index) => {
    
    if(index>0){
//      tmp1 = document.getElementById("summa").value
        let i = index - 1
        sum[i] += element 
//      console.log(tmp2)
        document.getElementById("player1-"+(index)).innerHTML=sum[i]
    }
  })

    let totalSumma = 0
    let bonus = 50
    for(let i=0; i<6; i++){
      totalSumma += sum[i]*(i+1)
    }
    if (totalSumma >= 63){
      totalSumma += bonus
      document.getElementById("bonus").innerHTML=bonus;
    }else document.getElementById("bonus").innerHTML=0;
  
    document.getElementById("summa").innerHTML=totalSumma
    
    console.log("soma total é: " + totalSumma)

}

function isFullHouse(count){
    //diceResults=[1,1,6,6,6]
   // diceResults = rollTheDice()
   // console.log(diceResults)
    var is3Reps =false
    var is2Reps =false
    var isFH = false
 
  //diceResults.forEach((element) => {
   
    //count[element]++    
    
    /*if (element==1){
          count[0]++
        }else if (element == 2){
          count[1]++
        }else if (element == 3){
          count[2]++
        }else if (element == 4){
          count[3]++
        }else if (element == 5){
          count[4]++
        }else if (element == 6){
          count[5]++
        } */        
 // })

  count.forEach((element) => {

    if (element == 3){
        is3Reps = true
    }
    if (element == 2){
        is2Reps=true
    }

  })

  if (is2Reps && is3Reps){
      isFH = true;
      document.getElementById("fh-player1").innerHTML="Yeahhh"   
  }else document.getElementById("fh-player1").innerHTML="Nope" 
    
  isFH? console.log("Is FullHouse"):console.log("Is Not Fullhouse")
}

