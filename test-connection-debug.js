require('dotenv').config();

console.log('=== DEBUG INFORMACIÓN ===');
console.log('Variables de entorno cargadas:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '****' : '(vacío)');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

const mysql = require('mysql2');

console.log('\nCreando conexión...');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tienda_virtual',
  waitForConnections: true,
  connectionLimit: 1,
  queueLimit: 0,
  timeout: 5000
});

connection.connect(function(err) {
  if (err) {
    console.error('\n✗ ERROR DE CONEXIÓN:');
    console.error('  Mensaje:', err.message);
    console.error('  Código:', err.code);
    console.error('  Errno:', err.errno);
    console.error('  SQL:', err.sql || 'N/A');
    console.error('\nDetalles completos del error:');
    console.error(err);
    process.exit(1);
  }
  console.log('\n✓ CONEXIÓN EXITOSA');
  connection.end();
  process.exit(0);
});
