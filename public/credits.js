var home = document.getElementById("home-button")
var compass = document.getElementById("compass")


cannon.style.position = 'absolute';
hoverPos = home.getBoundingClientRect()
cannon.style.top = home.getBoundingClientRect().top - 20 + 'px';
cannon.style.left = home.getBoundingClientRect().left - 125 + 'px';

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


home.addEventListener("click", function () {
    window.location.replace("./index.html")
})