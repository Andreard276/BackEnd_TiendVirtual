const { tbc_usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async create(req, res) {
    try {
      const { nombre, direccion, telefono, email, password, rol } = req.body;

      if (!nombre || !direccion || !telefono || !email || !password) {
        return res.status(400).json({
          message: 'Nombre, direccion, telefono, email y password son requeridos',
        });
      }

      const emailNormalizado = email.trim().toLowerCase();
      const usuarioExistente = await tbc_usuario.findOne({
        where: { email: emailNormalizado }
      });

      if (usuarioExistente) {
        return res.status(409).json({
          message: 'Ya existe un usuario registrado con ese email',
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const usuario = await tbc_usuario.create({
        nombre: nombre.trim(),
        direccion: direccion.trim(),
        telefono: telefono.trim(),
        email: emailNormalizado,
        password: passwordHash,
        rol: rol || 'cliente',
        fecha_registro: new Date()
      });

      const usuarioData = usuario.toJSON();
      delete usuarioData.password;

      return res.status(201).json({
        message: 'Usuario registrado correctamente',
        usuario: usuarioData,
      });
    } catch (error) {
      const status = error.name === 'SequelizeValidationError' ? 400 : 500;
      return res.status(status).json({
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

      const usuarioData = usuario.toJSON();
      delete usuarioData.password;

      return res.status(200).json(usuarioData);
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
        attributes: { exclude: ['password'] },
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

      const datos = { ...req.body };

      if (datos.email) {
        datos.email = datos.email.trim().toLowerCase();
        const usuarioExistente = await tbc_usuario.findOne({
          where: { email: datos.email }
        });

        if (usuarioExistente && usuarioExistente.id !== usuario.id) {
          return res.status(409).json({
            message: 'Ya existe otro usuario con ese email',
          });
        }
      }

      if (datos.nombre) {
        datos.nombre = datos.nombre.trim();
      }

      if (datos.direccion) {
        datos.direccion = datos.direccion.trim();
      }

      if (datos.telefono) {
        datos.telefono = datos.telefono.trim();
      }

      if (datos.password) {
        datos.password = await bcrypt.hash(datos.password, 10);
      }

      await usuario.update(datos);

      const usuarioActualizado = usuario.toJSON();
      delete usuarioActualizado.password;

      return res.status(200).json(usuarioActualizado);
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

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: 'Email y password son requeridos',
        });
      }

      const usuario = await tbc_usuario.findOne({
        where: { email: email.trim().toLowerCase() }
      });

      if (!usuario) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
        });
      }

      const passwordValida = await bcrypt.compare(password, usuario.password);

      if (!passwordValida) {
        return res.status(401).json({
          message: 'Password incorrecto',
        });
      }

      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          rol: usuario.rol
        },
        process.env.JWT_SECRET || 'tu_clave_secreta_aqui',
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        message: 'Login exitoso',
        token,
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error en el login',
        error: error.message,
      });
    }
  },
};
