function showUserAddButton (){
    let isPlaceholderFilled = document.getElementById("userAddButton").innerHTML && true
    let button = "<button class='useradd-button' onclick='confirmUserName()'>Add Player</button>"
    if (!isPlaceholderFilled) document.getElementById("userAddButton").innerHTML=button;
}

function removeUserAddButton (){
  //  document.getElementById("userAddButton").innerHTML=""
}

function confirmUserName (){

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
    
    if (test && item.value != ""){
      theid = `player_${index+1}`  
      var name_display = document.getElementById(theid)
      new_td = `<h2>${item.value}</h2>`
      name_display.innerHTML=new_td
    }else if (test && item.value == ""){
      let button = "<button class='useradd-button' onclick='confirmUserName()'>Add Another Player</button>"
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