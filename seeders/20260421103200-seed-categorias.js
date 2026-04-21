'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tbc_categorias', [
      {
        nombre: 'Electrónicos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ropa y Accesorios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Hogar y Jardín',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Deportes y Entretenimiento',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Libros y Educación',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbc_categorias', null, {});
  }
};