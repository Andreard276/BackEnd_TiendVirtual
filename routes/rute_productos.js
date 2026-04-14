const express = require('express');
const router = express.Router();
const { tbb_productosController } = require('../controllers');

router.post('/api/productos', tbb_productosController.create);
router.get('/api/productos', tbb_productosController.list);
router.get('/api/productos/:id', tbb_productosController.find);
router.put('/api/productos/:id', tbb_productosController.update);
router.delete('/api/productos/:id', tbb_productosController.delete);

module.exports = router;
