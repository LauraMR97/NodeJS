var express = require('express');
var bodyParser = require('body-parser');


var app = express();

var session = require('express-session');

app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true
}));

// Importamos las rutas
var nota_routes = require('./routes/rutas.js');

// body-parser --> necesario para recuperar los datos de los formularios.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Establecemos el motor de plantillas.
app.set("view engine", "pug");

// Cargamos las rutas, el primer argumento indica un prefijo para la URL.
// app.use('/api', nota_routes);
app.use("/", nota_routes);

module.exports = app; //Exportamos los métodos de esta clase.


console.log("Servidor arrancado en http://localhost:8090");

app.listen(8090);