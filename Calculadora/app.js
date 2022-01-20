var express = require("express");
var body_parser = require('body-parser');
var router = express.Router();
var app = express();

app.set("view engine", "pug");

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
//Esto utiliza el middleware de body-parser.


app.get("/", function(req, res) {
    res.render("index");
});

app.post("/calculo", function(req, res) {
    console.log(req.body);

    num1 = parseInt(req.body.numero1);
    num2 = parseInt(req.body.numero2);
    operacion = req.body.tipoOperacion;

    if (operacion == 'suma') {
        solucion = num1 + num2;
    } else {
        if (operacion == 'resta') {
            solucion = num1 - num2;
        } else {
            if (operacion == 'multiplicacion') {
                solucion = num1 * num2;
            } else {
                if (operacion == 'division') {
                    if (num2 == 0 || num2 < 0) {
                        solucion = 'No se puede dividir entre 0';
                    } else {
                        solucion = num1 / num2;
                    }
                }
            }
        }
    }

    if (isNaN(solucion)) {
        solucion = 0;
    }
    res.render("solucion", { sol: solucion });
});

app.post("/volver", function(req, res) {
    res.render("index");
});

app.listen(8090);