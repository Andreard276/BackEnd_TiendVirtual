const { tbb_productos } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const producto = await tbb_productos.create(req.body);
      return res.status(201).json(producto);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al crear el producto',
        error: error.message,
      });
    }
  },

  async find(req, res) {
    try {
      const producto = await tbb_productos.findByPk(req.params.id);

      if (!producto) {
        return res.status(404).json({
          message: 'Producto no encontrado',
        });
      }

      return res.status(200).json(producto);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al buscar el producto',
        error: error.message,
      });
    }
  },

  async list(req, res) {
    try {
      const productos = await tbb_productos.findAll({
        order: [['id', 'ASC']],
      });

      return res.status(200).json(productos);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al listar los productos',
        error: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const producto = await tbb_productos.findByPk(req.params.id);

      if (!producto) {
        return res.status(404).json({
          message: 'Producto no encontrado',
        });
      }

      await producto.update(req.body);
      return res.status(200).json(producto);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al actualizar el producto',
        error: error.message,
      });
    }
  },

  async delete(req, res) {
    try {
      const producto = await tbb_productos.findByPk(req.params.id);

      if (!producto) {
        return res.status(404).json({
          message: 'Producto no encontrado',
        });
      }

      await producto.destroy();
      return res.status(200).json({
        message: 'Producto eliminado correctamente',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al eliminar el producto',
        error: error.message,
      });
    }
  },
};
