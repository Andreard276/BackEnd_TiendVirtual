// ⚙️ CONFIGURACIÓN PARA CONECTAR FRONTEND CON BACKEND

// Configuración de la API
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  ENDPOINTS: {
    // Autenticación
    LOGIN: '/login',
    REGISTER: '/usuarios',

    // Usuarios
    USERS: '/usuarios',

    // Categorías
    CATEGORIES: '/categorias',

    // Productos
    PRODUCTS: '/productos',

    // Carritos
    CARTS: '/carritos',
    CART_DETAILS: '/carrito-detalles'
  }
};

// Clase para manejar la API
class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  // Método auxiliar para obtener headers con token
  getHeaders(includeAuth = false) {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (includeAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Método auxiliar para hacer peticiones
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: this.getHeaders(options.auth),
        ...options
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }

      return data;
    } catch (error) {
      console.error(`❌ Error en ${endpoint}:`, error);
      throw error;
    }
  }

  // ==========================================
  // 🔐 AUTENTICACIÓN
  // ==========================================

  async login(email, password) {
    const data = await this.request(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    // Guardar token y usuario
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));

    return data;
  }

  async register(userData) {
    return await this.request(API_CONFIG.ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsuario() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  // ==========================================
  // 📂 CATEGORÍAS
  // ==========================================

  async getCategories() {
    return await this.request(API_CONFIG.ENDPOINTS.CATEGORIES);
  }

  async getCategory(id) {
    return await this.request(`${API_CONFIG.ENDPOINTS.CATEGORIES}/${id}`);
  }

  // ==========================================
  // 🛍️ PRODUCTOS
  // ==========================================

  async getProducts() {
    return await this.request(API_CONFIG.ENDPOINTS.PRODUCTS);
  }

  async getProduct(id) {
    return await this.request(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
  }

  async createProduct(productData) {
    return await this.request(API_CONFIG.ENDPOINTS.PRODUCTS, {
      method: 'POST',
      auth: true,
      body: JSON.stringify(productData)
    });
  }

  async updateProduct(id, productData) {
    return await this.request(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(productData)
    });
  }

  async deleteProduct(id) {
    return await this.request(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, {
      method: 'DELETE',
      auth: true
    });
  }

  // ==========================================
  // 🛒 CARRITOS
  // ==========================================

  async getCarts() {
    return await this.request(API_CONFIG.ENDPOINTS.CARTS, { auth: true });
  }

  async getCart(id) {
    return await this.request(`${API_CONFIG.ENDPOINTS.CARTS}/${id}`, { auth: true });
  }

  async createCart(cartData) {
    return await this.request(API_CONFIG.ENDPOINTS.CARTS, {
      method: 'POST',
      auth: true,
      body: JSON.stringify(cartData)
    });
  }

  async updateCart(id, cartData) {
    return await this.request(`${API_CONFIG.ENDPOINTS.CARTS}/${id}`, {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(cartData)
    });
  }

  // ==========================================
  // 📦 DETALLES DE CARRITO
  // ==========================================

  async getCartDetails() {
    return await this.request(API_CONFIG.ENDPOINTS.CART_DETAILS, { auth: true });
  }

  async addToCart(cartDetailData) {
    return await this.request(API_CONFIG.ENDPOINTS.CART_DETAILS, {
      method: 'POST',
      auth: true,
      body: JSON.stringify(cartDetailData)
    });
  }

  async updateCartDetail(id, detailData) {
    return await this.request(`${API_CONFIG.ENDPOINTS.CART_DETAILS}/${id}`, {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(detailData)
    });
  }

  async removeFromCart(id) {
    return await this.request(`${API_CONFIG.ENDPOINTS.CART_DETAILS}/${id}`, {
      method: 'DELETE',
      auth: true
    });
  }
}

// ==========================================
// 🎯 INSTANCIA GLOBAL DE LA API
// ==========================================

const api = new ApiService();

// ==========================================
// 💡 FUNCIONES DE UTILIDAD
// ==========================================

// Verificar si el usuario está autenticado
function isAuthenticated() {
  const token = api.getToken();
  return !!token;
}

// Obtener usuario actual
function getCurrentUser() {
  return api.getUsuario();
}

// Logout helper
function logout() {
  api.logout();
  // Redirigir a login o actualizar UI
  window.location.href = '/login';
}

// ==========================================
// 🚀 EJEMPLO DE USO EN REACT/VUE
// ==========================================

/*
// En tu componente de Login:
import { api } from './api-service.js';

async function handleLogin(email, password) {
  try {
    const result = await api.login(email, password);
    console.log('Login exitoso:', result.usuario);
    // Redirigir a dashboard
  } catch (error) {
    console.error('Error en login:', error);
  }
}

// En tu componente de Productos:
async function loadProducts() {
  try {
    const products = await api.getProducts();
    setProducts(products);
  } catch (error) {
    console.error('Error cargando productos:', error);
  }
}

// En tu componente de Carrito:
async function addToCart(productId, price, quantity = 1) {
  try {
    const user = api.getUsuario();
    if (!user) return;

    // Primero obtener o crear carrito del usuario
    let carts = await api.getCarts();
    let userCart = carts.find(cart => cart.id_usuario === user.id);

    if (!userCart) {
      userCart = await api.createCart({ id_usuario: user.id, total: 0 });
    }

    // Agregar producto al carrito
    await api.addToCart({
      id_carrito: userCart.id,
      id_producto: productId,
      precio_unitario: price,
      cantidad: quantity
    });

    console.log('Producto agregado al carrito');
  } catch (error) {
    console.error('Error agregando al carrito:', error);
  }
}
*/

// Exportar para usar en otros archivos
// export { api, API_CONFIG, isAuthenticated, getCurrentUser, logout };
