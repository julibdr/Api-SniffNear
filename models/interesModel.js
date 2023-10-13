const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const interesSchema = new Schema ({
    titulo: {
        type: String,
        required: true
    },
    horarios: {
        type: Number,
        required: true
    },
    dias: {
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

const interes = mongoose.model( 'interes', interesSchema );

module.exports = interes;