var express = require("express");
var body_parser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = express.Router();
var app = express();

app.set("view engine", "pug");

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
//Esto utiliza el middleware de body-parser.
app.use(cookieParser());


// server.js
var session = require('express-session');

app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true
}))



app.get("/", function(req, res) {
    res.render("index");
});


app.post("/test", function(req, res) {
    req.session.numero = req.body.numero;
    req.session.intentos = 5;
    res.render("tabla", { solucion: req.body.numero, intentos: req.session.intentos });
});


app.post("/terminado", function(req, res) {
    res.render("index");
});

app.post("/volver", function(req, res) {
    res.render("index");
});

app.post("/comprobar", function(req, res) {

    if (req.body.meRindo != undefined) {

        sol = Array;

        for (i = 0; i < 11; i++) {
            sol[i] = i * req.session.numero;
        }
        numero = req.session.numero;
        res.render("solucion", { solucion: sol, num: numero });
    }
    if (req.body.volver != undefined) {
        res.render("index");
    }
    if (req.body.enviar != undefined) {

        victoria = true;
        numero = req.session.numero;
        mensaje = '';
        resultado = Array();
        colores = Array();

        for (var i = 0; i < 11; i++) {
            resultado[i] = req.body.resultados[i];
            solucion = numero * i;
            colores[i] = 'background-color:lightgreen;';

            if (resultado[i] != solucion) {
                victoria = false;
                colores[i] = 'background-color:red;';
            }
        }

        if (req.session.intentos > 1) {
            if (victoria == true) {
                mensaje = 'has ganado';
                res.render("resultado", { mensaje: mensaje });
            } else {
                req.session.intentos = req.session.intentos - 1;
                mensaje = 'sigue intentandolo';
            }
        } else {
            req.session.intentos = req.session.intentos - 1;
            mensaje = 'has perdido';
            res.render("resultado", { mensaje: mensaje });
        }
        res.render("tabla", { colores: colores, intentos: req.session.intentos, mensaje: mensaje, resultados: resultado });
    }



});
app.listen(8090);