var compass = document.getElementById("compass")
var numValUnder = 2

compass.style.translate = 'rotate(90deg)'

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
}

var numPlayers = document.getElementById("player-nums")
numPlayers.onchange = function () {
	numValUnder = parseInt(numPlayers.value)
	var playerSignUps = document.getElementsByClassName("player-input")
	console.log("numValUnder is ", numValUnder)
	for(var i = 2; i < 6; i++) {
		playerSignUps[i].parentElement.children[0].style.display = 'none'
	}
	
	for(var i = 2; i < numValUnder; i++) {
		var num = playerSignUps[i].parentElement.children[0].getAttribute('name')
		var numInt = parseInt(num)-1
		
		if(numInt <= numValUnder) {
			playerSignUps[i].parentElement.children[0].style.display = 'block'
		}
	}
	
}

function beginGame(event) {
	var playerText = document.getElementsByClassName('player-text')
	var playerColor = document.getElementsByClassName('player-color')
	var textArray = []
	var colorArray = []
	var numIDArray = []
	for(var i = 0; i < numValUnder; i++) {
		var input = playerText[i].value
		if(input == "") {
			event.preventDefault()
			alert("All player names must be filled out")
			break
		}
		textArray.push(input)
		colorArray.push(playerColor[i].value)
		numIDArray.push(i.toString())
		if(i == numValUnder-1) {
			var requestURL = '/userSideBars/newUsers/addNewUsers'
			fetch(requestURL, {
				method: 'POST', 
				body: JSON.stringify({
					names: textArray, 
					numIds: numIDArray
				}), 
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function(res) {
				if(res.status == 200) {
					console.log("SUCCESS")
				} else {
					console.log("Error occurred adding users to game screen")
				}
			})
			localStorage.setItem("playerNames", JSON.stringify(textArray))
			localStorage.setItem("playerColors", JSON.stringify(colorArray))
			// localStorage.setItem("numIDs", JSON.stringify(numIDArray))
			window.location.replace("./game.html")
		}
	} 
	
	// localStorage.setItem("storage", )
	
}

var startGame = document.getElementById("play-game")
startGame.addEventListener('click', beginGame)
