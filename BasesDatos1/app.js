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

app.post("/login", function(req, res) {
    email = req.body.email;
    password = req.body.password;
    res.render("registrado", { datos: req.body });
});
app.listen(8090);