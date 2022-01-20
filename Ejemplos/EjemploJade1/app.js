var express = require("express");

var app = express();

app.set("view engine", "jade"); //Tendremos que tener una carpeta en el proyecto llamada 'views' donde irán las vistas.
//Más información sobre jade: https://jade-lang.com/
//Jade es uno de los motores de vista más populares pero hay otros.

app.get("/", function(req, res) { //Definimos la ruta por defecto de la aplicación.
    //res.send("Hola mundo");
    res.render("index", { nombre: "Hola DAW2" }); //Como segundo parámetro irán los datos para la vista.
});

app.listen(8090);