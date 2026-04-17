const { tbc_usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async create(req, res) {
    try {
      console.log('Recibida petición POST /api/usuarios');
      const { password, ...resto } = req.body;
      
      if (!password) {
        return res.status(400).json({
          message: 'La contraseña es requerida',
        });
      }
      
      // Hash de la contraseña
      console.log('Hasheando contraseña...');
      const passwordHash = await bcrypt.hash(password, 10);
      console.log('Contraseña hasheada');
      
      console.log('Creando usuario...');
      const usuario = await tbc_usuario.create({
        ...resto,
        password: passwordHash
      });
      console.log('Usuario creado:', usuario.id);
      
      // No devolver la contraseña en la respuesta
      const { password: _, ...usuarioSinPassword } = usuario.toJSON();
      return res.status(201).json(usuarioSinPassword);
    } catch (error) {
      console.error('Error al crear usuario:', error.message);
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

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar que se envíen email y contraseña
      if (!email || !password) {
        return res.status(400).json({
          message: 'Email y contraseña son requeridos',
        });
      }

      // Buscar usuario por email
      const usuario = await tbc_usuario.findOne({
        where: { email }
      });

      if (!usuario) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
        });
      }

      // Comparar contraseña
      const passwordValida = await bcrypt.compare(password, usuario.password);

      if (!passwordValida) {
        return res.status(401).json({
          message: 'Contraseña incorrecta',
        });
      }

      // Generar JWT
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
