const express = require('express');
const router = express.Router();
const { tbc_usuarioController } = require('../controllers');

router.post('/api/login', tbc_usuarioController.login);
router.post('/api/usuarios', tbc_usuarioController.create);
router.get('/api/usuarios', tbc_usuarioController.list);
router.get('/api/usuarios/:id', tbc_usuarioController.find);
router.put('/api/usuarios/:id', tbc_usuarioController.update);
router.delete('/api/usuarios/:id', tbc_usuarioController.delete);

module.exports = router;
