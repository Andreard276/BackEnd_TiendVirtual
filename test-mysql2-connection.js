require('dotenv').config();
const mysql = require('mysql2/promise');

console.log('Intentando conectar a MySQL directamente...');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tienda_virtual'
    });
    
    console.log('✓ Conexión exitosa a MySQL');
    
    const [rows] = await connection.execute('SELECT VERSION()');
    console.log('✓ Versión MySQL:', rows[0]);
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error('Code:', error.code);
    process.exit(1);
  }
})();
