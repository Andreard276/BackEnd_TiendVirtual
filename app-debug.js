require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const tbc_usuarioController = require('./controllers/tbc_usuarioController');

const app = express();
app.use(bodyParser.json());

app.post('/api/usuarios', async (req, res) => {
  console.log('✓ POST /api/usuarios recibido');
  console.log('  Body:', req.body);
  
  try {
    console.log('  → Iniciando creación...');
    await tbc_usuarioController.create(req, res);
    console.log('  ✓ Respuesta enviada');
  } catch (error) {
    console.error('  ✗ Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', (req, res) => {
  console.log('✓ POST /api/login recibido');
  return tbc_usuarioController.login(req, res);
});

app.get('/', (req, res) => {
  res.json({ message: 'API de tienda virtual' });
});

db.sequelize.authenticate()
  .then(() => {
    console.log('✓ Conexión a la BD exitosa');
    return db.sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('✓ Base de datos sincronizada');
    const port = process.env.APP_PORT || 3000;
    app.listen(port, () => {
      console.log(`✓ Servidor en puerto ${port}`);
    });
  })
  .catch(error => {
    console.error('✗ Error:', error.message);
    process.exit(1);
  });
