const { tbc_categorias } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const nombre = req.body.nombre?.trim();

      if (!nombre) {
        return res.status(400).json({
          message: 'El nombre de la categoria es requerido',
        });
      }

      const categoriaExistente = await tbc_categorias.findOne({ where: { nombre } });

      if (categoriaExistente) {
        return res.status(409).json({
          message: 'La categoria ya existe',
        });
      }

      const categoria = await tbc_categorias.create({ nombre });
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

      const nombre = req.body.nombre?.trim();

      if (nombre) {
        const categoriaExistente = await tbc_categorias.findOne({ where: { nombre } });

        if (categoriaExistente && categoriaExistente.id !== categoria.id) {
          return res.status(409).json({
            message: 'La categoria ya existe',
          });
        }
      }

      await categoria.update({ ...req.body, ...(nombre ? { nombre } : {}) });
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
