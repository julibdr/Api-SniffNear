const express = require('express');
const mongoose = require('mongoose'); 
require('dotenv').config();
const usuariosRouter = require('./routes/usuarios');
const mascotasRouter = require('./routes/mascotas');
const consejosRouter = require('./routes/consejos');
const interesRouter = require('./routes/interes');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost/sniffnear', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const dataBase = mongoose.connection; 

dataBase.on('error', (error) => {
  console.error('Error de conexión con MongoDB:', error);
});

dataBase.once('open', () => {
  console.log('Conexión con MongoDB');
});

// Rutas
app.get('/', (req, res) => {
  res.send('<h1>API REST</h1>');
});

app.use('/usuarios', usuariosRouter);
app.use('/mascotas', mascotasRouter);
app.use('/consejos', consejosRouter);
app.use('/interes', interesRouter);

app.listen(port, () => {
  console.log('Servidor en el puerto', port);
});
