'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('admin123', 10);
    const hashedPassword3 = await bcrypt.hash('cliente123', 10);

    await queryInterface.bulkInsert('tbc_usuarios', [
      {
        nombre: 'Juan Pérez',
        direccion: 'Calle Principal 123, Ciudad',
        telefono: '+56912345678',
        email: 'juan.perez@email.com',
        password: hashedPassword1,
        rol: 'cliente',
        fecha_registro: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'María González',
        direccion: 'Avenida Central 456, Ciudad',
        telefono: '+56987654321',
        email: 'maria.gonzalez@email.com',
        password: hashedPassword2,
        rol: 'cliente',
        fecha_registro: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Admin Tienda',
        direccion: 'Oficina Principal 789, Ciudad',
        telefono: '+56911223344',
        email: 'admin@tiendavirtual.com',
        password: hashedPassword3,
        rol: 'administrador',
        fecha_registro: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Carlos Rodríguez',
        direccion: 'Plaza Mayor 321, Ciudad',
        telefono: '+56944332211',
        email: 'carlos.rodriguez@email.com',
        password: hashedPassword1,
        rol: 'cliente',
        fecha_registro: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ana López',
        direccion: 'Paseo del Sol 654, Ciudad',
        telefono: '+56955667788',
        email: 'ana.lopez@email.com',
        password: hashedPassword2,
        rol: 'cliente',
        fecha_registro: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbc_usuarios', null, {});
  }
};