const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const usuarioSchema = new Schema ({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now 
    } 
})

const usuario = mongoose.model( 'usuario', usuarioSchema );

module.exports = usuario;