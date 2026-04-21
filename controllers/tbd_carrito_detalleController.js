const { tbd_carrito_detalle, tbd_carrito, tbb_productos } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { id_carrito, id_producto, precio_unitario, cantidad } = req.body;

      if (!id_carrito || !id_producto) {
        return res.status(400).json({
          message: 'id_carrito e id_producto son requeridos',
        });
      }

      const carrito = await tbd_carrito.findByPk(id_carrito);
      if (!carrito) {
        return res.status(404).json({
          message: 'El carrito indicado no existe',
        });
      }

      const producto = await tbb_productos.findByPk(id_producto);
      if (!producto) {
        return res.status(404).json({
          message: 'El producto indicado no existe',
        });
      }

      const detalle = await tbd_carrito_detalle.create({
        id_carrito,
        id_producto,
        precio_unitario: precio_unitario ?? producto.precio,
        cantidad: cantidad ?? 1
      });

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

      const datos = { ...req.body };

      if (datos.id_carrito) {
        const carrito = await tbd_carrito.findByPk(datos.id_carrito);
        if (!carrito) {
          return res.status(404).json({
            message: 'El carrito indicado no existe',
          });
        }
      }

      if (datos.id_producto) {
        const producto = await tbb_productos.findByPk(datos.id_producto);
        if (!producto) {
          return res.status(404).json({
            message: 'El producto indicado no existe',
          });
        }
      }

      await detalle.update(datos);
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
