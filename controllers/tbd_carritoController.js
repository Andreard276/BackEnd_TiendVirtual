const { tbd_carrito, tbc_usuario } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { id_usuario, total } = req.body;

      if (!id_usuario) {
        return res.status(400).json({
          message: 'id_usuario es requerido',
        });
      }

      const usuario = await tbc_usuario.findByPk(id_usuario);

      if (!usuario) {
        return res.status(404).json({
          message: 'El usuario indicado no existe',
        });
      }

      const carrito = await tbd_carrito.create({
        id_usuario,
        total: total ?? 0
      });

      return res.status(201).json(carrito);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al crear el carrito',
        error: error.message,
      });
    }
  },

  async find(req, res) {
    try {
      const carrito = await tbd_carrito.findByPk(req.params.id);

      if (!carrito) {
        return res.status(404).json({
          message: 'Carrito no encontrado',
        });
      }

      return res.status(200).json(carrito);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al buscar el carrito',
        error: error.message,
      });
    }
  },

  async list(req, res) {
    try {
      const carritos = await tbd_carrito.findAll({
        order: [['id', 'ASC']],
      });

      return res.status(200).json(carritos);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al listar los carritos',
        error: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const carrito = await tbd_carrito.findByPk(req.params.id);

      if (!carrito) {
        return res.status(404).json({
          message: 'Carrito no encontrado',
        });
      }

      const datos = { ...req.body };

      if (datos.id_usuario) {
        const usuario = await tbc_usuario.findByPk(datos.id_usuario);

        if (!usuario) {
          return res.status(404).json({
            message: 'El usuario indicado no existe',
          });
        }
      }

      await carrito.update(datos);
      return res.status(200).json(carrito);
    } catch (error) {
      return res.status(500).json({
        message: 'Error al actualizar el carrito',
        error: error.message,
      });
    }
  },

  async delete(req, res) {
    try {
      const carrito = await tbd_carrito.findByPk(req.params.id);

      if (!carrito) {
        return res.status(404).json({
          message: 'Carrito no encontrado',
        });
      }

      await carrito.destroy();
      return res.status(200).json({
        message: 'Carrito eliminado correctamente',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al eliminar el carrito',
        error: error.message,
      });
    }
  },
};
