var express = require('express');

var app = express(); //Con este objeto es con el que en realidad estamos trabajando.

app.get("/", function(req, res){
    res.send("Hola mundorls"); //No haría falta llamar a res.end(); Send ya envía y cierra la conexión.
})

app.listen(8090);

