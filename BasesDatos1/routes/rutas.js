var express = require('express');
var NotaController = require('../controllers/miControlador.js');
var api = express.Router();

//************************** Rutas ****************************

api.get('/', NotaController.indice);
api.post('/gestionar', NotaController.gestionUsuarios);
api.post('/otro', NotaController.otraGestion);
api.post('/validar', NotaController.validar);
api.post('/volver', NotaController.indice);
module.exports = api;