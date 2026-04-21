require('dotenv').config();
const db = require('./models');

async function mostrarDatosEjemplo() {
  try {
    console.log('🌟 DATOS DE EJEMPLO INSERTADOS 🌟\n');

    // Mostrar categorías
    console.log('📂 CATEGORÍAS:');
    const categorias = await db.tbc_categorias.findAll();
    categorias.forEach(cat => {
      console.log(`   • ${cat.nombre}`);
    });

    // Mostrar usuarios
    console.log('\n👥 USUARIOS:');
    const usuarios = await db.tbc_usuario.findAll({ attributes: ['nombre', 'email', 'rol'] });
    usuarios.forEach(user => {
      console.log(`   • ${user.nombre} (${user.email}) - ${user.rol}`);
    });

    // Mostrar productos
    console.log('\n🛍️  PRODUCTOS:');
    const productos = await db.tbb_productos.findAll({
      include: [{ model: db.tbc_categorias, as: 'categoria', attributes: ['nombre'] }],
      limit: 5
    });
    productos.forEach(prod => {
      console.log(`   • ${prod.nombre} - $${prod.precio} (${prod.categoria.nombre})`);
    });

    // Mostrar carritos con detalles
    console.log('\n🛒 CARRITOS:');
    const carritos = await db.tbd_carrito.findAll({
      include: [
        { model: db.tbc_usuario, as: 'usuario', attributes: ['nombre'] },
        {
          model: db.tbd_carrito_detalle,
          as: 'detalles',
          include: [{ model: db.tbb_productos, as: 'producto', attributes: ['nombre', 'precio'] }]
        }
      ]
    });

    carritos.forEach(carrito => {
      console.log(`   🛒 Carrito de ${carrito.usuario.nombre} - Total: $${carrito.total}`);
      carrito.detalles.forEach(detalle => {
        console.log(`      • ${detalle.producto.nombre} x${detalle.cantidad} - $${detalle.precio_unitario} c/u`);
      });
    });

    console.log('\n✅ ¡Datos de ejemplo insertados correctamente!');
    console.log('🔐 Credenciales de prueba:');
    console.log('   Admin: admin@tiendavirtual.com / cliente123');
    console.log('   Cliente: juan.perez@email.com / password123');
    console.log('   Cliente: maria.gonzalez@email.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

mostrarDatosEjemplo();