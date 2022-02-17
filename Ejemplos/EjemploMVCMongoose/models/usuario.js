var mongoose = require("mongoose");

// module.exports = mongoose.model('usuarios', {
//     id: Number,
//     nombre: String,
//     edad: Number
// });

var userSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    nombre: { type: String },
    edad: { type: Number }
}, { collection: 'ejemplo.usuarios' });


var User = mongoose.model('user', userSchema);

module.exports = User;