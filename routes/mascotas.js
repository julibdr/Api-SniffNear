const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotasController');

router.post('/registro', mascotasController.crearMascota);

router.put('/:id', mascotasController.actualizarMascota);

router.delete('/:id', mascotasController.eliminarMascota);

router.get('/', mascotasController.listaMascotas);

router.get('/:id', mascotasController.mascotaId);

module.exports = router;