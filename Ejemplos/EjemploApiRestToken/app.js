//Para instalar express: npm install express --save
//Para configurar jade: npm install jade --save
//Para recuperar datos de un formulario: npm install body-parser --save
//Para usar mysql: npm install mysql --save

var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");

var app = express();


var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
  
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});



// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido." });
});
  
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8090;
    app.listen(PORT, () => {
    console.log(`Servidor arrancado en http://localhost:${PORT}.`);
});

/*
Run Node.js application with command: node server.js

Tables that we define in models package will be automatically generated in MySQL Database.
*/

/*
Let me explain what we’ve just done:
– import express, body-parser and cors modules:

    Express is for building the Rest apis
    body-parser helps to parse the request and create the req.body object
    cors provides Express middleware to enable CORS

– create an Express app, then add body-parser and cors middlewares using app.use() method. Notice that we set origin: http://localhost:8081.
– define a GET route which is simple for test.
– listen on port 8090 for incoming requests.
*/

/*
var mysql = require('mysql');
const { response } = require("express");

// Create a MySQL pool
// Set database connection credentials
var config = {
    host: 'localhost',
    user: 'fernando',
    password: 'Chubaca2018',
    database: 'authBasico',
    port: 3306
};
*/
/*
Para la eficiencia, vamos a crear un pool de MySQL, que nos permite utilizar múltiples conexiones 
a la vez en lugar de tener que manualmente abrir y cerrar conexiones múltiples.
*/
/*
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
        if (error) throw error;
        response.status(200).send(result);
    });
});


// Display a single user by ID
app.get('/personas/:id', (request, response) => {
    const id = request.params.id;

    pool.query('SELECT * FROM personas WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        response.status(200).send(result);
    });
});

// Add a new user
app.post('/personas', (req, res) => {
    var nombre = req.body.nombre;
    var ciudad = req.body.ciudad;
    console.log(req.body);
    console.log(nombre);
    console.log(ciudad);
    pool.query('INSERT INTO personas (nombre, ciudad) VALUES (?,?)', [req.body.nombre, req.body.ciudad], (error, result) => {
        if (error) throw error;
        res.status(201).send('Registro añadido ID:' + result.insertId);
    });
});


// Update an existing user
app.put('/personas/:id', (req, res) => {
    const id = req.params.id;
    var nombre = req.body.nombre;
    var ciudad = req.body.ciudad;
    console.log(req.body);
    console.log(nombre);
    console.log(ciudad);
    pool.query('UPDATE personas SET ? WHERE id = ?', [req.body, id], (error, result) => {
        if (error) throw error;
        res.status(201).send('Se han cambiado: ' + result.changedRows + " filas");
    });
});

// Delete a user
app.delete('/personas/:id', (req, res) => {
    const id = req.params.id;
    console.log("Borrando el id: " + id);
    pool.query('DELETE FROM personas WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        else {
            if (result.affectedRows == 0) {
                res.status(404).send('Se han borrado: ' + result.affectedRows + " filas");
            } else {
                res.status(201).send('Se han borrado: ' + result.affectedRows + " filas");
            }
        }
    });
});

//Lanzamos el servidor.
console.log("Servidor arrancado: http://localhost:8090");
app.listen(8090);
*/
function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }