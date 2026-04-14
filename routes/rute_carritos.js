const express = require('express');
const router = express.Router();
const { tbd_carritoController } = require('../controllers');

router.post('/api/carritos', tbd_carritoController.create);
router.get('/api/carritos', tbd_carritoController.list);
router.get('/api/carritos/:id', tbd_carritoController.find);
router.put('/api/carritos/:id', tbd_carritoController.update);
router.delete('/api/carritos/:id', tbd_carritoController.delete);

module.exports = router;
