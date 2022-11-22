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
      if (attacker != undefined){
        var neighbors = attacker.dataset.neighbor
        console.log("--Neighbors:", neighbors)
        for (var i; i < neighbors.length; i++){
          console.log("-->>neighbor:",neighbors[i])
          if (territory.id == neighbors[i]){
            content = "defender"
          }
        }
      }
      var ownerRegion = document.getElementById(content+"-region")
      var ownerTroops = document.getElementById(content+"-troops")
      ownerRegion.textContent = territory.id
      ownerTroops.textContent = territoryTroops
      if (content === "attacker"){
        attacker = event.current
      }
      content = "attacker"
    })
})
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