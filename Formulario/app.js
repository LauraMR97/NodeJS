var express = require("express");
var body_parser = require('body-parser');
var router = express.Router();
var app = express();

app.set("view engine", "jade");

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
//Esto utiliza el middleware de body-parser.


app.get("/", function(req, res) {
    res.render("index");
});

app.post("/validar", function(req, res) {
    console.log(req.body);
    res.render("registrado", { datos: req.body });
});

app.post("/volver", function(req, res) {
    res.render("index");
});


app.listen(8090);