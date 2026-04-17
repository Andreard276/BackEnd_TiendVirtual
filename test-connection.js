require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('Intentando conectar a la BD con:');
  console.log(`- Host: ${process.env.DB_HOST}`);
  console.log(`- Socket: ${process.env.DB_SOCKET}`);
  console.log(`- Usuario: ${process.env.DB_USER}`);
  console.log(`- BD: ${process.env.DB_NAME}`);
  console.log('');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      socketPath: process.env.DB_SOCKET,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tienda_virtual'
    });

    console.log('✓ Conexión exitosa');
    
    const [rows] = await connection.query('SELECT 1');
    console.log('✓ Query exitoso:', rows);

    await connection.end();
  } catch (error) {
    console.error('✗ Error de conexión:', error.message);
    console.error('  Código:', error.code);
  }
}

testConnection();
