const mysql = require('mysql2/promise');

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS tienda_virtual');
    console.log('✓ Base de datos creada');

    // Cambiar a la BD recién creada
    await connection.changeUser({ database: 'tienda_virtual' });

    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createDatabase();
