const { tbd_carrito_detalle } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const detalle = await tbd_carrito_detalle.create(req.body);
      return res.status(201).json(detalle);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al crear el detalle del carrito',
        error: error.message,
      });
    }
  },

  async find(req, res) {
    try {
      const detalle = await tbd_carrito_detalle.findByPk(req.params.id);

      if (!detalle) {
        return res.status(404).json({
          message: 'Detalle del carrito no encontrado',
        });
      }

      return res.status(200).json(detalle);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al buscar el detalle del carrito',
        error: error.message,
      });
    }
  },

  async list(req, res) {
    try {
      const detalles = await tbd_carrito_detalle.findAll({
        order: [['id', 'ASC']],
      });

      return res.status(200).json(detalles);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al listar los detalles del carrito',
        error: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const detalle = await tbd_carrito_detalle.findByPk(req.params.id);

      if (!detalle) {
        return res.status(404).json({
          message: 'Detalle del carrito no encontrado',
        });
      }

      await detalle.update(req.body);
      return res.status(200).json(detalle);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al actualizar el detalle del carrito',
        error: error.message,
      });
    }
  },

  async delete(req, res) {
    try {
      const detalle = await tbd_carrito_detalle.findByPk(req.params.id);

      if (!detalle) {
        return res.status(404).json({
          message: 'Detalle del carrito no encontrado',
        });
      }

      await detalle.destroy();
      return res.status(200).json({
        message: 'Detalle del carrito eliminado correctamente',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al eliminar el detalle del carrito',
        error: error.message,
      });
    }
  },
};
