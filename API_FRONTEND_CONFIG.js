// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = {
  // Autenticación
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  // Usuarios
  registro: async (usuario) => {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    return response.json();
  },

  obtenerUsuarios: async () => {
    const response = await fetch(`${API_URL}/usuarios`);
    return response.json();
  },

  obtenerUsuario: async (id) => {
    const response = await fetch(`${API_URL}/usuarios/${id}`);
    return response.json();
  },

  actualizarUsuario: async (id, datos) => {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    return response.json();
  },

  eliminarUsuario: async (id) => {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Productos
  obtenerProductos: async () => {
    const response = await fetch(`${API_URL}/productos`);
    return response.json();
  },

  // Categorías
  obtenerCategorias: async () => {
    const response = await fetch(`${API_URL}/categorias`);
    return response.json();
  }
};
