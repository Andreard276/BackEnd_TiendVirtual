/**
 * Script para verificar la conexión a la BD y el estado de los modelos
 * Uso: node test-db-connection.js
 */

require('dotenv').config();
const db = require('./models');

async function testConnection() {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║   TEST DE CONEXIÓN A BASE DE DATOS        ║');
  console.log('╚════════════════════════════════════════════╝\n');

  console.log('📋 Configuración:');
  console.log(`   - HOST: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`   - PORT: ${process.env.DB_PORT || 3306}`);
  console.log(`   - USER: ${process.env.DB_USER || 'root'}`);
  console.log(`   - DATABASE: ${process.env.DB_NAME || 'tienda_virtual'}`);
  console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development'}\n`);

  try {
    // Prueba 1: Autenticación
    console.log('1️⃣  Autenticando con la BD...');
    await db.sequelize.authenticate();
    console.log('   ✓ Autenticación exitosa\n');

    // Prueba 2: Listar modelos
    console.log('2️⃣  Modelos cargados:');
    const modelos = Object.keys(db).filter(key => key !== 'sequelize' && key !== 'Sequelize');
    modelos.forEach(modelo => {
      console.log(`   ✓ ${modelo}`);
    });
    console.log();

    // Prueba 3: Sincronización
    console.log('3️⃣  Sincronizando modelos con BD (sin cambios)...');
    await db.sequelize.sync();
    console.log('   ✓ Sincronización completada\n');

    // Prueba 4: Información de tablas
    console.log('4️⃣  Tablas en la BD:');
    const queryInterface = db.sequelize.getQueryInterface();
    const tablas = await queryInterface.showAllTables();
    if (tablas.length > 0) {
      tablas.forEach(tabla => {
        console.log(`   ✓ ${tabla}`);
      });
    } else {
      console.log('   ℹ️  No hay tablas. Corre las migraciones: npx sequelize-cli db:migrate');
    }
    console.log();

    console.log('╔════════════════════════════════════════════╗');
    console.log('║   ✓ TODAS LAS PRUEBAS PASARON            ║');
    console.log('╚════════════════════════════════════════════╝\n');

    process.exit(0);
  } catch (error) {
    console.error('\n╔════════════════════════════════════════════╗');
    console.error('║   ✗ ERROR EN LA PRUEBA                   ║');
    console.error('╚════════════════════════════════════════════╝\n');
    
    console.error('❌ Error:', error.message);
    if (error.code) console.error('   Código:', error.code);
    if (error.sql) console.error('   SQL:', error.sql);
    if (error.errno) console.error('   errno:', error.errno);
    
    console.error('\n💡 Soluciones posibles:');
    console.error('   1. Verifica que MySQL esté ejecutándose');
    console.error('   2. Verifica las credenciales en .env');
    console.error('   3. Verifica que la BD "tienda_virtual" existe');
    console.error('   4. Verifica que el usuario "root" existe y tiene permisos');
    console.error();

    process.exit(1);
  }
}

testConnection();
