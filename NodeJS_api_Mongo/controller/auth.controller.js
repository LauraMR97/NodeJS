//const db = require("../models");
var express = require('express');
var bodyParser = require('body-parser');
//Solo hay que poner la siguiente linea cuando se vaya a generar un token
const configuracion = require("../config/auth.config");
var persona = require('../models/persona');
var conjunto = require('../models/conjunto');
var rol = require('../models/rol');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { response } = require('express');


//////////////////////////////////////FUNCIONES////////////////////////////////////////////

function login(req, res) {
    persona.find({
            email: req.body.email,
            password: req.body.password
        },
        function(err, personas) {
            console.log(personas);
            if (err) throw err;
            if (personas.length > 0) {
                verRol(req, res, personas);
            } else {
                res.status(400).send({ message: "Usuario no encontrado" });
            }
        }
    );
}


function verRol(req, res, datos) {
    var passwordIsValid = false;
    conjunto.find({ email: req.body.email },
        function(err, resultado) {
            if (err) throw err;
            if (resultado.length > 0) {
                var rol = resultado[0].id_rol;
                //Si es administrador
                if (rol == 1) {
                    //Comprobamos que la contraseña que llega y la de la select es la misma
                    if (req.body.password == datos[0].password) {
                        passwordIsValid = true;
                    }

                    if (!passwordIsValid) {
                        return res.status(401).send({
                            accessToken: null,
                            message: "Invalid Password!"
                        });
                    }

                    //Generando un token
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
                    //Si es usuario generico
                    //Comprobamos que la contraseña que llega y la de la select es la misma
                    if (req.body.password == datos[0].password) {
                        passwordIsValid = true;
                    }

                    if (!passwordIsValid) {
                        return res.status(401).send({
                            accessToken: null,
                            message: "Invalid Password!"
                        });
                    }
                    //Generando un token
                    var token = jwt.sign({ email: req.body.email }, configuracion.secret, {
                        expiresIn: 86400 // 24 hours
                    });

                    //Respuesta para el cliente
                    res.status(200).send({
                        message: "Usuario",
                        nombre: datos[0].nombre,
                        email: req.body.email,
                        roles: resultado[0].id_rol,
                        accessToken: token
                    });
                }

            } else {
                res.status(400).send({ message: "Rol incorrecto" });
            }
        }
    );

}

module.exports = {
    login,
    verRol,
};