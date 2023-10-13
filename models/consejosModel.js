const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const consejosSchema = new Schema ({
    titulo: {
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

const consejos = mongoose.model( 'consejos', consejosSchema );

module.exports = consejos;