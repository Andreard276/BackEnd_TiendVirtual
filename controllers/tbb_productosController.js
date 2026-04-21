const { tbb_productos, tbc_categorias } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { nombre, descripcion, precio, stock, id_categorias } = req.body;

      if (!nombre || !descripcion || precio == null || !id_categorias) {
        return res.status(400).json({
          message: 'Nombre, descripcion, precio e id_categorias son requeridos',
        });
      }

      const categoria = await tbc_categorias.findByPk(id_categorias);

      if (!categoria) {
        return res.status(404).json({
          message: 'La categoria indicada no existe',
        });
      }

      const producto = await tbb_productos.create({
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio,
        stock: stock ?? 0,
        id_categorias
      });

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

      const datos = { ...req.body };

      if (datos.id_categorias) {
        const categoria = await tbc_categorias.findByPk(datos.id_categorias);

        if (!categoria) {
          return res.status(404).json({
            message: 'La categoria indicada no existe',
          });
        }
      }

      if (datos.nombre) {
        datos.nombre = datos.nombre.trim();
      }

      if (datos.descripcion) {
        datos.descripcion = datos.descripcion.trim();
      }

      await producto.update(datos);
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
