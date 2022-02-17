var mongoose = require("mongoose");


var userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    nombre: { type: String },
    password: { type: String }
}, { collection: 'nodejs_bbdd.personas' });


var Persona = mongoose.model('persona', userSchema);

module.exports = Persona;