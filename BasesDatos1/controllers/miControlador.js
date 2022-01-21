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
var session = require('express-session');

app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true
}))

module.exports = pool;
exports.pool = pool;

app.use(bodyParser.json());

/****************************************FUNCIONES*********************************** */
function indice(req, res) {
    res.render("index");
}

function validar(req, res) {
    pool.query('SELECT * FROM personas WHERE email = ? and password = ?', [req.body.email, req.body.password], (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = result;
        //req.session.usuarioLogeado = result;
        if (resultado.length > 0) {
            verRol(req.body.email, res, result);
        } else {
            console.log('Registro no encontrado');
            res.render('index', { datos: null, estado: false })
        }
    });
};


function verRol(email, res, datos) {

    pool.query('SELECT * FROM conjunto WHERE email = ?', email, (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = result;
        if (resultado.length > 0) {
            var rol = resultado[0].id_rol;

            if (rol == 1) {
                verUsuarios(datos, res);
            } else {
                res.render("usuario", { datos: datos, estado: true });

            }
        } else {
            console.log('Registro no encontrado');
            res.render('index', { datos: null, estado: false })
        }
    });

}


function verUsuarios(datos, res) {
    pool.query('SELECT * FROM personas', (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = result;
        if (resultado.length > 0) {
            res.render("admin", { datos: datos, usuarios: resultado, estado: true });
        } else {
            console.log('Registro no encontrado');
            res.render('index', { datos: null, estado: false });
        }
    });
}

function gestionUsuarios(req, res) {

    if (req.body.borrar != undefined) {
        /*pool.query('DELETE FROM personas WHERE email = ?', req.body.email, (error, result) => {
            if (error) throw error;
            if (resultado.length > 0) {
                res.render("admin", { estado: true });
            } else {
                console.log('Registro no encontrado');
                res.render('index', { datos: null, estado: false });
            }
        });*/

        res.render('admin');
    }
}


function otraGestion(req, res) {
    console.log(req.body);
    if (req.body.volver != undefined) {
        res.render('index');
    }

}



module.exports = {
    indice,
    validar,
    verRol,
    verUsuarios,
    gestionUsuarios,
    otraGestion
};