// 'use strict'
 
// Cargamos el modelo para usarlo posteriormente
// var Nota = require('../models/nota');
 
// Creamos un método en el controlador, en este caso una accion de pruebas
function indice(req, res){
    // Devolvemos una respuesta en JSON
    res.render("index");
}

function validar(req, res) {
    console.log(req.body);
    res.render("mostrar", { nombre: req.body.nombre });
};

function conParametro(req, res) {
    console.log(req.params);
    res.render("mostrar", { nombre: req.params.nombre });
};
 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    indice, 
    validar,
    conParametro
};
