'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tbb_productos', [
      // Electrónicos (id_categoria = 1)
      {
        nombre: 'Smartphone Samsung Galaxy A54',
        descripcion: 'Smartphone Android con pantalla AMOLED de 6.4", 128GB almacenamiento, cámara de 50MP',
        precio: 299.99,
        stock: 25,
        id_categorias: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Laptop Dell Inspiron 15',
        descripcion: 'Laptop con procesador Intel Core i5, 8GB RAM, 512GB SSD, pantalla 15.6"',
        precio: 599.99,
        stock: 15,
        id_categorias: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Audífonos Sony WH-1000XM4',
        descripcion: 'Audífonos inalámbricos con cancelación de ruido, batería de 30 horas',
        precio: 349.99,
        stock: 30,
        id_categorias: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Ropa y Accesorios (id_categoria = 2)
      {
        nombre: 'Camiseta Básica Algodón',
        descripcion: 'Camiseta de algodón 100%, disponible en varios colores, talla M',
        precio: 19.99,
        stock: 100,
        id_categorias: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Jeans Clásicos',
        descripcion: 'Jeans de mezclilla azul, corte recto, talla 32',
        precio: 49.99,
        stock: 50,
        id_categorias: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Bolso de Cuero Sintético',
        descripcion: 'Bolso elegante para mujer, múltiples compartimentos, color negro',
        precio: 79.99,
        stock: 20,
        id_categorias: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Hogar y Jardín (id_categoria = 3)
      {
        nombre: 'Juego de Sábanas Queen Size',
        descripcion: 'Juego completo de sábanas de algodón egipcio, incluye 2 fundas de almohada',
        precio: 89.99,
        stock: 40,
        id_categorias: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Lámpara de Mesa LED',
        descripcion: 'Lámpara de mesa con luz LED regulable, diseño moderno, color blanco',
        precio: 39.99,
        stock: 35,
        id_categorias: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Set de Jardinería Básico',
        descripcion: 'Incluye regadera, guantes, pala pequeña y semillas de flores variadas',
        precio: 29.99,
        stock: 60,
        id_categorias: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Deportes y Entretenimiento (id_categoria = 4)
      {
        nombre: 'Pelota de Fútbol Profesional',
        descripcion: 'Pelota de fútbol tamaño oficial, material sintético resistente al agua',
        precio: 24.99,
        stock: 45,
        id_categorias: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Raqueta de Tenis Wilson',
        descripcion: 'Raqueta de tenis para principiantes, peso ligero, cordaje incluido',
        precio: 89.99,
        stock: 25,
        id_categorias: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Consola de Videojuegos Portátil',
        descripcion: 'Consola retro con 500 juegos clásicos incluidos, pantalla LCD de 3"',
        precio: 49.99,
        stock: 30,
        id_categorias: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Libros y Educación (id_categoria = 5)
      {
        nombre: 'JavaScript: La Guía Definitiva',
        descripcion: 'Libro completo sobre JavaScript moderno, incluye ES6+, Node.js y frameworks',
        precio: 59.99,
        stock: 20,
        id_categorias: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Curso de Inglés Básico',
        descripcion: 'Libro con ejercicios prácticos, audio incluido, nivel principiante a intermedio',
        precio: 34.99,
        stock: 40,
        id_categorias: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Atlas Mundial Geográfico',
        descripcion: 'Atlas actualizado con mapas detallados de todos los países del mundo',
        precio: 44.99,
        stock: 15,
        id_categorias: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbb_productos', null, {});
  }
};