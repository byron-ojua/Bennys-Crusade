var compass = document.getElementById("compass")
var tooltip = document.getElementById("tooltip")
var growMap = document.getElementById("map-size-grow")
var shrinkMap = document.getElementById("map-size-shrink")
var map = document.getElementById("map-overlay")
var nextPhaseOverlay = document.getElementById("phase-bar")
var phaseButton = document.getElementById("next-phase")
var currentPhase = document.getElementById("current-phase")
var attackDoneButton = document.getElementById("done-attacking-backdrop")
var content = "attacker"
var attacker
var defender
var tooltipTimer
var mapScale = 85
var isMoving = false

var stageOfTheGameIndex = 0// keeps track of what stage of the game ie. 'claim contires', 'conquest' or end

var players = localStorage.getItem("playerNames")
var colors = localStorage.getItem("playerColors")
var playerArray = JSON.parse(players)
var colorsArray = JSON.parse(colors)
var startingTroops = 50 - (playerArray.length * 5)
var troopReserveArray = Array(playerArray.length).fill(startingTroops)
var playerIndex = 0;
var numTerritoriesUnclaimed = 42;
var allOwnerTerritoriesArray = []
//create array of countries owned for players
for (var i = 0; i < playerArray.length; i++){
  allOwnerTerritoriesArray.push([])
}
console.log("Territory Arrays", allOwnerTerritoriesArray)


console.log("Troop reserves", troopReserveArray)
//set troop reserve next to name
// for (var i = 0; i < playerArray.length; i++){
//   var player = document.getElementById(i)
//   player.textContent = player.dataset.name + ":"+ troopReserveArray[i]
// }

document.getElementById("done-attacking-button").addEventListener('click', function() { //moves the user onto their move phase
	currentPhase.textContent = "Conquer Phase: " + playerArray[playerIndex] + "'s Move turn"
	conquestTurnIndex = 2 //modifying when we call conquest turn index so we can just change it manually
	attackDoneButton.style.display = 'none'
})
document.getElementById("not-done-attacking-button").addEventListener('click', function() {
	attackDoneButton.style.display = 'none'
})



nextPhaseOverlay.addEventListener('click', function() {
  //Start of game claim country
  if (conquestTurnIndex == 0){
    attackDoneButton.style.display = 'none'
    currentPhase.textContent = "Conquer Phase: " + playerArray[playerIndex] + "'s Attack turn"
	  conquestTurnIndex = 1 //modifying when we call conquest turn index so we can just change it manually
  } else if(conquestTurnIndex == 1) {
	  attackDoneButton.style.display = "block"
  } else if (conquestTurnIndex == 2){
    var currentPlayer = document.getElementById(playerIndex.toString())
    currentPlayer.style.width = "150px"

    playerIndex = (playerIndex + 1) % playerArray.length
    currentPlayer = document.getElementById(playerIndex.toString())
    currentPlayer.style.width = "200px"
    
    currentPhase.textContent = "Conquer Phase: " + playerArray[playerIndex] + "'s Reinforce turn"
	  conquestTurnIndex = 0 //modifying when we call conquest turn index so we can just change it manually
	}
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
	  //claimCountries()
      claimCountrySelection()
    } else if (stageOfTheGameIndex == 3){
      reinforceClaimedCountries()
    }else if(stageOfTheGameIndex == 1) {//this is for attack?
      conquerCountrySelection(event)
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
function claimCountrySelection() {
 // claimCountries()
  if(numTerritoriesUnclaimed > 0) {
    var currentPlayer = document.getElementById(playerIndex.toString())
    currentPlayer.style.width = "200px"
    currentPlayer.style.opacity = "1"
    var territoryClicked = event.currentTarget
    var terr = document.getElementById(territoryClicked.id)
    if(terr.getAttribute("data-owner").length == 0) {
      var territoryTroops = document.getElementById(territoryClicked.id+"-troops")
      territoryTroops.textContent = 1
      terr.setAttribute("data-owner", playerArray[playerIndex])
      allOwnerTerritoriesArray[playerIndex].push(territoryClicked.id)
      console.log("Territory Arrays:", allOwnerTerritoriesArray)

      troopReserveArray[playerIndex] -= 1
      console.log("Troops Reserve:", troopReserveArray)
      var backgroundTroops = document.getElementById(territoryClicked.id + "-troops")
      backgroundTroops.setAttribute("fill", colorsArray[playerIndex])

      if(numTerritoriesUnclaimed == 1) {
        currentPlayer = document.getElementById(playerIndex.toString())
        currentPlayer.style.width = "150px"
        currentPlayer.style.opacity = ".78"
        isClaiming = false
        numTerritoriesUnclaimed--
        if (numTerritoriesUnclaimed == 0) {
          //Change game to reinforce mode
          currentPlayer.style.width = "150px"
          currentPlayer.style.opacity = "0.78"
          nextPlayer()
          var currentPlayer = document.getElementById(playerIndex.toString())
          currentPlayer.style.width = "200px"
          currentPlayer.style.opacity = "1"
          currentPhase.textContent = "Reinforce Claimed Countries"
          stageOfTheGameIndex = 3;
          // placeCountrySelection()
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
        if (numTerritoriesUnclaimed == 0) {//ends the claiming phase, could add a message here?
          stageOfTheGameIndex = 0;
		  
          console.log("end of claiming phase");
        }
      }
    } else {
      document.getElementById("territory-claimed-backdrop").style.display = 'block'
      var claimTerritoryClose = document.getElementById("territory-claimed-button")

      claimTerritoryClose.addEventListener('click', function () {
        document.getElementById("territory-claimed-backdrop").style.display = 'none'
      })
    }
  }

}//end of claim country handler


function reinforceClaimedCountries() {
  console.log("Reinforcing....")
  // claimCountries()
  //  if(troopReserveArray[playerArray.length] > 0) {
     var currentPlayer = document.getElementById(playerIndex.toString())
     currentPlayer.style.width = "200px"
     currentPlayer.style.opacity = "1"

     var territoryClicked = event.currentTarget
     var terr = document.getElementById(territoryClicked.id)

     if(terr.getAttribute("data-owner") == playerArray[playerIndex]) {
      console.log(">Adding Troops to", event.currentTarget.id)
      var territoryTroops = document.getElementById(territoryClicked.id+"-troops")

      //Increase amount of troops in territory by 1
      territoryTroops.textContent = parseInt(territoryTroops.textContent) +1
      troopReserveArray[playerIndex] -= 1
      currentPlayer.style.width = "150px"
      currentPlayer.style.opacity = "0.78"
      console.log(">--troop array", troopReserveArray)

      nextPlayer()           
      var currentPlayer = document.getElementById(playerIndex.toString())
      currentPlayer.style.width = "200px"
      currentPlayer.style.opacity = "1"

      //if this was the last reinforcement placed, move to next game stage
      if (playerIndex+1 == playerArray.length && troopReserveArray[playerIndex] == 1){
        //Switch to next stage of game
        phaseButton.style.display = "block"
        //stageOfTheGameIndex = 0;//ends the claiming phase, could add a message here?
        currentPlayer.style.width = "150px"
        currentPlayer.style.opacity = "0.78"
        nextPlayer()
        var currentPlayer = document.getElementById(playerIndex.toString())
        currentPlayer.style.width = "200px"
        currentPlayer.style.opacity = "1"

        currentPhase.textContent = "Conquer Phase: " + playerArray[playerIndex] + "'s Reinforce turn"
        currentPlayer.style.width = "200px"
        conquestTurnIndex = 0
        // conquerCountrySelection()
        stageOfTheGameIndex = 1;
        // placeCountrySelection()
        console.log("end of reinforcing phase")
      }
    } else {
      console.log(">Invalid Country:", terr.id)
      console.log(">--Owner:", terr.getAttribute('data-owner'))
    }
  //  } 
 }





function placeCountrySelection(event) {
  calculateReinforcements()
  clearTimeout(tooltipTimer)

  var territory = event.currentTarget
  var territoryTroops = document.getElementById(territory.id + "-troops").textContent
  var territoryOwner = territory.getAttribute("data-owner")

  //updateAttackBox(territoryOwner, territory, territoryTroops, "attacker")
  //updateAttackBox(playerArray[playerIndex], "Troop Reserve", 10, "attacker")

  console.log("Territory selected")
  console.log("--Territory(ID):", territory.id)
  console.log("--owner:", territoryOwner)
  console.log("--Troops:", territoryTroops)
  console.log("Active player:", playerArray[playerIndex])
  console.log("-- reserve count")

  if (playerArray[playerIndex] == territoryOwner) {
    if(troopReserveArray[playerIndex] > 0) {
      territoryTroops.textContent += 1;

    }
  }
  
}

function attackCountrySelection(event) {
  clearTimeout(tooltipTimer)
  hideDice()
  var attackButton = document.getElementById("attack-box")
  attackButton.style.display = 'block'
  var territory = event.currentTarget
  var territoryTroops = document.getElementById(territory.id + "-troops").textContent
  var territoryOwner = territory.getAttribute("data-owner")
 
  console.log("Territory selected")
  console.log("--Territory(ID):", territory.id)
  console.log("--owner:", territoryOwner)
  console.log("--Troops:", territoryTroops)
  console.log("Active player:", playerArray[playerIndex])

  if (playerArray[playerIndex] == territoryOwner) {
    attacker = territory
    clearAttackBox("defender")
    updateAttackBox(territoryOwner, territory, territoryTroops, "attacker")
    return
  }
  
  if (!attacker){return}//code breaks when null

  neighbors = attacker.dataset.neighbor
  console.log("--Neighbors:", neighbors)
  console.log("--Neighbors.length:", neighbors.length)
  if (neighbors.includes(territory.id)){
    defender = territory
    updateAttackBox(territoryOwner, territory, territoryTroops, "defender")
  } else {
    clearAttackBox("defender")
    clearAttackBox("attacker")
  }
  //set the correct info box to the right values.
  return
}// end attack selection

var territoryMovingFrom
var territoryMovingTo
function moveCountrySelection(event) {	
	if(conquestTurnIndex == 2) {
		var attackButton = document.getElementById("attack-box")
		attackButton.style.display = 'none'

		var territory = event.currentTarget
		var territoryTroops = document.getElementById(territory.id + "-troops").textContent
		var territoryOwner = territory.getAttribute("data-owner")
		clearAttackBox("defender")
		var ownerName = document.getElementById("attacker-owner")
		if((ownerName.textContent == ""  || ownerName == null) && territoryOwner == playerArray[playerIndex]) {
			territoryMovingFrom = territory
			updateAttackBox(territoryOwner, territory, territoryTroops, "attacker")
		} else if(territoryOwner == playerArray[playerIndex]) {
			//logic for moving goes here 
			territoryMovingTo = territory
			var territoryToMoveFromNeighbors = territoryMovingFrom.dataset.neighbor
			var character = territoryToMoveFromNeighbors[0]
			var i = 0;
			while(i < territoryToMoveFromNeighbors.length) {
				var newNeighbor = ""
				while(character != " " && i < territoryToMoveFromNeighbors.length) {
					newNeighbor += character
					i++
					character = territoryToMoveFromNeighbors[i]
				}
				i++
				character = territoryToMoveFromNeighbors[i]
				if(parseNeighbors(newNeighbor, territoryMovingTo.id)) { 
					territoryTroops = document.getElementById("attacker-troops").textContent
					var newTerritoryTroops = document.getElementById(territoryMovingTo.id + "-troops").textContent
					updateAttackBox(territoryOwner, territoryMovingTo, newTerritoryTroops, "defender")
					conquestTurnIndex = 0
					showConquerBox()
					var homeTroops = document.getElementById("home-region")
					var newTroops = document.getElementById("new-region")
					var countryName = document.getElementById("country-names")
					homeTroops.textContent = territoryTroops
					newTroops.textContent = newTerritoryTroops
					countryName.textContent = territoryMovingFrom.id + "   -->   " + territoryMovingTo.id

					isMoving = true
					break
				} else {
					console.log("NO PATH FOUND")
				}
			}
		}
	}
	
}

var alreadySearchedTerritories = []
function parseNeighbors(territoryToCheck, goalTerritory) {
	if(!alreadySearchedTerritories.includes(territoryToCheck)) {
		console.log("GOAL TERRITORY IS: ", goalTerritory)
		console.log("territoryToCheck TERRITORY IS: ", territoryToCheck)
		if(document.getElementById(territoryToCheck).dataset.owner != playerArray[playerIndex]) {
			return false
		} else if(territoryToCheck == goalTerritory) {
			return true
		} else {
			var neighbors = document.getElementById(territoryToCheck).dataset.neighbor
			var character = neighbors[0]
			var i = 0
			while(i < neighbors.length) {
				var newNeighbor = ""
				while(character != " " && i < neighbors.length) {
					newNeighbor += character
					i++
					character = neighbors[i]
				}
				i++
				character = neighbors[i]
				alreadySearchedTerritories.push(territoryToCheck)
				if(parseNeighbors(newNeighbor, goalTerritory)) {
					return true;
				}
				
			}
		}
	} else {
		return false
	}
	
	
	

	// return true; 
}



function conquerCountrySelection(event) {
  if (conquestTurnIndex == 0) {
    //place troops
    placeCountrySelection(event)
    console.log("Placeing troops")
  } else if (conquestTurnIndex == 1) {
    
    attackCountrySelection(event);
  } else if (conquestTurnIndex == 2) {
    moveCountrySelection(event)
  }  
}
//end of Conquor country Selection


//Attack button when two countries are selected
//Setting attack variables
var troops
var homeRegion
var newRegion
var attackButton = document.getElementById("attack-box")

attackButton.addEventListener('click', function(){//all the attack button code is here
  
  if (conquestTurnIndex == 0) {
    //code for placing troops
    console.log('attack box clicked')
    //placeButtonHandler()
  } else if (conquestTurnIndex == 1) {
    //code for attacking when button is pushed
    attackButtonHandler()
  } else if (conquestTurnIndex == 2) {
    //code for moving troop
  }

})//end of attack button listener

var newLimit = 0;

function placeButtonHandler() {
  console.log('current reserve num', troopReserveArray[playerIndex])
  console.log('current reserve num', troopReserveArray[playerIndex])
  var attackerTroops = troopReserveArray[playerIndex]

  homeRegion = document.getElementById("pool")
  newRegion = defender.id

  homeRegion.textContent = attackerTroops

  newRegion.textContent = document.getElementById(defender.id + "-troops").textContent

  newLimit = newRegion.textContent
  //var defenderTroops = document.getElementById("defender-troops").textContent


  if (attackerTroops > 1 ){
    console.log("place button")
    countryName.textContent = homeRegion + "   --->   " + newRegion  
    showConquerBox()
    //sendTroops()
  }
  
}

//is called by the attack button when in attack phase of a turn
function attackButtonHandler() {
  hideDice()
  console.log("Attack clicked")
  var attackerTroops = document.getElementById("attacker-troops").textContent
  var defenderTroops = document.getElementById("defender-troops").textContent
  var attackDice = document.getElementById("attack-dice")
  var defenseDice = document.getElementById("defense-dice")
  var defenderOwner = document.getElementById("defender-owner").textContent

  if (attackerTroops > 1 && defenderTroops > 0 && attackerTroops && defenderTroops){
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

  } else { 
    console.log("--Not enough troops")
  }

  if (defenderTroops === 0){
    troops = attackerTroops
    homeRegion = attacker.id
    newRegion = defender.id // I changed a lot of this

    console.log("Territory Array:", allOwnerTerritoriesArray)
    // removeNewRegion = allOwnerTerritoriesArray.indexOf(newRegion)
    for (var i = 0; i < allOwnerTerritoriesArray.length; i++){
      allOwnerTerritoriesArray[i].splice(newRegion, 1)
    }

    allOwnerTerritoriesArray[playerIndex].push(newRegion)

    console.log("New Territory Array:", allOwnerTerritoriesArray)
    sendTroops()
  }
  updateAttackBox(playerArray[playerIndex], attacker, attackerTroops, "attacker")
  updateAttackBox(defenderOwner, defender, defenderTroops, "defender")
}

//Setting send troops variables
var homeTroops = document.getElementById("home-region")
var newTroops = document.getElementById("new-region")
var countryName = document.getElementById("country-names")




function sendTroops() {


  console.log("Conquered New Territory!")
  console.log("--Total troops:", troops)
  console.log("--Home Region:", homeRegion)
  console.log("--New Region:", newRegion)

  hideDice()

  showConquerBox()

  console.log("homeTroops", homeTroops)
  homeTroops.textContent = troops-1

  newTroops.textContent = 1

  countryName.textContent = homeRegion + "   --->   " + newRegion  //sets the text on the conquor box
  var tempRegion = document.getElementById(newRegion)
  tempRegion.setAttribute("data-owner", playerArray[playerIndex])

  var tempTroops = document.getElementById(newRegion + "-troops")
  tempTroops.setAttribute("fill", colorsArray[playerIndex])


}//send troops end

//Conquer Menu Buttons
var homeButton = document.getElementById("home-button")
homeButton.addEventListener('click', addHomeTroops)
var newButton = document.getElementById("new-button")
newButton.addEventListener('click', addNewTroops)
var confirmConquer = document.getElementById("conquer-done")
confirmConquer.addEventListener('click', confirmAddTroops)

function addHomeTroops(){
  if (conquestTurnIndex == 0) {
    console.log("Adding troops to reserve")
    if (newTroops.textContent < newLimit){return}
      newTroops.textContent = parseInt(newTroops.textContent) - 1
      //homeTroops.textContent = parseInt(homeTroops.textContent) + 1
  } else if (conquestTurnIndex == 1) {
    console.log("Adding troops to home territory")
    if (newTroops.textContent <= 1){return}
      newTroops.textContent = parseInt(newTroops.textContent) - 1
      homeTroops.textContent = parseInt(homeTroops.textContent) + 1
  } else if (conquestTurnIndex == 2) {
    //move code
  }
}//end addHome Troops
function addNewTroops(){
  if (conquestTurnIndex == 0) {
    console.log("Placeing troops to new territory")
    if (homeTroops.textContent <= 1){return}
      newTroops.textContent = parseInt(newTroops.textContent) + 1
      homeTroops.textContent = parseInt(homeTroops.textContent) - 1
  } else if (conquestTurnIndex == 1){
    console.log("Adding troops to new territory")
    if (homeTroops.textContent <= 1){return}
      newTroops.textContent = parseInt(newTroops.textContent) + 1
      homeTroops.textContent = parseInt(homeTroops.textContent) - 1
  } else if (conquestTurnIndex == 2) {
    //move code
  }
}//end add new troops

function confirmAddTroops(){
  
  if (conquestTurnIndex == 0) {
    clearAttackBox("attacker")
    clearAttackBox("defender")
    hideConquerBox()
    //placing code
  } else if (conquestTurnIndex == 1) {
    //attacking code
    console.log("Confirming troops placement")
  } else if (conquestTurnIndex == 2) {
    //moveing code
  }
    if(isMoving) {
		document.getElementById(territoryMovingFrom.id + "-troops").textContent = homeTroops.textContent
		document.getElementById(territoryMovingTo.id + "-troops").textContent = newTroops.textContent
		content = "attacker"
		attacker = undefined
		defender = undefined
		clearAttackBox("attacker")
		clearAttackBox("defender")
		isMoving = false
		hideConquerBox()
	} else {  	
		document.getElementById(homeRegion + "-troops").textContent = homeTroops.textContent
		document.getElementById(newRegion + "-troops").textContent = newTroops.textContent

		content = "attacker"
		attacker = undefined
		defender = undefined
		clearAttackBox("attacker")
		clearAttackBox("defender")
		hideConquerBox()
	}
  
}
//end confirm add troops

function hideDice(){
  console.log("hiding dice")
  diceBox = document.getElementById("dice-box")
  allDice = diceBox.querySelectorAll(".dice")
  for (var i = 0; i < allDice.length; i++){
    allDice[i].style.display = "none"
  }
}
function showConquerBox() {
  console.log("showingConquerBox")
  document.getElementById("conquer-box").style.display = "flex"
  document.getElementById("conquer-backdrop").style.display = "block"
}
function hideConquerBox(){
  document.getElementById("conquer-box").style.display = "none"
  document.getElementById("conquer-backdrop").style.display = "none"
}
function updateAttackBox(territoryOwner, territory, territoryTroops, content) {
	var ownerRegion = document.getElementById(content+"-region")
  	var ownerTroops = document.getElementById(content+"-troops")
 	var ownerName = document.getElementById(content+"-owner")
  	ownerRegion.textContent = territory.dataset.name
  	ownerName.textContent = territoryOwner
  	ownerTroops.textContent = territoryTroops
}
//this clears the attack box
function clearAttackBox(attackerOrDefender) {
  document.getElementById(attackerOrDefender+"-region").textContent = ""
  document.getElementById(attackerOrDefender+"-owner").textContent = ""
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

//claim troops button
var startDeploy = document.getElementById("place_troop_button")
startDeploy.addEventListener('click', function () {   
  //this code hides the button
  document.getElementById("place-troops-backdrop").style.display = 'none'
//   document.getElementById("place-troops").style.display = 'none'
})


//is called when window is loaded
window.onload = function() {

  var numIDs = localStorage.getItem("numIDs")
  var numIDsArray = JSON.parse(numIDs) //only instance of this variable this is not called, might delete it
  var currentPlayer = document.getElementById(playerIndex.toString())
  currentPlayer.style.width = "200px"
  currentPlayer.style.opacity = "1"
  var deployButton = document.getElementById("place-troops-backdrop")
  deployButton.style.display = 'block'

  var attackButton = document.getElementById("attack-box")
  attackButton.style.display = 'none'
 

  //writes the player names to the side
  var colors = localStorage.getItem("playerColors")//this code gets the stuff for the player tabs
  var colorsArray = JSON.parse(colors)
  for (var i = 0; i < colorsArray.length; i++) {   //this code initalised the player tabs
    var id = i.toString()	
    var sidebar = document.getElementById(id)
    console.log(colorsArray[0]);
    sidebar.style.background = 'linear-gradient(to right, white 2%, ' + colorsArray[i] + ' 110%) left';//this will throw an error if the colors array is empty, so the place troops button wont work
  }//end of colorsArray loop

  
  attackDoneButton.style.display = "none"
  phaseButton.style.display = "none"

  
}

//log stuff
console.log(window.innerWidth, '+', window.innerWidth)
console.log("PLAYER ARRAY: ", playerArray)
//inits for player turn and player phase within a turn
var playerIndex = 0;

//move to the next player
function nextPlayer(){
  playerIndex = (playerIndex + 1) % playerArray.length;
  console.log("Current Player: ", playerIndex);
  clearAttackBox("defender")
  clearAttackBox("attacker")
}

var territoryArray = []
var conquestTurnIndex = -1;//keeps track of what phase the turns during the conquest part of the game
//move to the next phase in a players turn
function turnLoop() {
  conquestTurnIndex = (conquestTurnIndex + 1) % 3;//index's from 0 - 2 like a loop
  console.log(" -- Player Phase Index:", conquestTurnIndex);
  if (conquestTurnIndex == 0) {
    nextPlayer()
  } 
}

//Replaced the loops with global variable counters instead because I thought it made more sense this way
function calculateReinforcements() {
  //while you have remaining troops
  // ?? maybe use the 'attack move' code and have the attacking country be a pool of player troops
  
  //Calculate amount of troops you get
  var reserveCount = 0
  var australia = 0
  var europe = 0
  var asia = 0
  var northAmerica = 0
  var southAmerica = 0
  var africa = 0

  for (var i = 0; i < troopReserveArray[playerIndex].length; i++){
    if (document.getElementById(troopReserveArray[i]).classList == "australia"){
      australia++
      if (australia == 4){
        reserveCount +=2
        console.log("Australia Controlled By:", playerArray[playerIndex])
      }
    }
    if (document.getElementById(troopReserveArray[i]).classList == "asia"){
      asia++
      if (asia == 11){
        reserveCount +=7
        console.log("Asia Controlled By:", playerArray[playerIndex])
      }
    }
    if (document.getElementById(troopReserveArray[i]).classList == "north-america"){
      northAmerica++
      if (northAmerica == 9){
        reserveCount +=5
        console.log("North America Controlled By:", playerArray[playerIndex])
      }
    }
    if (document.getElementById(troopReserveArray[i]).classList == "south-america"){
      southAmerica++
      if (southAmerica == 4){
        reserveCount +=2
        console.log("South America Controlled By:", playerArray[playerIndex])
      }
    }
    if (document.getElementById(troopReserveArray[i]).classList == "Africa"){
      africa++
      if (africa == 6){
        reserveCount +=3
        console.log("Australia Controlled By:", playerArray[playerIndex])
      }
    }
    if (document.getElementById(troopReserveArray[i]).classList == "australia"){
      australia++
      if (australia == 4){
        reserveCount +=2
        console.log("Australia Controlled By:", playerArray[playerIndex])
      }
    }
    if (document.getElementById(troopReserveArray[i]).classList == "europe"){
      europe++
      if (europe == 7){
        reserveCount +=5
        console.log("Europe Controlled By:", playerArray[playerIndex])
      }
    }
  }
  reserveCount += Math.floor((asia+australia+northAmerica+southAmerica+africa+europe) % 3)
  //Continent Bonuses

  //Turning in territory card sets
  troopReserveArray[playerIndex] = reserveCount
  console.log("Reserve:", troopReserveArray)
  //Place all troops

}