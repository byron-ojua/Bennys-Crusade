/*
 * name: Byron Ojua-Nice
 * email: niceb@oregonstate.edu
 */

var http = require("http")
var fs = require("fs")
var path = require("path")
var port = 3000

var indexHTML = ""
var indexJS = ""
var gameHTML = ""
var gameJS = ""
var styleCSS = ""
var page404 = ""
var compassPNG = ""
var gameCSS = ""


//Read index.html
{
    console.log("Reading index.html")
    fs.readFile("./public/index.html", "utf8", function (err, data){

        if (!err){
            indexHTML = data
            console.log("No error, saving index.html")
            // console.log(indexHTML)
        } else {
            console.log("There was an error reading index.html")
        }
    })
}

//Read index.js
{
    console.log("Reading index.js")
    fs.readFile("./public/index.js", "utf8", function (err, data){
        if (!err){
            indexJS = data
            console.log("No error, saving index.js")
            // console.log(indexJS)
        } else {
            console.log("There was an error reading index.js")
        }
    })
}

//Read game.html
{
    console.log("Reading game.html")
    fs.readFile("./public/game.html", "utf8", function (err, data){

        if (!err){
            gameHTML = data
            console.log("No error, saving game.html")
            // console.log(indexHTML)
        } else {
            console.log("There was an error reading game.html")
        }
    })
}

//Read game.js
{
    console.log("Reading game.js")
    fs.readFile("./public/game.js", "utf8", function (err, data){
        if (!err){
            gameJS = data
            console.log("No error, saving game.js")
            // console.log(gameJS)
        } else {
            console.log("There was an error reading game.js")
        }
    })
}

//Read style.css
{
    console.log("Reading style.css")
    fs.readFile("./public/style.css", "utf8", function (err, data){
        if (!err){
            styleCSS = data
            console.log("No error, saving style.css")
        } else {
            console.log("There was an error reading style.css")
        }
    })
}

//Read game.css
{
    console.log("Reading game.css")
    fs.readFile("./public/game.css", "utf8", function (err, data){
        if (!err){
            styleCSS = data
            console.log("No error, saving game.css")
        } else {
            console.log("There was an error reading game.css")
        }
    })
}

//Read 404.html
{
    console.log("Reading 404.html")
    fs.readFile("./public/404.html", "utf8", function (err, data){
        if (!err){
            page404 = data
            console.log("No error, saving 404.index")
        } else {
            console.log("There was an error reading 404.html")
        }
    })
}

//Read compass.png
{
    console.log("Reading compass.png")
    fs.readFile("./public/compass.png", function (err, data){
        if (!err){
            compassPNG = data
            console.log("No error, saving compass.png")
        } else {
            console.log("There was an error reading compass.png")
        }
    })
}

if(process.env.PORT){
    console.log("Reading from port")
    port = process.env.PORT
}

var server = http.createServer(function (req, res) {
    if(req.url === '/'){
        console.log("Redirect to index.html")
        console.log("Pushing index.html content")

        res.statusCode = 200
        res.setHeader("Content-Type", "text/html")
        res.write(indexHTML)

    } else if (req.url === '/index.html'){
        console.log("Pushing index.html content")

        res.statusCode = 200
        res.setHeader("Content-Type", "text/html")
        res.write(indexHTML)

    } else if(req.url === '/index.js'){
        console.log("Pushing index.js content")

        res.statusCode = 200
        res.setHeader("Content-Type", "application/javascript")
        res.write(indexJS)

    } else if (req.url === '/game.html'){
        console.log("Pushing game.html content")

        res.statusCode = 200
        res.setHeader("Content-Type", "text/html")
        res.write(gameHTML)

    } else if(req.url === '/game.js'){
        console.log("Pushing game.js content")

        res.statusCode = 200
        res.setHeader("Content-Type", "application/javascript")
        res.write(gameJS)

    } else if(req.url === '/style.css'){
        console.log("Pushing style.css content")

        res.statusCode = 200
        res.setHeader("Content-Type", "text/css")
        res.write(styleCSS)

    } else if(req.url === '/404.html'){
        console.log("Pushing 404.html content")

        res.statusCode = 404
        res.setHeader("Content-Type", "text/html")
        res.write(page404)


    } else if (req.url === '/favicon.ico'){
    } else if(req.url === '/compass.png'){
        console.log("Pushing compass.png content")

        res.statusCode = 200
        res.setHeader("Content-Type", "image/jpeg")
        res.write(compassPNG)
    } else{
        console.log("Redirecting to 404.html")

        res.statusCode = 404
        res.setHeader("Content-Type", "text/html")
        res.write(page404)
    }
    res.end()
})

server.listen(port, function () {
    console.log("== Server is listening on port:", port)
})