let tdShowPoints = document.getElementsByClassName("pointsDisplay")


function showUserAddButton (){
  let isPlaceholderFilled = document.getElementById("userAddButton").innerHTML && true
  let button = "<button class='button' onclick='confirmUserName()'>Add Player</button>"
 // console.log(isPlaceholderFilled)
  if (!isPlaceholderFilled) document.getElementById("userAddButton").innerHTML=button;
}

/*function confirmUserName () {

let names = [
document.getElementById("player_1_input"),
document.getElementById("player_2_input"),
document.getElementById("player_3_input"),
document.getElementById("player_4_input")
]
names.forEach((item,index) => {
  let test = item && true
  var theid = ""
  var new_td = ""
  
  if (test && (item.value != "")){
    theid = `player_${index+1}`  
    var name_display = document.getElementById(theid)
    new_td = item.value
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
}*/

let playButton = document.getElementById("startGameButton")
let antalSpel = document.getElementById("antalSpel")

manipulateCheckboxes = () =>{
  let checkBox = []
  for (let i=0; i<5; i++){
    checkBox[i] = document.getElementById("save-input-"+(i+1))
    checkBox[i].style.display = "none"
  }
}

playButton.addEventListener("click", countTheDices)

manipulateCheckboxes()


function countTheDices(){
  //checkBox[i].style.display = "flex"

  dices=rollTheDice()
  

  count = [0,0,0,0,0,0,0]
  dices.forEach(element => {
    count[element]++
  })

  writeResultOnScreen(count)

  console.log(count)
  //isFullHouse(count)
  
  return count
}

function calculateTotal (){
  let sum = 0
  let underSum = 0    
  let bonus = 50
  let upperRowValue=0
  let underRowValue=0
  for (let i=0; i<14; i++){
    if (i<6) {
      upperRowValue = Number(document.getElementById(`player1-${i+1}`).innerHTML)
      sum += upperRowValue
    } else{
      underRowValue = Number(document.getElementById(`player1-${i+1}`).innerHTML)
      underSum += underRowValue
    } 
   
    
  }
  if (sum>=63) {
    sum += bonus
    document.getElementById("bonus").innerHTML=bonus    
  }else document.getElementById("bonus").innerHTML="0"
  
  document.getElementById("summa").innerHTML=sum
  document.getElementById("totalSumma").innerHTML=sum + underSum
  

}

function rollTheDice(){
  console.log('aqui')
  let antalSpel = document.getElementById("antalSpel")
  let antalSpelNumber = Number(antalSpel.innerText)
  let btnPlaceHolder = document.getElementById("calculateButton")

  for (let i=0;i<15;i++){
    let pointField = document.getElementById("player1-"+(i+1))
    if (pointField.innerText == "") tdShowPoints[i].style.display="inline"
    else tdShowPoints[i].style.display="none"

  }

  checkboxArray=[]
  for (let j=0; j<5; j++){
    checkboxArray[j]=document.getElementById("save-input-"+(j+1)).checked
   // console.log(checkboxArray)
  }
 // [false,true,false,false,true]
  let nofsides = 6
  let dice = []
  //let antalSpel = Number(document.getElementById("antalSpel").innerText)
  if (antalSpelNumber>0){
    for (let i=0; i<5; i++){
      if(!checkboxArray[i]){
        dice[i]=Math.floor(Math.random() * nofsides) +1
        let updatefield = `<img src='./images/Alea_${dice[i]}.png'><input id="save-input-${(i+1)}" type="checkbox">`
        document.getElementById("dice-show-"+(i+1)).innerHTML=updatefield
      }else {
        let imgstr = document.getElementById("dice-show-"+(i+1)).firstChild.src
        dice[i] = Number(imgstr.split("_")[1].slice(0,1))
        //dice[i] = Number(imgstr.slice(15,1))
      }
    }
    antalSpel.innerHTML = antalSpelNumber-1  
  }
if (antalSpelNumber == 1){
    for(let i=0; i<5; i++){
   //   playbox__title.innerHTML = "Pick Your Points"
      let imgstr = document.getElementById("dice-show-"+(i+1)).firstChild.src
      dice[i] = Number(imgstr.split("_")[1].slice(0,1))
      console.log(dice[i])
    }
    
    btnPlaceHolder.style.display= "none"
}
 // console.log(dice)
  return dice
}

function writeResultOnScreen(count){
  let sum = [0,0,0,0,0,0]
// console.log(Number(tmp1))
  //let tmp2 = 0
  roundSpan = document.getElementById("antalRounds")
  roundSpanNumber = Number(roundSpan.innerText)
  antalSpel = document.getElementById("antalSpel")
  antalSpelNumber = Number(antalSpel.innerText)

  
  console.log(count)

  let isYatzy = count.includes(5)
  let isFourCounts = count.includes(4) 
  let isThreeCounts = count.includes(3) 
  let isTwoCounts = count.includes(2) 

  let straightTest = [1,1]
  
  let isFH = isThreeCounts && isTwoCounts
  let fhPoints = [0,0]
 
  count.forEach((element,index)=>{
    
    if (index!=0){
   
      
      if(element == 2){
        fhPoints[0]=index
      }
      
      
      if(element >= 3){
        fhPoints[1]=index
        tdShowPoints[8].innerHTML = "+"+index*3
        console.log(tdShowPoints[9].innerHTML)
      }
      let atLeastThree = isThreeCounts||isFourCounts||isYatzy
      if (!atLeastThree){
        tdShowPoints[8].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
        
      }

      if((element >= 4) && isFourCounts){
        tdShowPoints[9].innerHTML = "+"+index*4
      }
      let atLeastFour = isFourCounts||isYatzy
      if (!atLeastFour)tdShowPoints[9].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
      
      
      if ((element == 5) && isYatzy){
        tdShowPoints[14].innerHTML = "+"+50
      }else if (!isYatzy) tdShowPoints[14].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
      

    }

  })

  /*
  /* 
  /* END OF THE FOREACH LOOP
  /* 
  */

for (let index=0;index<15; index++){
  let antalRounds = Number(document.getElementById("antalRounds").innerHTML)
  tdFieldToWrite = document.getElementById(`player1-${index+1}`).innerHTML      
  let element = count[index+1]
  if (index<6){
        if (tdFieldToWrite=="" && element!=0){
      tdShowPoints[index].innerHTML = `+${element * (index+1)}`
    }else if (tdFieldToWrite=="" && element == 0){
      tdShowPoints[index].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
    }
  }

  tdShowPoints[index].addEventListener("click", function(){
    let btnPlaceHolder = document.getElementById("calculateButton")
    btnPlaceHolder.style.display = "block"
    !isNaN(Number(tdShowPoints[index].innerHTML))? 
    pointTableNumber = Number(tdShowPoints[index].innerHTML):
    pointTableNumber = 0
    console.log(pointTableNumber+'***************')
    document.getElementById("player1-"+(index+1)).innerHTML= pointTableNumber

    roundSpan.innerText = roundSpanNumber + 1
    antalSpel.innerText = "3"


    if (roundSpanNumber==15){
      btnPlaceHolder.style.display="none"
    } 
    for (let i = 0; i<15; i++){
      tdShowPoints[i].style.display="none"

      if (i<5) document.getElementById("save-input-"+(i+1)).checked = false
   }
    tdShowPoints[index].style.display = "none"
    if(antalRounds==15){
      calculateTotal()
    }
    
    manipulateCheckboxes()


  }) 

}

  if (isFH) tdShowPoints[12].innerHTML = "+"+Number(fhPoints[0]*2+fhPoints[1]*3)
  else tdShowPoints[12].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
  

  parCase=[0,0]
  let j=0
  let sumCount = 0
  for (let i = 0; i<7; i++){
   
    if (count[i] >= 2){
      parCase[j] = 2*i 
      j++ 
    }
   sumCount += i*count[i]
   if (i>0 && i < 6)straightTest[0]*=count[i]
   if (i > 1)straightTest[1]*=count[i]
   
  }
  straightTest[0] == 1? 
  tdShowPoints[10].innerHTML = "+"+15 :
  tdShowPoints[10].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"

  straightTest[1] == 1? 
  tdShowPoints[11].innerHTML = "+"+20 :
  tdShowPoints[11].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
  

  tdShowPoints[13].innerHTML = "+"+sumCount
  

  parCase[0]>parCase[1] ? 
  tdShowPoints[6].innerHTML = "+"+parCase[0] : 
  tdShowPoints[6].innerHTML = "+"+parCase[1]

  if ((parCase[0]+parCase[1])==0){
    tdShowPoints[6].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
  }

  if (parCase[0]*parCase[1] != 0){
    tdShowPoints[7].innerHTML = "+"+(parCase[1]+parCase[0])
  }else tdShowPoints[7].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
/*

  for(i=0; i<6; i++){
    let read = document.getElementById(`player1-${i + 1}`).innerText
   // console.log(read)
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
    */
   // console.log("soma total é: " + totalSumma)

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
/*
let diceshowbox = document.getElementById("diceShowBox")
let pointsDisplay = document.getElementsByClassName("pointsDisplay")

for (tdField of pointsDisplay){
  tdField.addEventListener("mouseover", function(e){
    let field = e.target.innerHTML="+23"
    
    console.log(field)

  })
  tdField.addEventListener("mouseout", function(e){
    let field = e.target.style.background=""
    console.log(field)

  })    
}*/

