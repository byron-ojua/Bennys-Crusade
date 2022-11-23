var compass = document.getElementById("compass")
var content = "attacker"
var attacker
var defender

document.querySelectorAll('.territory').forEach(item => {
    item.addEventListener('click', event => {

      var territory = event.currentTarget
      var territoryTroops = document.getElementById(territory.id + "-troops").textContent
      
      console.log("Territory selected")
      console.log("--Name(ID):", territory.id)
      console.log("--Troops:", territoryTroops)
      console.log("Attacker:", attacker)
      if (attacker != undefined){
        neighbors = attacker.dataset.neighbor
        console.log("--Neighbors:", neighbors)
        console.log("--Neighbors.length:", neighbors.length)

        if (neighbors.includes(territory.id)){
          defender = territory
          content = "defender"
        }
      }
      //set the correct info box to the right values.
      var ownerRegion = document.getElementById(content+"-region")
      var ownerTroops = document.getElementById(content+"-troops")
      ownerRegion.textContent = territory.id
      ownerTroops.textContent = territoryTroops

      console.log("")
      if (content == "attacker"){
        attacker = territory
        document.getElementById("defender-region").textContent = ""
        document.getElementById("defender-troops").textContent = ""
      }
      content = "attacker"
      return
    })
})

//Attack button when two 
var attackButton = document.getElementById("attack-box")
attackButton.addEventListener('click', function(){
  console.log("Attack clicked")
  var attackerTroops = document.getElementById("attacker-troops").textContent
  var defenderTroops = document.getElementById("defender-troops").textContent
  if (attackerTroops > 1 && defenderTroops > 0){
    console.log("--Rolling Dice!")
  }else{ 
    console.log("--Not enough troops")
  }
  
})

var sign = .25
var x = 0
window.onload = function() {
  setInterval(function () {
    x = x + sign
        
    compass.style.transform = 'rotate('+x+'deg)'
    if(x % 20 === 0){
      sign = sign * -1
    }
  }, 100)
}

console.log(window.innerWidth, '+', window.innerWidth)


//