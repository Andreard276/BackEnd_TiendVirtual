// 🎯 EJEMPLOS DE CONSUMO DE LA API - FRONTEND

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// ==========================================
// 🔑 AUTENTICACIÓN
// ==========================================

// 📝 REGISTRO DE USUARIO
async function registrarUsuario(datosUsuario) {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: datosUsuario.nombre,
        direccion: datosUsuario.direccion,
        telefono: datosUsuario.telefono,
        email: datosUsuario.email,
        password: datosUsuario.password,
        rol: 'cliente' // o 'administrador'
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Usuario registrado:', data);
      return data;
    } else {
      console.error('❌ Error en registro:', data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    throw error;
  }
}

// 🔐 LOGIN
async function loginUsuario(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar token en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      console.log('✅ Login exitoso:', data.usuario);
      return data;
    } else {
      console.error('❌ Error en login:', data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    throw error;
  }
}

// 🚪 LOGOUT
function logoutUsuario() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  console.log('✅ Sesión cerrada');
}

// 🔧 OBTENER TOKEN GUARDADO
function getToken() {
  return localStorage.getItem('token');
}

// 🔧 OBTENER USUARIO GUARDADO
function getUsuario() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

// ==========================================
// 📂 CATEGORÍAS
// ==========================================

// 📋 OBTENER TODAS LAS CATEGORÍAS
async function obtenerCategorias() {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias`);

    if (!response.ok) {
      throw new Error('Error al obtener categorías');
    }

    const categorias = await response.json();
    console.log('📂 Categorías:', categorias);
    return categorias;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

// ==========================================
// 🛍️ PRODUCTOS
// ==========================================

// 📋 OBTENER TODOS LOS PRODUCTOS
async function obtenerProductos() {
  try {
    const response = await fetch(`${API_BASE_URL}/productos`);

    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }

    const productos = await response.json();
    console.log('🛍️ Productos:', productos);
    return productos;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

// 👀 OBTENER PRODUCTO POR ID
async function obtenerProductoPorId(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`);

    if (!response.ok) {
      throw new Error('Producto no encontrado');
    }

    const producto = await response.json();
    console.log('📦 Producto:', producto);
    return producto;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

// ==========================================
// 🛒 CARRITO
// ==========================================

// 📋 OBTENER CARRITOS (requiere autenticación)
async function obtenerCarritos() {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_BASE_URL}/carritos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener carritos');
    }

    const carritos = await response.json();
    console.log('🛒 Carritos:', carritos);
    return carritos;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

// ➕ CREAR CARRITO PARA UN USUARIO
async function crearCarrito(idUsuario) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_BASE_URL}/carritos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id_usuario: idUsuario,
        total: 0
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Carrito creado:', data);
      return data;
    } else {
      console.error('❌ Error al crear carrito:', data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    throw error;
  }
}

// ➕ AGREGAR PRODUCTO AL CARRITO
async function agregarProductoAlCarrito(idCarrito, idProducto, precio, cantidad = 1) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_BASE_URL}/carrito-detalles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id_carrito: idCarrito,
        id_producto: idProducto,
        precio_unitario: precio,
        cantidad: cantidad
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Producto agregado al carrito:', data);
      return data;
    } else {
      console.error('❌ Error al agregar producto:', data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    throw error;
  }
}

// ==========================================
// 🎯 EJEMPLOS DE USO
// ==========================================

// Ejemplo 1: Registro + Login + Crear Carrito
async function ejemploCompleto() {
  try {
    // 1. Registrar usuario
    const nuevoUsuario = await registrarUsuario({
      nombre: 'Ana García',
      direccion: 'Avenida Central 456',
      telefono: '+56987654321',
      email: 'ana.garcia@email.com',
      password: 'password123'
    });

    // 2. Hacer login
    const loginData = await loginUsuario('ana.garcia@email.com', 'password123');

    // 3. Crear carrito
    const carrito = await crearCarrito(loginData.usuario.id);

    // 4. Obtener productos disponibles
    const productos = await obtenerProductos();

    // 5. Agregar un producto al carrito
    if (productos.length > 0) {
      await agregarProductoAlCarrito(
        carrito.id,
        productos[0].id,
        productos[0].precio,
        1
      );
    }

    console.log('🎉 ¡Flujo completo exitoso!');

  } catch (error) {
    console.error('❌ Error en el flujo:', error);
  }
}

// Ejemplo 2: Login con usuario existente y ver productos
async function ejemploLoginYProductos() {
  try {
    // Login con usuario de prueba
    await loginUsuario('juan.perez@email.com', 'password123');

    // Obtener categorías
    const categorias = await obtenerCategorias();

    // Obtener productos
    const productos = await obtenerProductos();

    console.log('📊 Datos obtenidos:');
    console.log('📂 Categorías:', categorias.length);
    console.log('🛍️ Productos:', productos.length);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// ==========================================
// 💡 EXPORTAR FUNCIONES PARA USAR EN TU FRONTEND
// ==========================================

// Para usar en tu aplicación React/Vue/Angular:
// export {
//   registrarUsuario,
//   loginUsuario,
//   logoutUsuario,
//   getToken,
//   getUsuario,
//   obtenerCategorias,
//   obtenerProductos,
//   obtenerProductoPorId,
//   obtenerCarritos,
//   crearCarrito,
//   agregarProductoAlCarrito,
//   ejemploCompleto,
//   ejemploLoginYProductos
// };
