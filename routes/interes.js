const express = require('express');
const router = express.Router();
const interesController = require('../controllers/interesController');

router.post('/registro', interesController.crearInteres);

router.put('/:id', interesController.actualizarInteres);

router.delete('/:id', interesController.eliminarInteres);

router.get('/', interesController.listaInteres);

router.get('/:id', interesController.interesId);

module.exports = router;