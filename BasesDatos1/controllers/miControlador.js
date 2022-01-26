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
    pool.query('SELECT * FROM personas WHERE email = ? and password = ?', [req.body.email, req.body.password], (error, result) => {
        if (error) throw error;
        //res.status(200).send(result);
        var resultado = req.body.email;
        req.session.usuarioLogeado = result;
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
            console.log('Registros no encontrados');
            res.render('index', { datos: null, estado: false });
        }
    });
}

function gestionUsuarios(req, res) {
    var datos = req.session.usuarioLogeado;
    if (req.body.borrar != undefined) {
        pool.query('DELETE FROM personas WHERE email = ?', req.body.email, (error, result) => {
            if (error) throw error;
            if (result) {
                verUsuarios(datos, res);
            } else {
                console.log('Registro no encontrado');
                res.render('index', { datos: null, estado: false });
            }
        });
    }

    if (req.body.editar != undefined) {
        req.session.PersonaAnt = req.body;
        pool.query('SELECT * FROM personas WHERE email = ?', req.body.email, (error, result) => {
            if (error) throw error;
            var resultado = result;
            if (resultado.length > 0) {
                pool.query('SELECT id_rol FROM conjunto WHERE email = ?', req.body.email, (error, result) => {
                    if (error) throw error;
                    var resultado2 = result;
                    if (resultado2.length > 0) {
                        var rol = resultado2[0].id_rol;
                        res.render('editar', { datos: resultado, rol: rol });
                    } else {
                        console.log('Registro no encontrado');
                        res.render('index', { datos: null, estado: false })
                    }
                });
            } else {
                console.log('Registro no encontrado');
                res.render('index', { datos: null, estado: false })
            }
        });
    }
}


function otraGestion(req, res) {
    if (req.body.volver != undefined) {
        res.render('index');
    }

    if (req.body.add != undefined) {
        res.render('crear');
    }

}

function crearUsuario(req, res) {
    var datos = req.session.usuarioLogeado;
    if (req.body.volver != undefined) {
        verUsuarios(datos, res);
    }

    if (req.body.add != undefined) {
        if (req.body.password == req.body.password2) {
            pool.query('INSERT INTO personas (nombre,email,password) VALUES (?,?,?)', [req.body.nombre, req.body.email, req.body.password], (error, result) => {
                if (error) throw error;
                if (result) {
                    insertarRol(req.body.email, req.body.rol, res, req);
                } else {
                    console.log('Registro no insertado');
                    res.render('index', { datos: null, estado: false });
                }
            });
        } else {
            res.render('crear', { mensaje: 'Las contraseñas no son iguales' });
        }
    }
}


function insertarRol(email, rol, res, req) {
    var datos = req.session.usuarioLogeado;
    pool.query('INSERT INTO conjunto (email,id_rol) VALUES (?,?)', [email, rol], (error, result) => {
        if (error) throw error;
        if (result) {
            verUsuarios(datos, res);
        } else {
            console.log('Registro no insertado');
            res.render('index', { datos: null, estado: false });
        }
    });
}


function editarUsuario(req, res) {
    var datos = req.session.usuarioLogeado;
    if (req.body.volver != undefined) {
        verUsuarios(datos, res);
    }

    if (req.body.ed != undefined) {
        var personaAnt = req.session.PersonaAnt;
        pool.query('UPDATE personas SET nombre = ?, email = ? WHERE email = ?', [req.body.nombre, req.body.email, personaAnt.email], (error, result) => {
            if (error) throw error;
            if (result) {
                pool.query('UPDATE conjunto SET id_rol = ? WHERE email = ?', [req.body.rol, req.body.email], (error, result) => {
                    if (error) throw error;
                    if (result) {
                        verUsuarios(datos, res);
                    } else {
                        console.log('Registro no insertado');
                        res.render('index', { datos: null, estado: false });
                    }
                });
            } else {
                console.log('Registro no insertado');
                res.render('index', { datos: null, estado: false });
            }
        });
    }
}


module.exports = {
    indice,
    validar,
    verRol,
    verUsuarios,
    gestionUsuarios,
    otraGestion,
    crearUsuario,
    editarUsuario,
};