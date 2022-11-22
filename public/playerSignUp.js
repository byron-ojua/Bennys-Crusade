var compass = document.getElementById("compass")


compass.style.translate = 'rotate(90deg)'

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

var numPlayers = document.getElementById("player-nums")
numPlayers.onchange = function () {
	console.log("THIS IS THE VALUE, ", numPlayers.value)
}
