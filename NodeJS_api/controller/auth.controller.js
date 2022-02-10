//const db = require("../models");
var express = require('express');
var bodyParser = require('body-parser');
//const config = require("../config/db.config");

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

function login(req, res) {
    pool.query('SELECT * FROM personas WHERE email = ? and password = ?', [req.body.email, req.body.password], (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = req.body.email;
        req.session.usuarioLogeado = result;
        if (resultado.length > 0) {

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                req.body.email
            );
            console.log(passwordIsValid);
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            verRol(req.body.email, res, result, token);
        } else {
            res.send({ message: "Usuario no encontrado" });
        }
    });
};


function verRol(email, res, datos, token) {

    pool.query('SELECT * FROM conjunto WHERE email = ?', email, (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = result;
        if (resultado.length > 0) {
            var rol = resultado[0].id_rol;

            if (rol == 1) {
                verUsuarios(datos, res, token);
            } else {
                res.send({ message: "Usuario encontrado", datos: datos, token: token });
            }
        } else {
            res.send({ message: "Rol incorrecto" });
        }
    });

}


module.exports = {
    login,
    verRol,
};