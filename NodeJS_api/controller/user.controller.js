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

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};