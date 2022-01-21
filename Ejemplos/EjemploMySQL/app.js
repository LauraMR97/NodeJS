//Para instalar express: npm install express --save
//Para configurar jade: npm install jade --save
//Para recuperar datos de un formulario: npm install body-parser --save
//Para usar mysql: npm install mysql --save

var express = require("express");
var body_parser = require('body-parser');
var router = express.Router();
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'fernando',
    password: 'Chubaca2018',
    database: 'ejemplo',
    port: 3306
});

//Establecemos el motor de vistas.
app.set("view engine", "jade");

//Iniciamos los middlewares que nos servirán para obtener los datos de los formularios.
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
//Esto utiliza el middleware de body-parser.


//-------------- Rutas ----------------------
app.get("/", function(req, res) {
    // connection.connect(function(error) {
    //     if (error) {
    //         throw error;
    //     } else {
    //         console.log('Conexion correcta.');
    //     }
    // });
    handleDisconnect(connection); //Usamos mejor esta función que maneja la conexión.
    var query = connection.query('SELECT * FROM personas', function(error, result) {
        if (error) {
            throw error;
        } else {
            var resultado = result;
            if (resultado.length > 0) {
                console.log(resultado);
                res.render("mostrar", { datos: resultado, estado: true });
            } else {
                console.log('Registro no encontrado');
                res.render('mostrar', { datos: null, estado: false })
            }
        }
    });
    // console.log('Cerrando conexión.')
    // connection.end();
    // Al conectar y desconectar tal y como está comentado produce un problema en la recarga de página por la pérdida de la conexión.
});



//Ejemplo de uso de la ruta siguiente: http://localhost:8090/datos/A101
app.get("/datos/:dni", function(req, res) {

    handleDisconnect(connection); //Usamos mejor esta función que maneja la conexión.
    var query = connection.query('SELECT * FROM personas WHERE DNI = ?', [req.params.dni], function(error, result) {
        if (error) {
            throw error;
        } else {
            var resultado = result;
            if (resultado.length > 0) {
                console.log(resultado);
                res.render("mostrar", { datos: resultado, estado: true });
            } else {
                console.log('Registro no encontrado');
                res.render('mostrar', { datos: null, estado: false })
            }
        }
    });
});


//Ejemplo de uso de la ruta siguiente: http://localhost:8090/index
app.get("/index", function(req, res) {
    res.render('index');
});

app.post("/buscar", function(req, res) {
    handleDisconnect(connection); //Usamos mejor esta función que maneja la conexión.
    var query = connection.query('SELECT * FROM personas WHERE DNI = ?', [req.body.dni], function(error, result) {
        if (error) {
            throw error;
        } else {
            var resultado = result;
            if (resultado.length > 0) {
                console.log(resultado);
                res.render("mostrar", { datos: resultado, estado: true });
            } else {
                console.log('Registro no encontrado');
                res.render('mostrar', { datos: null, estado: false })
            }
        }
    });
});


//Lanzamos el servidor.
app.listen(8090);




/**
 * Esta función la usamos para evitar el error que se produce al conectar y desconectar.
 * @param  connection 
 */
function handleDisconnect(connection) {
    connection.on('error', function(err) {
        if (!err.fatal) {
            return;
        }

        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }

        console.log('Re-connecting lost connection: ' + err.stack);

        connection = mysql.createConnection(connection.config);
        handleDisconnect(connection);
        connection.connect();
    });
}