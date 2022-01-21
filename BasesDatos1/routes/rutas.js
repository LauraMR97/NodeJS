var express = require('express');
var NotaController = require('../controllers/miControlador.js');
var api = express.Router();

//************************** Rutas ****************************

api.get('/', NotaController.indice);
api.post('/validar', NotaController.validar)


module.exports = api;