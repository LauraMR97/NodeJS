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

////////////////////////////////////////FUNCIONES///////////////////////////////////

function userBoard(req, res) {
    res.status(200).send("User Content.");
}

function verUsuarios(req, res) {
    pool.query('SELECT * FROM personas', (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = result;
        if (resultado.length > 0) {
            res.status(200).send({
                personas: resultado,
            });
        } else {
            res.status(400).send({ message: "Registros no encontrados" });
        }
    });
}

function crearUsuario(req, res) {
    if (req.body.password == req.body.password2) {
        pool.query('INSERT INTO personas (nombre,email,password) VALUES (?,?,?)', [req.body.nombre, req.body.email, req.body.password], (error, result) => {
            if (error) throw error;
            if (result) {
                insertarRol(req.body.email, req.body.rol, res, req);
            } else {
                res.status(400).send({ message: "Registro no insertado" });
            }
        });

        res.status(400).send({ message: "Constraseñas distintas" });
    }

}

function insertarRol(email, rol, res, req) {
    pool.query('INSERT INTO conjunto (email,id_rol) VALUES (?,?)', [email, rol], (error, result) => {
        if (error) throw error;
        if (result) {
            res.status(200).send({ message: "Registro insertado" });
        } else {
            console.log('Registro no insertado');
            res.status(400).send({ message: "fallo de roles" });
        }
    });
}


function borrarUsuario(req, res) {
    pool.query('DELETE FROM personas WHERE email = ?', req.body.email, (error, result) => {
        if (error) throw error;
        if (result) {
            res.status(200).send({ message: "Usuario borrado" });
        } else {
            res.status(400).send({ message: "Fallo al borrar usuario" });
        }
    });
}


function verUsuario(req, res) {
    pool.query('SELECT * FROM personas WHERE email = ?', req.body.email, (error, result) => {
        if (error) throw error;
        var resultado = result;
        if (resultado.length > 0) {
            pool.query('SELECT id_rol FROM conjunto WHERE email = ?', req.body.email, (error, result) => {
                if (error) throw error;
                var resultado2 = result;
                if (resultado2.length > 0) {
                    var rol = resultado2[0].id_rol;
                    res.status(200).send({
                        persona: resultado,
                        rol: rol
                    });
                } else {
                    res.status(400).send({ message: "Fallo al encontrar el rol" });
                }
            });
        } else {
            res.status(400).send({ message: "Fallo al encontrar el usuario" });
        }
    });
}


//REVISAR//
function editarUsuario(req, res) {
    pool.query('UPDATE personas SET nombre = ?, email = ? WHERE email = ?', [req.body.nombre, req.body.email, personaAnt.email], (error, result) => {
        if (error) throw error;
        if (result) {
            pool.query('UPDATE conjunto SET id_rol = ? WHERE email = ?', [req.body.rol, req.body.email], (error, result) => {
                if (error) throw error;
                if (result) {
                    verUsuarios(datos, res);
                } else {
                    res.status(400).send({ message: "Fallo al editar  rol" });
                }
            });
        } else {
            res.status(400).send({ message: "Fallo al editar  usuario" });
        }
    });
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