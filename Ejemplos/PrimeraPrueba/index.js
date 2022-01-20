var express = require("express");
var body_parser = require('body-parser');
var router = express.Router();
var app = express();

app.set("view engine", "jade");

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
//Esto utiliza el middleware de body-parser.

//-------------- Ejemplo A ----------------------
app.get("/", function(req, res) {
    res.render("index");
});

// Para recuperar el valor de los parámetros enviados por POST utilizaremos el middleware body-parser.
app.post("/validar", function(req, res) {
    console.log(req.body);
    var num = parseInt(req.body.caja);
    num = num + 2;
    res.render("mostrar", { nombre: num });
});

//Ejemplo de uso de la ruta siguiente: http://localhost:8090/datos/DAW2
app.get("/datos/:nombre", function(req, res) {
    res.render("index", { nombre: req.params.nombre });
});



//------------- Recuperar varias cajas ------------------
app.get("/tabla", function(req, res) {
    res.render("tabla");
});

app.post("/validarTabla", function(req, res) {
    console.log(req.body);
    res.render("mostrarTabla", { lista: req.body.caja });
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