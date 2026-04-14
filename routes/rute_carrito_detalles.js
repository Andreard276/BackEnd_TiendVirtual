const express = require('express');
const router = express.Router();
const { tbd_carrito_detalleController } = require('../controllers');

router.post('/api/carrito-detalles', tbd_carrito_detalleController.create);
router.get('/api/carrito-detalles', tbd_carrito_detalleController.list);
router.get('/api/carrito-detalles/:id', tbd_carrito_detalleController.find);
router.put('/api/carrito-detalles/:id', tbd_carrito_detalleController.update);
router.delete('/api/carrito-detalles/:id', tbd_carrito_detalleController.delete);

module.exports = router;
