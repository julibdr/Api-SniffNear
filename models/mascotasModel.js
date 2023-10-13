const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const mascotasSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now 
    } 
})

const mascotas = mongoose.model( 'mascotas', mascotasSchema );

module.exports = mascotas;