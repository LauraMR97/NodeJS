// Cargamos el módulo de express para poder crear rutas
var express = require('express');

var bodyParser = require('body-parser');


// Cargamos el controlador para poder referenciar a los métodos del mismo.
var NotaController = require('../controllers/miControlador.js');
var Usuario = require("../models/usuario.js");

// Llamamos al router que permitirá definir rutas.
var api = express.Router();

// body-parser --> necesario para recuperar los datos de los formularios.
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

//************************** Rutas ****************************

api.get('/', NotaController.indice);

// Creamos una ruta de tipo GET para el método de pruebas
api.get('/indice', NotaController.indice);

//Rutas con parámetro.
api.get("/indice/:id", NotaController.conParametro);

//Un método POST para validar un formulario
api.post("/validar", NotaController.validar)


//*************************************************************

// Exportamos la configuración
module.exports = api;