const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

console.log('═══════ INICIANDO DIAGNÓSTICO ═══════');
console.log('Versión Node:', process.version);
console.log('Puerto configurado:', process.env.APP_PORT);

const app = express();
const port = parseInt(process.env.APP_PORT, 10) || 8000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  console.log('✓ GET / llamado');
  res.json({ message: 'API funcionando' });
});

app.get('/test', (req, res) => {
  console.log('✓ GET /test llamado');
  res.json({ status: 'OK', timestamp: new Date() });
});

console.log('Iniciando servidor en puerto:', port);

const server = http.createServer(app);

server.on('error', (err) => {
  console.error('✗ Error del servidor:', err.code, err.message);
});

server.on('clientError', (err, socket) => {
  console.error('✗ Error del cliente:', err.message);
});

// Aumentar el timeout
server.setTimeout(60000);

const listener = server.listen(port, '0.0.0.0', () => {
  console.log('✓ Servidor escuchando en puerto', port);
  console.log('✓ Dirección:', listener.address());
});

process.on('uncaughtException', (err) => {
  console.error('✗ Excepción no capturada:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('✗ Rechazo no manejado:', reason);
  process.exit(1);
});

console.log('═══════════════════════════════════════');
