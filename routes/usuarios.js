const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/auth',usuariosController.auth);

router.post('/registro', usuariosController.crear);

router.put('/:id',usuariosController.actualizar);

router.delete('/:id',usuariosController.eliminar);

router.get('/', usuariosController.lista);

router.get('/:id', usuariosController.usuarioId);

module.exports = router;