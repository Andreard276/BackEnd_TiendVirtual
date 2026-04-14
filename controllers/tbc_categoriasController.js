const { tbc_categorias } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const categoria = await tbc_categorias.create(req.body);
      return res.status(201).json(categoria);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al crear la categoria',
        error: error.message,
      });
    }
  },

  async find(req, res) {
    try {
      const categoria = await tbc_categorias.findByPk(req.params.id);

      if (!categoria) {
        return res.status(404).json({
          message: 'Categoria no encontrada',
        });
      }

      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al buscar la categoria',
        error: error.message,
      });
    }
  },

  async list(req, res) {
    try {
      const categorias = await tbc_categorias.findAll({
        order: [['id', 'ASC']],
      });

      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al listar las categorias',
        error: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const categoria = await tbc_categorias.findByPk(req.params.id);

      if (!categoria) {
        return res.status(404).json({
          message: 'Categoria no encontrada',
        });
      }

      await categoria.update(req.body);
      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al actualizar la categoria',
        error: error.message,
      });
    }
  },

  async delete(req, res) {
    try {
      const categoria = await tbc_categorias.findByPk(req.params.id);

      if (!categoria) {
        return res.status(404).json({
          message: 'Categoria no encontrada',
        });
      }

      await categoria.destroy();
      return res.status(200).json({
        message: 'Categoria eliminada correctamente',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al eliminar la categoria',
        error: error.message,
      });
    }
  },
};
