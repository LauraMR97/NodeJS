//const db = require("../models");
var express = require('express');
var bodyParser = require('body-parser');
const configuracion = require("../config/auth.config");

var config = {
    host: 'localhost',
    user: 'LauraM',
    password: 'Chubaca2021',
    database: 'nodejs_bbdd',
    port: 3306
};

var app = express();
var mysql = require('mysql');
var pool = mysql.createPool(config);

// Export the pool
module.exports = pool;
exports.pool = pool;
app.use(bodyParser.json());

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { response } = require('express');


//////////////////////////////////////FUNCIONES////////////////////////////////////////////

////////////////////////////////////////LOGIN///////////////////////////////////////////
function login(req, res) {
    pool.query('SELECT * FROM personas WHERE email = ? and password = ?', [req.body.email, req.body.password], (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = req.body.email;
        req.session.usuarioLogeado = result;
        if (resultado.length > 0) {
            verRol(req, res, result);
        } else {
            res.status(400).send({ message: "Usuario no encontrado" });
        }
    });
};


function verRol(req, res, datos) {
    var passwordIsValid = false;

    pool.query('SELECT * FROM conjunto WHERE email = ?', req.body.email, (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = result;
        if (resultado.length > 0) {
            var rol = resultado[0].id_rol;

            if (rol == 1) {

                if (req.body.password == datos[0].password) {
                    passwordIsValid = true;
                }

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }

                var token = jwt.sign({ email: req.body.email }, configuracion.secret, {
                    expiresIn: 86400 // 24 hours
                });

                //Respuesta para el cliente
                res.status(200).send({
                    message: "Usuario Administrador",
                    nombre: datos[0].nombre,
                    email: req.body.email,
                    roles: resultado[0].id_rol,
                    accessToken: token
                });

            } else {
                res.status(200).send({
                    message: "Usuario",
                    nombre: datos[0].nombre,
                    email: req.body.email,
                    roles: resultado[0].id_rol,
                });
            }
        } else {
            res.status(400).send({ message: "Rol incorrecto" });
        }
    });
}



module.exports = {
    login,
    verRol,
};