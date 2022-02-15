var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");

var app = express();

var session = require('express-session');
app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true
}));

var corsOptions = {
    origin: "http://127.0.0.1:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//const db = require("./models");
//const Role = db.role;

/*db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});*/



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