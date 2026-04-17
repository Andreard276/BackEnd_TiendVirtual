require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('Intentando conectar con diferentes configuraciones...\n');

  const configs = [
    { host: '127.0.0.1', port: 3306, name: 'TCP localhost:3306' },
    { host: 'localhost', name: 'hostname localhost' },
    { socketPath: '\\\\.\\pipe\\MySQL80', name: 'Named pipe MySQL80' },
  ];

  for (const config of configs) {
    console.log(`Intentando ${config.name}...`);
    try {
      const connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        socketPath: config.socketPath,
        user: 'root',
        password: '',
        database: 'tienda_virtual'
      });

      console.log('✓ Conexión exitosa con ' + config.name);
      await connection.end();
      break;
    } catch (error) {
      console.log(`✗ Fallo: ${error.code}`);
    }
  }
}

testConnection();
