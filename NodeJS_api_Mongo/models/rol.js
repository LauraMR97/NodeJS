var mongoose = require("mongoose");


var rolSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    descripcion: { type: String },
}, { collection: 'nodejs_bbdd.rol' });


var Rol = mongoose.model('rol', rolSchema);

module.exports = Rol;