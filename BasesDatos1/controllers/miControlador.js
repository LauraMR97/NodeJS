var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var config = {
    host: 'localhost',
    user: 'LauraM',
    password: 'Chubaca2021',
    database: 'nodejs_bbdd',
    port: 3306
};
var app = express();
var pool = mysql.createPool(config);

module.exports = pool;
exports.pool = pool;

app.use(bodyParser.json());

/****************************************FUNCIONES*********************************** */
function indice(req, res) {
    res.render("index");
}

function validar(req, res) {
    console.log(req.body.email);
    console.log(req.body.password);
    pool.query('SELECT * FROM personas WHERE email = ?', req.body.email, (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = result;
        if (resultado.length > 0) {
            console.log(resultado);
            res.render("index", { datos: resultado, estado: true });
        } else {
            console.log('Registro no encontrado');
            res.render('index', { datos: null, estado: false })
        }
    });
};




module.exports = {
    indice,
    validar,
};