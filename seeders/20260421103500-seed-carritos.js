'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Primero crear los carritos
    await queryInterface.bulkInsert('tbd_carritos', [
      {
        id_usuario: 1, // Juan Pérez
        total: 369.98, // Smartphone (299.99) + Camiseta (19.99) + Bolso (49.99) - pero calcularemos después
        fecha_creacion: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_usuario: 2, // María González
        total: 139.98, // Jeans (49.99) + Lámpara (39.99) + Libro JS (49.99)
        fecha_creacion: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_usuario: 4, // Carlos Rodríguez
        total: 74.98, // Pelota fútbol (24.99) + Raqueta (49.99)
        fecha_creacion: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Ahora crear los detalles de carrito
    await queryInterface.bulkInsert('tbd_carrito_detalles', [
      // Carrito de Juan Pérez (id_carrito = 1)
      {
        id_carrito: 1,
        id_producto: 1, // Smartphone Samsung Galaxy A54
        precio_unitario: 299.99,
        cantidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_carrito: 1,
        id_producto: 4, // Camiseta Básica Algodón
        precio_unitario: 19.99,
        cantidad: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_carrito: 1,
        id_producto: 6, // Bolso de Cuero Sintético
        precio_unitario: 79.99,
        cantidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Carrito de María González (id_carrito = 2)
      {
        id_carrito: 2,
        id_producto: 5, // Jeans Clásicos
        precio_unitario: 49.99,
        cantidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_carrito: 2,
        id_producto: 8, // Lámpara de Mesa LED
        precio_unitario: 39.99,
        cantidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_carrito: 2,
        id_producto: 13, // JavaScript: La Guía Definitiva
        precio_unitario: 59.99,
        cantidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Carrito de Carlos Rodríguez (id_carrito = 3)
      {
        id_carrito: 3,
        id_producto: 10, // Pelota de Fútbol Profesional
        precio_unitario: 24.99,
        cantidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_carrito: 3,
        id_producto: 11, // Raqueta de Tenis Wilson
        precio_unitario: 89.99,
        cantidad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbd_carrito_detalles', null, {});
    await queryInterface.bulkDelete('tbd_carritos', null, {});
  }
};