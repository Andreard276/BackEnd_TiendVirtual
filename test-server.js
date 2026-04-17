require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Rutas de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});

app.post('/test', (req, res) => {
  console.log('Recibida petición POST');
  console.log('Body:', req.body);
  res.json({ message: 'POST recibido', body: req.body });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`✓ Servidor de prueba en puerto ${PORT}`);
});
