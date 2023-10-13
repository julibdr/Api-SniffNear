const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/miBaseDeDatos', { useNewUrlParser: true, useUnifiedTopology: true });

const dataBase = mongoose.connection;

dataBase.on('error', (error) => {
  console.error('Error de conexión a la base de datos:', error);
});

dataBase.on('open', () => {
  console.log('Conectado a la base de datos');
});