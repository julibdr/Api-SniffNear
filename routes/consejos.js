const express = require('express');
const router = express.Router();
const consejosController = require('../controllers/consejosController');

router.post('/registro', consejosController.crearConsejo);

router.put('/:id', consejosController.actualizarConsejo);

router.delete('/:id', consejosController.eliminarConsejo);

router.get('/', consejosController.listaConsejo);

router.get('/:id', consejosController.consejoId);

module.exports = router;