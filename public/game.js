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

var stageOfTheGameIndex = 0// keeps track of what stage of the game ie. 'claim contires', 'conquest' or end

var players = localStorage.getItem("playerNames")
var colors = localStorage.getItem("playerColors")
var playerArray = JSON.parse(players)
var colorsArray = JSON.parse(colors)
var playerIndex = 0;
var numTerritoriesUnclaimed = 42;



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
var territoriesClaimed = []
document.querySelectorAll('.territory').forEach(item => {
  item.addEventListener('click', event => {//this determines what each of the countries do when clicked

    if(stageOfTheGameIndex == 0) {
	  claimCountries()
      claimCountrySelection()
    } else if (stageOfTheGameIndex == 1) {//this is for attack?
      conquerCountrySelection()
    } else {
      console.log('whoops');
    }
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

//country country code for claiming stage
function claimCountrySelection(){

  claimCountries()
  if(numTerritoriesUnclaimed > 0) {
    var currentPlayer = document.getElementById(playerIndex.toString())
    currentPlayer.style.width = "200px"
    currentPlayer.style.opacity = "1"
    var territoryClicked = event.currentTarget
    var terr = document.getElementById(territoryClicked.id)
    if(terr.getAttribute("data-owner").length == 0) {
      
      terr.setAttribute("data-owner", playerArray[playerIndex])
      var backgroundTroops = document.getElementById(territoryClicked.id + "-troops")
      backgroundTroops.setAttribute("fill", colorsArray[playerIndex])

      if(numTerritoriesUnclaimed == 1) {
        currentPlayer = document.getElementById(playerIndex.toString())
        currentPlayer.style.width = "150px"
        currentPlayer.style.opacity = ".78"
        isClaiming = false
        numTerritoriesUnclaimed--
        if (numTerritoriesUnclaimed == 0) {
          stageOfTheGameIndex = 1;//ends the claiming phase, could add a message here?
          console.log("end of claiming phase");
        }
      } else {
        numTerritoriesUnclaimed--
        currentPlayer.style.width = "150px"
        currentPlayer.style.opacity = "0.78"
        nextPlayer()
        var currentPlayer = document.getElementById(playerIndex.toString())
        currentPlayer.style.width = "200px"
        currentPlayer.style.opacity = "1"
        //console.log("Num of remaining terries yy", numTerritoriesUnclaimed);
        if (numTerritoriesUnclaimed == 0) {//ends the claiming phase, could add a message here?
          stageOfTheGameIndex = 1;
          console.log("end of claiming phase");
        }
      }
    } else {
      document.getElementById("territory-claimed-backdrop").style.display = 'block'
      document.getElementById("territory-claimed").style.display = 'block'
      var claimTerritoryClose = document.getElementById("territory-claimed-button")
      claimTerritoryClose.addEventListener('click', function () {
        document.getElementById("territory-claimed-backdrop").style.display = 'none'
        document.getElementById("territory-claimed").style.display = 'none'
      })
    }
  }

}//end of claim country handler

function conquerCountrySelection(){
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
}//end of Conquor country Selection


//Attack button when two countries are selected
//Setting attack variables
var troops
var homeRegion
var newRegion
var attackButton = document.getElementById("attack-box")
attackButton.addEventListener('click', function(){//all the attack button code is here
  
  if (conquestTurnIndex == 0) {
    //code for placing troops
  } else if (conquestTurnIndex == 1) {
    //code for attacking when button is pushed
    attackButtonHandler()
  } else if (conquestTurnIndex == 2) {
    //code for moving troop
  }

})//end of attack button listener


//is called by the attack button when in attack phase of a turn
function attackButtonHandler() {
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

  } else{ 
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
}


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

  countryName.textContent = homeRegion + "   -->   " + newRegion
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
function updateAttackBox(territory, territoryTroops, content) {
  var ownerRegion = document.getElementById(content+"-region")
  var ownerTroops = document.getElementById(content+"-troops")
ownerRegion.textContent = territory.dataset.name
// ownerRegion.textContent = territory.id
ownerTroops.textContent = territoryTroops
}
//this clears the attack box
function clearAttackBox(attackerOrDefender){
  document.getElementById(attackerOrDefender+"-region").textContent = ""
  document.getElementById(attackerOrDefender+"-troops").textContent = ""
}


//code for compass roatation
var sign = .25
var x = 0
setInterval(function () {
  x = x + sign
  compass.style.transform = 'rotate('+x+'deg)'
  if(x % 15 === 0){
    sign = sign * -1
  }
}, 100)

//called for claiming troops

var startDeploy = document.getElementById("place_troop_button")
startDeploy.addEventListener('click', function () {   
  //this code hides the button
  document.getElementById("place-troops-backdrop").style.display = 'none'
  document.getElementById("place-troops").style.display = 'none'
})

//is called when window is loaded
window.onload = function() {

  var numIDs = localStorage.getItem("numIDs")
  var numIDsArray = JSON.parse(numIDs) //only instance of this variable this is not called, might delete it
  var currentPlayer = document.getElementById(playerIndex.toString())
  currentPlayer.style.width = "200px"
  currentPlayer.style.opacity = "1"

  //writes the player names to the side
  var colors = localStorage.getItem("playerColors")//this code gets the stuff for the player tabs
  var colorsArray = JSON.parse(colors)
  for (var i = 0; i < colorsArray.length; i++) {   //this code initalised the player tabs
    var id = i.toString()
    var sidebar = document.getElementById(id)
    console.log(colorsArray[0]);
    sidebar.style.background = 'linear-gradient(to right, white 2%, ' + colorsArray[i] + ' 110%) left';//this will throw an error if the colors array is empty, so the place troops button wont work
  }//end of colorsArray loop
  
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


var territoryArray = []
var conquestTurnIndex = -1;//keeps track of what phase the turns during the conquest part of the game
//move to the next phase in a players turn
function turnLoop() {
  conquestTurnIndex = (conquestTurnIndex + 1) % 3;//index's from 0 - 2 like a loop
  console.log(" -- Player Phase Index:", conquestTurnIndex);
  if (conquestTurnIndex == 0) {
    // nextPlayer()
    //claimCountries()
  } else if (conquestTurnIndex == 1) {
    //initiates the attack phase of the turn
    
  } else if (conquestTurnIndex == 2) {
    //this moves troops at the end of your turn from one ajacent countrie to another
    //moveTroopsPhase()
  } 
}

//Replaced the loops with global variable counters instead because I thought it made more sense this way



function startGame() {
    //display some begginging message to the players
    //optional code for choosing player order could go here
    //turnLoop()
    claimCountries()
    //console.log('start game')
    
}
