require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.APP_PORT || 8000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Rutas de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a mi API de tienda virtual' });
});

// Iniciar con error handling
app.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en puerto ${PORT}`);
  console.log(`Accede a: http://localhost:${PORT}/`);
});

process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Promesa rechazada:', err);
  process.exit(1);
});
