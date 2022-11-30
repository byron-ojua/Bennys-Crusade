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
var mapData = require("./mapData.json")

app.engine('handlebars', exphbs.engine({}))
app.set('view engine', 'handlebars')

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


app.get('/game/data', function (req, res, next) {
  res.status(200).send(mapData)
})

app.get('*', function (req, res) {
	res.status(404).render('404', ({}))
  });
  

app.listen(port, function () {
    console.log("== Server is listening on port:", port)
})