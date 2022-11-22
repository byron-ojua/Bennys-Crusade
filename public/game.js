var compass = document.getElementById("compass")


document.querySelectorAll('.territory').forEach(item => {
    item.addEventListener('click', event => {
      var territory = event.currentTarget
      var territoryTroops = document.getElementById(territory.id + "-troops").textContent
      console.log("Territory selected")
      console.log("--Name(ID):", territory.id)
      console.log("--Troops:", territoryTroops)
    })
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
