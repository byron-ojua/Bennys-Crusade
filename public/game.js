
var compass = document.getElementById("compass")
var tooltip = document.getElementById("tooltip")
var growMap = document.getElementById("map-size-grow")
var shrinkMap = document.getElementById("map-size-shrink")
var map = document.getElementById("map-overlay")

var content = "attacker"
var attacker
var defender
var tooltipTimer

var mapElems = []

// var mapElems = JSON.parse(fs.readFileSync("postData.json"));
var mapScale = 90


function insertNewMapElem(elemName, elemTroops, elemNeighbor, elemOwner, elemId, elemClass, elemPath) {

  var mapElemHtml = Handlebars.templates.mapElem({
    name: elemName,
    troops: elemTroops, 
    neighbor: elemNeighbor,
    owner: elemOwner,
    id: elemId,
    class: elemClass,
    path: elemPath
  })
  // console.log("== postCardHtml:", postCardHtml)
  map.insertAdjacentHTML('afterbegin', mapElemHtml)
  // return postCardHtml
}

mapElems.forEach(function (elem) {
  insertNewMapElem(elem.name, elem.troops, elem.neighbor, elem.owner, elem.id, elem.class, elem.path);
});


growMap.addEventListener('click', function() {
  mapScale += 5
  map.style.scale = mapScale + "%"
})

shrinkMap.addEventListener('click', function() {
  mapScale -= 5
  map.style.scale = mapScale + "%"
})

document.querySelectorAll('.territory').forEach(item => {
    item.addEventListener('click', event => {
      clearTimeout(tooltipTimer)
      hideDice()
      var territory = event.currentTarget
      var territoryTroops = document.getElementById(territory.id + "-troops").textContent
      
      console.log("Territory selected")
      console.log("--Name(ID):", territory.id)
      console.log("--Troops:", territoryTroops)
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

    item.onmouseenter = function(e){
      tooltipTimer = setTimeout(function() {
        // console.log("Hovered");
        tooltip.style.top =  e.pageY + "px";
        tooltip.style.left =  e.pageX + "px";
        tooltip.style.display =  "block";
        // console.log(item.id);

        document.getElementById("tooltip-region").innerText = "Region: " + item.dataset.name
        document.getElementById("tooltip-troops").innerText = "Troops: " + document.getElementById(item.id + "-troops").textContent
        document.getElementById("tooltip-owner").innerText = "Owner: " + item.dataset.owner
      }, 700)
    }

    item.onmouseout = function() {
      clearTimeout(tooltipTimer)
      tooltip.style.display =  "none";

    }
})

function hideDice(){
  diceBox = document.getElementById("dice-box")
  allDice = diceBox.querySelectorAll(".dice")
  for (var i = 0; i < allDice.length; i++){
    allDice[i].style.display = "none"
  }
}
//Attack button when two 
var attackButton = document.getElementById("attack-box")

attackButton.addEventListener('click', function(){
  hideDice()
  console.log("Attack clicked")
  var attackerTroops = document.getElementById("attacker-troops").textContent
  var defenderTroops = document.getElementById("defender-troops").textContent
  var attackDice = document.getElementById("attack-dice")
  var defenseDice = document.getElementById("defense-dice")
  

  if (attackerTroops > 1 && defenderTroops > 0){
    console.log("--Rolling Dice!")

    //Roll Attack Dice
    var diceRollAttack = []
    var allAttackDice = attackDice.querySelectorAll(".dice")
    console.log("Revealing All Attack Dice")
    for (var i = 0; i < attackerTroops-1 && i <= 2; i++){
      diceRollAttack.push((Math.floor(Math.random() * 6))+1)
      allAttackDice[i].textContent = diceRollAttack[i]
      allAttackDice[i].style.display = "flex"
    }

    //Roll Defense Dice
    var diceRollDefense = [(Math.floor(Math.random() * 6))+1]
    var allDefenseDice = defenseDice.querySelectorAll(".dice")
    console.log("Revealing All Defense Dice")
    allDefenseDice[0].textContent = diceRollDefense[0]
    allDefenseDice[0].style.display = "flex"
    if (defenderTroops > 1){
      diceRollDefense.push((Math.floor(Math.random() * 6))+1)
      allDefenseDice[1].textContent = diceRollDefense[1]
      allDefenseDice[1].style.display = "flex"
    }


    diceRollAttack.sort().reverse()
    diceRollDefense.sort().reverse()
    console.log("All Dice", diceRollDefense, diceRollAttack)


    //Resolve Troop losses
    console.log("Resolving Troop losses")
    for (var i = 0; i < diceRollAttack.length && i < diceRollDefense.length; i++){
      if (diceRollAttack[i] > diceRollDefense[i]){
        defenderTroops.textContent -= 1    
        console.log(">>>>Lost an Defender")    
      } else {
        attackerTroops.textContent -= 1
        console.log(">>>>Lost a Attacker")    
      }
    }

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
    if(x % 15 === 0){
      sign = sign * -1
    }
  }, 100)	

//   document.getElementById("1").style.background = 'linear-gradient(to left, white 2%, rgb(89, 208, 25) 110%) right'
}

console.log(window.innerWidth, '+', window.innerWidth)