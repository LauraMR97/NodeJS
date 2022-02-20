var mongoose = require("mongoose");


var conjuntoSchema = new mongoose.Schema({
    id_rol: { type: Number },
    email: { type: String },
}, { collection: 'nodejs_bbdd.conjunto' });

//conjuntoSchema.index({ id_rol: 1, email: 1 });

var Conjunto = mongoose.model('conjunto', conjuntoSchema);

module.exports = Conjunto;