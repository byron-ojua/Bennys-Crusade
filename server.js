/*
 * name: Byron Ojua-Nice
 * email: niceb@oregonstate.edu
 */

var http = require("http")
var fs = require("fs")
var path = require("path")
var express = require('express');
var exphbs = require('express-handlebars');
var port = 3000


var app = express();

app.use(express.static('public'));

app.get('*', function (req, res) {
	res.status(404).render('404', ({}))
  });
  

app.listen(port, function () {
    console.log("== Server is listening on port:", port)
})