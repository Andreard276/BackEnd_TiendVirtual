const express = require ('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const http= require('http');
const app = express ();
const categoriasRoutes = require('./routes/rute_categorias');
const usuariosRoutes = require('./routes/rute_usuarios');
const productosRoutes = require('./routes/rute_productos');
const carritosRoutes = require('./routes/rute_carritos');
const carritoDetallesRoutes = require('./routes/rute_carrito_detalles');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=> res.status(200).send({
    message: 'Bienvenido a mi API de tienda virtual',
}));

app.use(categoriasRoutes);
app.use(usuariosRoutes);
app.use(productosRoutes);
app.use(carritosRoutes);
app.use(carritoDetallesRoutes);

const port = parseInt(process.env.APP_PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
module.exports = app;
