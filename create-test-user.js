const bcrypt = require('bcrypt');
require('dotenv').config();
const db = require('./models');

async function createTestUser() {
  try {
    await db.sequelize.authenticate();
    console.log('✓ Conectado a la BD');
    
    // Generar contraseña hasheada
    const password = 'TiendaVirtual2026';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear usuario con todos los campos requeridos
    const usuario = await db.tbc_usuario.create({
      nombre: 'Tienda Virtual',
      email: 'tiendavirtual@gmail.com',
      password: hashedPassword,
      direccion: 'Calle Principal 123',
      telefono: '+1234567890'
    });
    
    console.log('\n✅ Usuario creado exitosamente');
    console.log('═════════════════════════════════════');
    console.log('Nombre:', usuario.nombre);
    console.log('Email:', usuario.email);
    console.log('Dirección:', usuario.direccion);
    console.log('Teléfono:', usuario.telefono);
    console.log('ID:', usuario.id);
    console.log('═════════════════════════════════════\n');
    console.log('Ahora puedes hacer login con:');
    console.log('  Email: tiendavirtual@gmail.com');
    console.log('  Password: TiendaVirtual2026');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

createTestUser();
