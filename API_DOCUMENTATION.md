# 🛍️ API REST - Tienda Virtual

**Base URL:** `http://localhost:8000`

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Incluye el token en el header de las peticiones:

```
Authorization: Bearer <tu_token_jwt>
```

---

## 👤 USUARIOS

### 📝 Registro de Usuario
**POST** `/api/usuarios`

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "direccion": "Calle Principal 123, Ciudad",
  "telefono": "+56912345678",
  "email": "juan.perez@email.com",
  "password": "tu_password",
  "rol": "cliente"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "direccion": "Calle Principal 123, Ciudad",
  "telefono": "+56912345678",
  "email": "juan.perez@email.com",
  "rol": "cliente",
  "fecha_registro": "2024-01-15T10:30:00.000Z"
}
```

### 🔑 Login
**POST** `/api/login`

**Body:**
```json
{
  "email": "juan.perez@email.com",
  "password": "tu_password"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan.perez@email.com",
    "rol": "cliente"
  }
}
```

### 📋 Listar Usuarios
**GET** `/api/usuarios`
- **Requiere autenticación**

### 👀 Obtener Usuario por ID
**GET** `/api/usuarios/:id`
- **Requiere autenticación**

### ✏️ Actualizar Usuario
**PUT** `/api/usuarios/:id`
- **Requiere autenticación**

### 🗑️ Eliminar Usuario
**DELETE** `/api/usuarios/:id`
- **Requiere autenticación**

---

## 📂 CATEGORÍAS

### ➕ Crear Categoría
**POST** `/api/categorias`

**Body:**
```json
{
  "nombre": "Electrónicos"
}
```

### 📋 Listar Categorías
**GET** `/api/categorias`

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Electrónicos",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### 👀 Obtener Categoría por ID
**GET** `/api/categorias/:id`

### ✏️ Actualizar Categoría
**PUT** `/api/categorias/:id`

### 🗑️ Eliminar Categoría
**DELETE** `/api/categorias/:id`

---

## 🛍️ PRODUCTOS

### ➕ Crear Producto
**POST** `/api/productos`

**Body:**
```json
{
  "nombre": "Smartphone Samsung Galaxy A54",
  "descripcion": "Smartphone Android con pantalla AMOLED",
  "precio": 299.99,
  "stock": 25,
  "id_categorias": 1
}
```

### 📋 Listar Productos
**GET** `/api/productos`

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Smartphone Samsung Galaxy A54",
    "descripcion": "Smartphone Android con pantalla AMOLED de 6.4\"",
    "precio": "299.99",
    "stock": 25,
    "id_categorias": 1,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### 👀 Obtener Producto por ID
**GET** `/api/productos/:id`

### ✏️ Actualizar Producto
**PUT** `/api/productos/:id`

### 🗑️ Eliminar Producto
**DELETE** `/api/productos/:id`

---

## 🛒 CARRITOS

### ➕ Crear Carrito
**POST** `/api/carritos`

**Body:**
```json
{
  "id_usuario": 1,
  "total": 0
}
```

### 📋 Listar Carritos
**GET** `/api/carritos`

### 👀 Obtener Carrito por ID
**GET** `/api/carritos/:id`

### ✏️ Actualizar Carrito
**PUT** `/api/carritos/:id`

### 🗑️ Eliminar Carrito
**DELETE** `/api/carritos/:id`

---

## 📦 DETALLES DE CARRITO

### ➕ Agregar Producto al Carrito
**POST** `/api/carrito-detalles`

**Body:**
```json
{
  "id_carrito": 1,
  "id_producto": 1,
  "precio_unitario": 299.99,
  "cantidad": 1
}
```

### 📋 Listar Detalles de Carrito
**GET** `/api/carrito-detalles`

### 👀 Obtener Detalle por ID
**GET** `/api/carrito-detalles/:id`

### ✏️ Actualizar Detalle
**PUT** `/api/carrito-detalles/:id`

### 🗑️ Eliminar Detalle
**DELETE** `/api/carrito-detalles/:id`

---

## 🔑 CREDENCIALES DE PRUEBA

### Administrador
- **Email:** `admin@tiendavirtual.com`
- **Password:** `cliente123`

### Clientes
- **Email:** `juan.perez@email.com` | **Password:** `password123`
- **Email:** `maria.gonzalez@email.com` | **Password:** `admin123`

---

## 🚀 INICIAR SERVIDOR

```bash
npm start
```

El servidor se ejecutará en: `http://localhost:8000`

---

## 📝 NOTAS IMPORTANTES

1. **CORS habilitado** para todas las peticiones
2. **JWT tokens** expiran en 24 horas
3. **Passwords** se hashean automáticamente al registrar usuarios
4. **Base de datos** ya poblada con datos de ejemplo
5. **Puerto:** 8000 (configurable via variable `APP_PORT`)