const express = require('express');
const router = express.Router();
const { tbc_categoriasController } = require('../controllers');

router.post('/api/categorias', tbc_categoriasController.create);
router.get('/api/categorias', tbc_categoriasController.list);
router.get('/api/categorias/:id', tbc_categoriasController.find);
router.put('/api/categorias/:id', tbc_categoriasController.update);
router.delete('/api/categorias/:id', tbc_categoriasController.delete);

module.exports = router;
