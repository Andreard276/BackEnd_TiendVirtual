require('dotenv').config();
const mysql = require('mysql2/promise');

async function setupDatabase() {
  try {
    console.log('Intentando conectar a MySQL en localhost:3307...');
    
    // Intentar primera conexión sin especificar base de datos
    const conn = await mysql.createConnection({
      host: 'localhost',
      port: 3307,
      user: 'root',
      password: '1234',
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
      connectTimeout: 5000
    });

    console.log('✓ Conectado a MySQL');

    // Crear base de datos
    await conn.query('CREATE DATABASE IF NOT EXISTS tienda_virtual');
    console.log('✓ Base de datos tienda_virtual creada/verificada');

    // Cambiar a la base de datos
    await conn.query('USE tienda_virtual');
    console.log('✓ Usando base de datos tienda_virtual');

    await conn.end();
    console.log('✓ Conexión cerrada');

  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error('  Código:', error.code);
    console.log('\n⚠ Asegúrate de que MySQL esté ejecutándose en localhost:3307');
    process.exit(1);
  }
}

setupDatabase();
