var playGame = document.getElementById("play-game")
var learnToPlay = document.getElementById("how-to-play")
// var highScores = document.getElementById("high-scores")
var cannon = document.getElementById("cannon")
var compass = document.getElementById("compass")

cannon.style.position = 'absolute';
hoverPos = playGame.getBoundingClientRect()
cannon.style.top = playGame.getBoundingClientRect().top - 20 + 'px';
cannon.style.left = playGame.getBoundingClientRect().left - 125 + 'px';

compass.style.translate = 'rotate(90deg)'

var sign = .25
var x = 0


document.querySelectorAll('.menu-button').forEach(item => {
    item.addEventListener('mouseover', event => {
      var hoverPos = event.currentTarget.getBoundingClientRect()
      cannon.style.top = hoverPos.top - 20 + 'px';
      cannon.style.left = hoverPos.left - 125 + 'px';
    })
})


window.onload = function() {
    setInterval(function () {
        x = x + sign
        compass.style.transform = 'rotate('+x+'deg)'
        if(x % 15 === 0){
            sign = sign * -1
        }
    }, 100)
}


playGame.addEventListener("click", function () {
    window.location.replace("./playerSignUp.html")
})


learnToPlay.addEventListener("click", function () {
    window.open("https://www.youtube.com/watch?v=5g48vXnnf30", "_blank");
})

// screen.addEventListener("orientationchange", () => {
//     console.log(`The orientation of the screen is: ${screen.orientation}`);
// })