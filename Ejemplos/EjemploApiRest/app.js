//Para instalar express: npm install express --save
//Para configurar jade: npm install jade --save
//Para recuperar datos de un formulario: npm install body-parser --save
//Para usar mysql: npm install mysql --save

var express = require("express");
var body_parser = require('body-parser');
var router = express.Router();
var app = express();
var mysql = require('mysql');
const { response } = require("express");

// Create a MySQL pool
// Set database connection credentials
var config = {
    host: 'localhost',
    user: 'fernando',
    password: 'Chubaca2018',
    database: 'ejemplo',
    port: 3306
};
/*
Para la eficiencia, vamos a crear un pool de MySQL, que nos permite utilizar múltiples conexiones 
a la vez en lugar de tener que manualmente abrir y cerrar conexiones múltiples.
*/
var pool = mysql.createPool(config);
// Export the pool
module.exports = pool;
exports.pool = pool;

// app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());



//------------------------------- Rutas -------------------------------------
// Display all users
app.get('/personas', (request, response) => {
    pool.query('SELECT * FROM personas', (error, result) => {
        if (error) response.status(400).send({status:400, message:"Se ha producido un error en la consulta."});
        else response.status(200).send(result);
    });
});


// Display a single user by ID
app.get('/personas/:dni', (request, response) => {
    const dni = request.params.dni;

    pool.query('SELECT * FROM personas WHERE DNI = ?', dni, (error, result) => {
        if (error) response.status(400).send({status:400, message:"Se ha producido un error en la consulta."});
        else response.status(200).send(result);
    });
});


// Add a new user
app.post('/personas', (req, res) => {
    var dni = req.body.dni;
    var nombre = req.body.nombre;
    var tfno = req.body.tfno;
    console.log(req.body);
    pool.query('INSERT INTO personas (DNI, Nombre, Clave, Tfno) VALUES (?,?,?,?)', [dni, nombre, 1234, tfno], (error, result) => {
        if (error) res.status(400).send({status:400, message:'Error al insertar ' + dni});
        else res.status(201).send({status:201,message:'Registro añadido ID:' + result.insertId}); //En este caso esto devuelve 0 porque la clave no es Id.
    });
});


// Update an existing user
app.put('/personas/:dni', (req, res) => {
    const dni = req.params.dni;
    console.log(req.body);
    pool.query('UPDATE personas SET ? WHERE DNI = ?', [req.body, dni], (error, result) => {
        if (error) res.status(400).send({status:400, message:'Error al actualizar'});
        else res.status(201).send({status:201, message:'Se han cambiado: ' + result.changedRows + " filas"});
    });
});


// Delete a user
app.delete('/personas/:dni', (req, res) => {
    const dni = req.params.dni;
    console.log("Borrando el DNI: " + dni);
    pool.query('DELETE FROM personas WHERE DNI = ?', dni, (error, result) => {
        if (error) throw error;
        else {
            if (result.affectedRows == 0) {
                res.status(404).send({status:404, message:'Se han borrado: ' + result.affectedRows + " filas"});
            } else {
                res.status(201).send({status:201, message:'Se han borrado: ' + result.affectedRows + " filas"});
            }
        }
    });
});


//Lanzamos el servidor.
console.log("Servidor arrancado: http://localhost:8090");
app.listen(8090);