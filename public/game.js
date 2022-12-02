var compass = document.getElementById("compass")
var tooltip = document.getElementById("tooltip")
var growMap = document.getElementById("map-size-grow")
var shrinkMap = document.getElementById("map-size-shrink")
var map = document.getElementById("map-overlay")
var nextPhaseButton = document.getElementById("phase-bar")
var content = "attacker"
var attacker
var defender
var tooltipTimer
var mapScale = 85


var players = localStorage.getItem("playerNames")
var playerArray = JSON.parse(players)


nextPhaseButton.addEventListener('click', function() {
  //nextPlayer()
  turnLoop();
})

growMap.addEventListener('click', function() {
  mapScale += 5
  map.style.scale = mapScale + "%"
})

shrinkMap.addEventListener('click', function() {
  mapScale -= 5
  map.style.scale = mapScale + "%"
})

//select territory
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
      if (playerArray[playerIndex] != territory.dataset.owner)
        if (neighbors.includes(territory.id)){
          defender = territory
          content = "defender"
        }
    }
    //set the correct info box to the right values.
    updateAttackBox(territory, territoryTroops, content)

    console.log("")
    if (content == "attacker"){
      attacker = territory
      clearAttackBox("defender")
    }
    content = "attacker"
    return
  })

  item.onmouseenter = function(e){
    tooltipTimer = setTimeout(function() {
      tooltip.style.top =  e.pageY + "px";
      tooltip.style.left =  e.pageX + "px";
      tooltip.style.display =  "block";

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


//Attack button when two countries are selected
//Setting attack variables
var troops
var homeRegion
var newRegion
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
      document.getElementById(defender.id + "-troops").textContent -= 1    
      defenderTroops = document.getElementById(defender.id + "-troops").textContent
      console.log(">>>>Lost an Defender")    
    } else {
      document.getElementById(attacker.id + "-troops").textContent -= 1
      attackerTroops = document.getElementById(attacker.id + "-troops").textContent
      console.log(">>>>Lost a Attacker")    
    }
  }

}else{ 
  console.log("--Not enough troops")
}
if (defenderTroops == 0){
  troops = attackerTroops
  homeRegion = attacker.id
  newRegion = defender.id
  sendTroops()
}
updateAttackBox(attacker, attackerTroops, "attacker")
updateAttackBox(defender, defenderTroops, "defender")
})

//Setting send troops variables
var homeTroops = document.getElementById("home-region")
var newTroops = document.getElementById("new-region")
var countryName = document.getElementById("country-names")
function sendTroops(){
console.log("Conquered New Territory!")
console.log("--Total troops:", troops)
console.log("--Home Region:", homeRegion)
console.log("--New Region:", newRegion)

hideDice()

showConquerBox()

console.log("homeTroops", homeTroops)
homeTroops.textContent = troops-1


newTroops.textContent = 1

countryName.textContent = homeRegion + "  >>>  " + newRegion
homeButton.removeEventListener()
}


//Conquer Menu Buttons
var homeButton = document.getElementById("home-button")
homeButton.addEventListener('click', addHomeTroops)
var newButton = document.getElementById("new-button")
newButton.addEventListener('click', addNewTroops)
var confirmConquer = document.getElementById("conquer-done")
confirmConquer.addEventListener('click', confirmAddTroops)

function addHomeTroops(){
console.log("Adding troops to home territory")
if (newTroops.textContent <= 1){return}
newTroops.textContent = parseInt(newTroops.textContent) - 1
homeTroops.textContent = parseInt(homeTroops.textContent) + 1
}
function addNewTroops(){
console.log("Adding troops to new territory")
if (homeTroops.textContent <= 1){return}
newTroops.textContent = parseInt(newTroops.textContent) + 1
homeTroops.textContent = parseInt(homeTroops.textContent) - 1
}
function confirmAddTroops(){
console.log("Confirming troops placement")


document.getElementById(homeRegion + "-troops").textContent = homeTroops.textContent
document.getElementById(newRegion + "-troops").textContent = newTroops.textContent
content = "attacker"
attacker = undefined
defender = undefined
clearAttackBox("attacker")
clearAttackBox("defender")

hideConquerBox()
}
function hideDice(){
console.log("hiding dice")
diceBox = document.getElementById("dice-box")
allDice = diceBox.querySelectorAll(".dice")
for (var i = 0; i < allDice.length; i++){
  allDice[i].style.display = "none"
}
}
function showConquerBox(){
console.log("showingConquerBox")
document.getElementById("conquer-box").style.display = "flex"
document.getElementById("conquer-backdrop").style.display = "block"
}
function hideConquerBox(){
document.getElementById("conquer-box").style.display = "none"
document.getElementById("conquer-backdrop").style.display = "none"
}
function updateAttackBox(territory, territoryTroops, content){
var ownerRegion = document.getElementById(content+"-region")
var ownerTroops = document.getElementById(content+"-troops")
ownerRegion.textContent = territory.dataset.name
// ownerRegion.textContent = territory.id
ownerTroops.textContent = territoryTroops
}
function clearAttackBox(attackerOrDefender){
document.getElementById(attackerOrDefender+"-region").textContent = ""
document.getElementById(attackerOrDefender+"-troops").textContent = ""
}

//hide and show attack functions
function showAttackBox(){
  console.log(" -- Showing attack button")
  attackButton.style.display = 'block'
}
function hideAttackBox(){
  console.log(" -- Hiding attack button")
  attackButton.style.display = 'none'
}

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
  
  var colors = localStorage.getItem("playerColors")
  var colorsArray = JSON.parse(colors)
  for(var i = 0; i < colorsArray.length; i++) {
	  var id = i.toString()
	  var sidebar = document.getElementById(id)
	  sidebar.style.background = 'linear-gradient(to right, white 2%, ' + colorsArray[i] + ' 110%) left';
  }
  startGame()
}

//log stuff
console.log(window.innerWidth, '+', window.innerWidth)
console.log("PLAYER ARRAY: ", playerArray)
//inits for player turn and player phase within a turn
var playerIndex = 0;

//move to the next player
function nextPlayer(){
  playerIndex = (playerIndex + 1) % playerArray.length;
  console.log("Next player: ", playerIndex);
}

var sectionOfTheGameIndex = 1// keeps track of what section of the game ie. 'claim contires', 'conquest' or end
//this is called when the next phase button is pushed
function nextPhaseHandler(){
  if (sectionOfTheGameIndex == 0) {
    //code for claim countires here
  } else if (sectionOfTheGameIndex == 1) {
    turnLoop()
  } else {
    //code for end of game here
  }
}

var territoryArray = []
//place troops 
function placeTroopsPhase() {
  //while you have remaining troops
  // ?? maybe use the 'attack move' code and have the attacking country be a pool of player troops

  //Calculate amount of troops you get
  var reserveCount = 0
  var territoriesControlled = 0
  for (var i = 0; i < territoryArray.length; i++){
    var territory = document.getElementById(territoryArray[i])
    if (playerArray[playerIndex] == territory.owner){
      territoriesControlled += 1
    }
  }
  reserveCount = Math.floor(territoriesControlled % 3)
  //Continent Bonuses

  //Turning in territory card sets

  //Place all troops

}


//attackPhase
function attackPhase() {
  showAttackBox()
  //when the next phase button is clicked
  //re hide the attack button
}

//moves troops 
function moveTroopsPhase() {
  //use the 'attack move code' to click and move troops once when they are ajacent
}

//claim the counties at the beginning of the game
function claimCountries() {
  //make it so when each player is claiming, their side bar slides out a bit 
  //they claim one country at a time, then the next person chooses 
  
  //for number of countries
  //use the 'attack countrie' code to move a sigle troop to an unclamed countire
}

var conquestTurnIndex = 0;//keeps track of what phase the turns during the conquest part of the game
//move to the next phase in a players turn
function turnLoop() {
  conquestTurnIndex = (conquestTurnIndex + 1) % 3;//index's from 0 - 2 like a loop
  console.log(" -- Player Phase Index:", conquestTurnIndex);
  if (conquestTurnIndex == 0) {
    nextPlayer()
    //places troops needs to be defined
    //placeTroopsPhase()
  } else if (conquestTurnIndex == 1) {
    //initiates the attack phase of the turn
    showAttackBox();
  } else if (conquestTurnIndex == 2) {
    hideAttackBox();//hides the attack box
    //this moves troops at the end of your turn from one ajacent countrie to another
    //moveTroopsPhase()
  } 
}

//Replaced the loops with global variable counters instead because I thought it made more sense this way

function startGame() {
    //display some begginging message to the players
    //optional code for choosing player order could go here
    
    
}
startGame()
