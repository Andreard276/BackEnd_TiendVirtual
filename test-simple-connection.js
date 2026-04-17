require('dotenv').config();
const Sequelize = require('sequelize');

console.log('Intentando conectar a BD...');
console.log('Host:', process.env.DB_HOST);
console.log('User:', process.env.DB_USER);
console.log('Database:', process.env.DB_NAME);
console.log('Port:', process.env.DB_PORT);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✓ Conexión exitosa');
    process.exit(0);
  })
  .catch(err => {
    console.error('✗ Error:', err.message);
    console.error('Code:', err.code);
    console.error('SQL:', err.sql);
    process.exit(1);
  });
