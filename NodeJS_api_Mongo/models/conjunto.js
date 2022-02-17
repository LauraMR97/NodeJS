var mongoose = require("mongoose");


var conjuntoSchema = new mongoose.Schema({
    id_rol: { type: Number, unique: true },
    email: { type: String, uniques: true },
}, { collection: 'nodejs_bbdd.conjunto' });


var Conjunto = mongoose.model('conjunto', conjuntoSchema);

module.exports = Conjunto;