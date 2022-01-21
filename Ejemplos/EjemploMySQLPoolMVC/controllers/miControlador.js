// 'use strict'
var express = require('express');
var bodyParser = require('body-parser');
// Cargamos el modelo para usarlo posteriormente
// var Nota = require('../models/nota');
var mysql = require('mysql');
var config = {
    host: 'localhost',
    user: 'fernando',
    password: 'Chubaca2018',
    database: 'ejemplo',
    port: 3306
};
var app = express();

/*
Para la eficiencia, vamos a crear un pool de MySQL, que nos permite utilizar múltiples conexiones 
a la vez en lugar de tener que manualmente abrir y cerrar conexiones múltiples.
*/
var pool = mysql.createPool(config);
// Export the pool
module.exports = pool;
exports.pool = pool;

// app.use(body_parser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 
// Creamos un método en el controlador, en este caso una accion de pruebas
function indice(req, res){
    // Devolvemos una respuesta en JSON
    res.render("index");
}

function validar(req, res) {
    pool.query('SELECT * FROM personas WHERE DNI = ?', req.body.dni, (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = result;
            if (resultado.length > 0) {
                console.log(resultado);
                res.render("mostrar", { datos: resultado, estado: true });
            } else {
                console.log('Registro no encontrado');
                res.render('mostrar', { datos: null, estado: false })
            }
        // res.render("mostrar", { dni: req.params.nombre });
    });
};

function conParametro(req, res) {
    pool.query('SELECT * FROM personas WHERE DNI = ?', req.params.dni, (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = result;
            if (resultado.length > 0) {
                console.log(resultado);
                res.render("mostrar", { datos: resultado, estado: true });
            } else {
                console.log('Registro no encontrado');
                res.render('mostrar', { datos: null, estado: false })
            }
        // res.render("mostrar", { dni: req.params.nombre });
    });
};
 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    indice, 
    validar,
    conParametro
};
