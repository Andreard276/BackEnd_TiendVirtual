const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const http = require('http');
const app = express();

// RUTAS - intentar cargarlas una por una
let categoriasRoutes, usuariosRoutes, productosRoutes, carritosRoutes, carritoDetallesRoutes;

try {
  categoriasRoutes = require('./routes/rute_categorias');
  console.log('✓ Rutas de categorías cargadas');
} catch (e) {
  console.error('✗ Error en rute_categorias:', e.message);
}

try {
  usuariosRoutes = require('./routes/rute_usuarios');
  console.log('✓ Rutas de usuarios cargadas');
} catch (e) {
  console.error('✗ Error en rute_usuarios:', e.message);
}

try {
  productosRoutes = require('./routes/rute_productos');
  console.log('✓ Rutas de productos cargadas');
} catch (e) {
  console.error('✗ Error en rute_productos:', e.message);
}

try {
  carritosRoutes = require('./routes/rute_carritos');
  console.log('✓ Rutas de carritos cargadas');
} catch (e) {
  console.error('✗ Error en rute_carritos:', e.message);
}

try {
  carritoDetallesRoutes = require('./routes/rute_carrito_detalles');
  console.log('✓ Rutas de carrito detalles cargadas');
} catch (e) {
  console.error('✗ Error en rute_carrito_detalles:', e.message);
}

// Configurar CORS
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas
app.get('/', (req, res) => res.status(200).send({
  message: 'Bienvenido a mi API de tienda virtual',
}));

if (categoriasRoutes) app.use(categoriasRoutes);
if (usuariosRoutes) app.use(usuariosRoutes);
if (productosRoutes) app.use(productosRoutes);
if (carritosRoutes) app.use(carritosRoutes);
if (carritoDetallesRoutes) app.use(carritoDetallesRoutes);

const port = parseInt(process.env.APP_PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);

console.log('\n═══════════════════════════════════════');
console.log('Iniciando sincronización de BD...');

let db;
try {
  db = require('./models');
  console.log('✓ Modelos cargados');
} catch (error) {
  console.error('✗ Error al cargar modelos:', error.message);
  db = null;
}

if (db && db.sequelize) {
  db.sequelize.authenticate()
    .then(() => {
      console.log('✓ Conexión a la BD exitosa');
      return db.sequelize.sync({ alter: true });
    })
    .then(() => {
      console.log('✓ Base de datos sincronizada');
      console.log('═══════════════════════════════════════\n');
      
      server.listen(port, '0.0.0.0', () => {
        console.log(`✓ Servidor ejecutándose en puerto ${port}`);
      });
    })
    .catch(error => {
      console.error('✗ Error en la inicialización:');
      console.error('  Mensaje:', error.message);
      process.exit(1);
    });
} else {
  console.log('⚠ Base de datos no disponible, iniciando servidor sin BD');
  console.log('═══════════════════════════════════════\n');
  
  server.listen(port, '0.0.0.0', () => {
    console.log(`✓ Servidor ejecutándose en puerto ${port}`);
  });
}

server.on('error', (error) => {
  console.error('✗ Error del servidor:', error.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('✗ Excepción no capturada:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('✗ Rechazo no manejado:', reason);
  process.exit(1);
});

module.exports = app;
