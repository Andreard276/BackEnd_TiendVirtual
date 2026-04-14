const { tbc_usuario } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const usuario = await tbc_usuario.create(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al crear el usuario',
        error: error.message,
      });
    }
  },

  async find(req, res) {
    try {
      const usuario = await tbc_usuario.findByPk(req.params.id);

      if (!usuario) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
        });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al buscar el usuario',
        error: error.message,
      });
    }
  },

  async list(req, res) {
    try {
      const usuarios = await tbc_usuario.findAll({
        order: [['id', 'ASC']],
      });

      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al listar los usuarios',
        error: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const usuario = await tbc_usuario.findByPk(req.params.id);

      if (!usuario) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
        });
      }

      await usuario.update(req.body);
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al actualizar el usuario',
        error: error.message,
      });
    }
  },

  async delete(req, res) {
    try {
      const usuario = await tbc_usuario.findByPk(req.params.id);

      if (!usuario) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
        });
      }

      await usuario.destroy();
      return res.status(200).json({
        message: 'Usuario eliminado correctamente',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al eliminar el usuario',
        error: error.message,
      });
    }
  },
};
