/*
 * name: Byron Ojua-Nice
 * email: niceb@oregonstate.edu
 */

var http = require("http")
var fs = require("fs")
var path = require("path")
var express = require('express');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon')
var port = 3000


var app = express();


app.use(express.json())

app.engine('handlebars', exphbs.engine({
	defaultLayout: null
}));
app.set('view engine', 'handlebars');

var userNames = []
var userIDs = []



function userData(newName, newId) {
	this.name = newName; 
	this.idNum = newId; 
}

app.post('/userSideBars/:userSideBarArray/addNewUsers', function(req, res) {
	if (req.body && req.body.names && req.body.numIds) {
		userNames = req.body.names
		userIDs = req.body.numIds
		res.status(200).send("Data received")
	} else {
		res.status(404).send("Error receiving data")
	}

})

app.get('/game.html', function(req, res, next) {
  	var personArray = []
	for(var i = 0; i < userNames.length; i++) {
		const newPerson = new userData(userNames[i], userIDs[i])
		personArray.push(newPerson)
	}
	res.status(200).render('game', {
		sidebars: personArray
	})
})

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(favicon('favicon.ico'));



app.get('*', function (req, res) {
	res.status(404).render('404', ({}))
  });
  

app.listen(port, function () {
    console.log("== Server is listening on port:", port)
})