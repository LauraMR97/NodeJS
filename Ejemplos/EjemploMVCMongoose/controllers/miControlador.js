var express = require('express');
var bodyParser = require('body-parser');
// Cargamos el modelo para usarlo posteriormente
var usuarios = require('../models/usuario.js');
var app = express();

/*
Para la eficiencia, vamos a crear un pool de MySQL, que nos permite utilizar múltiples conexiones 
a la vez en lugar de tener que manualmente abrir y cerrar conexiones múltiples.
*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Creamos un método en el controlador, en este caso una accion de pruebas
function indice(req, res) {
    res.render("index");
}

function validar(req, res) {
    //usuarios.find({ id: req.body.id },
        usuarios.find( //--> Esto equivale a un SELECT *
        function(err, personas) {
            if (err) throw err;
            if (personas.length > 0) {
                //res.render("mostrar", { datos: personas, estado: true });
                res.send(personas);
            } else {
                console.log('Registro no encontrado');
                res.render('mostrar', { datos: null, estado: false })
            }
        }
    );

};

function conParametro(req, res) {
    usuarios.deleteOne({ id: req.params.id },
        function(err, personas) {
            if (err) {
                res.send(err);
            } else {
                res.send(personas);
            }
        }
    );
    // usuarios.find({ id: req.params.id },
    //     function(err, personas) {
    //         if (err) throw err;
    //         if (personas.length > 0) {
    //             //res.render("mostrar", { datos: personas, estado: true });
    //             res.send(personas);
    //         } else {
    //             console.log('Registro no encontrado');
    //             res.render('mostrar', { datos: null, estado: false })
    //         }
    //     }
    // );
};

// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    indice,
    validar,
    conParametro
};