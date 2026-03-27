const express = require ('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const http= require('http');
const app = express ();
const categoriasRoutes = require('./routes/rute_categorias');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=> res.status(200).send({
    message: 'Bienvenido a mi API de tienda virtual',
}));

app.use(categoriasRoutes);

const port = parseInt(process.env.APP_PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
module.exports = app;