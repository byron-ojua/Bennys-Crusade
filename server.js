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

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(favicon('favicon.ico'));


app.get('*', function (req, res) {
	res.status(404).render('404', ({}))
  });
  

app.listen(port, function () {
    console.log("== Server is listening on port:", port)
})