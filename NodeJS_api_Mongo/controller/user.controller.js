//const db = require("../models");
var express = require('express');
var bodyParser = require('body-parser');
var persona = require('../models/persona');
var conjunto = require('../models/conjunto');
var rol = require('../models/rol');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { response } = require('express');

////////////////////////////////////////FUNCIONES///////////////////////////////////

function userBoard(req, res) {
    res.status(200).send("User Content.");
}


function verUsuarios(req, res) {
    persona.find(
        function(err, personas) {
            console.log(personas);
            if (err) throw err;
            if (personas.length > 0) {
                res.status(200).send({
                    personas: personas,
                });
            } else {
                res.status(400).send({ message: "Registros no encontrados" });
            }
        }
    );
}




function crearUsuario(req, res) {
    if (req.body.password1 == req.body.password2) {
        persona.create({ nombre: req.body.nombre, email: req.body.email, password: req.body.password1 },
            function(err, result) {
                if (err) throw err;
                if (result) {
                    insertarRol(req.body.email, req.body.rol, res, req);
                } else {
                    res.status(400).send({ message: "Registro no insertado" });
                }
            }
        );
    } else {
        res.status(400).send({ message: "Constraseñas distintas" });
    }
}



function insertarRol(email, rol, res, req) {

    conjunto.create({ email: email, id_rol: rol },
        function(err, result) {
            if (err) throw err;
            if (result) {
                res.status(200).send({ message: "Registro insertado" });
            } else {
                res.status(400).send({ message: "fallo de roles" });
            }
        }
    );
}



function borrarUsuario(req, res) {
    persona.deleteOne({ email: req.body.email, },
        function(err, personas) {
            if (err) throw err;
            if (err) {
                res.status(400).send({ message: "Fallo al borrar usuario" });
            } else {
                res.status(200).send({ message: "Usuario borrado" });
            }
        }
    );
}

function verUsuario(req, res) {
    persona.find({
            email: req.body.email
        },
        function(err, personas) {
            console.log(personas);
            if (err) throw err;
            if (personas.length > 0) {
                conjunto.find({
                        email: req.body.email
                    },
                    function(err, resultado) {
                        console.log(resultado);
                        if (err) throw err;
                        if (resultado.length > 0) {
                            var rol = resultado[0].id_rol;
                            var persona = {
                                nombre: personas[0].nombre,
                                correo: personas[0].email,
                                password1: personas[0].password,
                                password2: personas[0].password,
                                rol: rol
                            }
                            res.status(200).send({
                                persona: persona
                            });
                        } else {
                            res.status(400).send({ message: "Fallo al encontrar el rol" });
                        }
                    }
                );
            } else {
                res.status(400).send({ message: "Fallo al encontrar el usuario" });
            }
        }
    );
}


function editarUsuario(req, res) {

    var valoresPersonaViejos = { email: req.body.personaAnt };
    var valoresPersonaNuevos = { $set: { nombre: req.body.nombre, email: req.body.email, password: req.body.password } };


    var valoresConjuntoNuevos = { $set: { id_rol: req.body.rol } };
    var emailAux = { email: req.body.email };


    persona.updateOne(
        valoresPersonaViejos, valoresPersonaNuevos,
        function(err, result) {
            if (err) throw err;
            if (err) {
                res.status(400).send({ message: "Fallo al editar  usuario" });
            } else {
                conjunto.updateOne(
                    emailAux, valoresConjuntoNuevos,
                    function(err, result) {
                        if (err) throw err;
                        if (err) {
                            res.status(400).send({ message: "Fallo al editar  rol" });
                        } else {
                            res.status(200).send({ message: "Usuario editado" });
                        }
                    }
                );
            }
        }
    );
}


module.exports = {
    verUsuarios,
    userBoard,
    crearUsuario,
    insertarRol,
    borrarUsuario,
    verUsuario,
    editarUsuario
};