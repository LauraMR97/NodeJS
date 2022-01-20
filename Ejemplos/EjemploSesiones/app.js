/*
Para manejar sesiones:
Cookie Parser es un módulo que podemos instalar vía npm y que nos permite configurar cookies 
dentro de nuestro servidor. Ahora tenemos que instalarlo.
npm install cookie-parser --save
Ahora ya podemos configurar las sesiones, para las sesiones debemos utilizar un módulo llamado express-session.
npm install express-session --save

*/
var express = require("express");
var body_parser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = express.Router();
var app = express();

app.set("view engine", "jade");

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
//Esto utiliza el middleware de body-parser.
app.use(cookieParser());


// server.js
var session = require('express-session');

app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true
}))


//-------------- Ejemplo A ----------------------
app.get("/", function(req, res) {
    res.render("index");
});

// Para recuperar el valor de los parámetros enviados por POST utilizaremos el middleware body-parser.
app.post("/validar", function(req, res) {
    console.log(req.body);
    req.session.nombre = req.body.caja;
    console.log(req.session);
    res.render("mostrar", { nombre: req.session.nombre });
});

//Ejemplo de uso de la ruta siguiente: http://localhost:8090/datos/DAW2
app.get("/otro", function(req, res) {
    if (req.session.nombre) {
        res.render("otra", { nombre: req.session.nombre });
    }
});



//Otra opción es usar router:
// router.get('/', (req, res) => {
//     res.render("index");
// });

// router.post("/validar", (req, res) => {
//     console.log(req.body);
//     res.render("mostrar", { nombre: req.body.caja });
// });

app.listen(8090);

//Para recuperar datos de un formulario: npm install body-parser