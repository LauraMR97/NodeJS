//const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");
var express = require('express');
var bodyParser = require('body-parser');
var api = express.Router();

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

module.exports = function(api) {


    api.post("/api/auth/login", controller.login);

    //module.exports = api;

}