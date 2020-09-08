function showUserAddButton (){
    let button = "<button class='useradd-button' onclick='confirmUserName()'>Add Player</button>"
    document.getElementById("userAddButton").innerHTML=button
}

function removeUserAddButton (){
  //  document.getElementById("userAddButton").innerHTML=""
}

function confirmUserName (){

name = document.getElementById("player_1").value;
console.log(name)
}