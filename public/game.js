document.querySelectorAll('.territory').forEach(item => {
    item.addEventListener('click', event => {
      var territory = event.currentTarget
      var territoryTroops = document.getElementById(territory.id + "-troops").textContent
      console.log("Territory selected")
      console.log("--Name(ID):", territory.id)
      console.log("--Troops:", territoryTroops)
    })
  })