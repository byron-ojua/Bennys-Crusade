var playGame = document.getElementById("play-game")

if (playGame){
    playGame.addEventListener("click", function () {
        window.location.replace("/game.html")
    })
}