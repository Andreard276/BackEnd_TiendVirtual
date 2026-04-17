## 🔧 GUÍA DE TROUBLESHOOTING - Servidor Node.js

### Cambios Realizados

Se han corregido los siguientes problemas críticos:

#### 1. ✅ app.js - Sincronización de Sequelize
**Problema**: El servidor iniciaba sin sincronizar los modelos ni la BD
**Solución**: Agregado:
- Importación de modelos de Sequelize
- Autenticación a la BD antes de iniciar servidor
- Sincronización de tablas con `db.sequelize.sync()`
- Logging detallado de errores

#### 2. ✅ config.js - Configuración Multi-Entorno
**Problema**: Solo había configuración para desarrollo
**Solución**: Agregadas configuraciones para:
- `development` (con logging)
- `test` (sin logging)
- `production` (sin logging, sin credenciales hardcodeadas)

---

## 🚀 INICIAR EL SERVIDOR CORRECTAMENTE

### Prerequisitos
```bash
# 1. Instalar dependencias (si no lo has hecho)
npm install

# 2. Verificar que MySQL está ejecutándose
# En Windows, abre Services y verifica "MySQL80" o similar
```

### Pasos para iniciar

```bash
# 3. Verificar la conexión a BD ANTES de iniciar el servidor
node test-db-connection.js

# 4. Si la conexión es exitosa, inicia el servidor
npm start
```

---

## ✅ VERIFICAR CONEXIÓN A BD

### Script de Test

```bash
node test-db-connection.js
```

Este script verifica:
1. ✓ Autenticación a MySQL
2. ✓ Modelos cargados correctamente
3. ✓ Sincronización de tablas
4. ✓ Tablas existentes en la BD

### Salida Esperada
```
✓ Autenticación exitosa
✓ Modelos cargados: tbc_usuario, tbc_categorias, etc.
✓ Sincronización completada
✓ Tablas: tbc_usuarios, tbc_categorias, tbb_productos, etc.
```

---

## 🐛 SOLUCIONAR ERRORES COMUNES

### ❌ "connect ECONNREFUSED 127.0.0.1:3306"
**Causa**: MySQL no está ejecutándose
**Soluciones**:
```bash
# Windows - Verificar servicio
wmic service list brief | find "MySQL"

# Windows - Iniciar servicio MySQL
net start MySQL80
# O usar Services (services.msc) e iniciar "MySQL80" manualmente

# Linux/Mac
sudo systemctl start mysql
# O
brew services start mysql
```

### ❌ "Access denied for user 'root'@'localhost'"
**Causa**: Contraseña incorrecta o usuario no existe
**Soluciones**:
```bash
# Conectarse a MySQL directamente
mysql -u root -p

# Si no tiene contraseña (presionar Enter)
# Dentro de MySQL, crear usuario si es necesario:
CREATE USER 'root'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

# Verificar DB existe
SHOW DATABASES;
CREATE DATABASE IF NOT EXISTS tienda_virtual;
```

### ❌ "database "tienda_virtual" doesn't exist"
**Causa**: BD no creada
**Soluciones**:
```bash
# Conectarse a MySQL
mysql -u root -p

# Crear BD
CREATE DATABASE tienda_virtual;
EXIT;

# Volver a ejecutar test
node test-db-connection.js
```

### ❌ "PROTOCOL_CONNECTION_LOST" o "ECONNREFUSED"
**Causa**: Conexión perdida durante operación
**Soluciones**:
1. Aumentar timeout en config.js
2. Verificar que MySQL tiene suficientes conexiones
3. Reiniciar MySQL

```bash
# En config.js, agregar:
{
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
```

---

## 📝 PROBAR ENDPOINTS

### Crear Usuario
```powershell
$body = @{
    nombre="Ricardo"
    direccion="Calle 123"
    telefono="3101234567"
    email="ricardo@gmail.com"
    password="1234"
    fecha_registro="2025-04-17"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/api/usuarios" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

### Listar Usuarios
```bash
curl http://localhost:8000/api/usuarios
```

### Obtener Usuario
```bash
curl http://localhost:8000/api/usuarios/1
```

---

## 🔍 DEBUGGING AVANZADO

### Ver logs de SQL
En `app.js`, el logging ya está habilitado en desarrollo:
```javascript
logging: console.log  // En config/config.js línea 7
```

### Ver todo lo que hace Sequelize
```javascript
// Agregar en app.js después de requerir modelos:
db.sequelize.addHook('beforeConnect', () => {
  console.log('🔌 Conectando a BD...');
});
```

### Usar debugger de Node
```bash
# Iniciar con debugger
node --inspect app.js

# Luego abrir en Chrome: chrome://inspect
```

---

## 📌 RESUMEN DE CAMBIOS

| Archivo | Cambio | Razón |
|---------|--------|-------|
| app.js | Agregar sincronización de Sequelize | Servidor estaba iniciando sin conectarse a BD |
| config.js | Multi-entorno + valores por defecto | Mejor manejo de configuración |
| test-db-connection.js | Crear script de diagnóstico | Herramienta para verificar BD |

---

## ✨ Recomendaciones

1. **Siempre ejecutar test-db-connection.js antes de `npm start`**
2. **Revisar logs en desarrollo** para entender qué está pasando
3. **Usar un cliente MySQL** (MySQL Workbench, DBeaver) para verificar tablas directamente
4. **Revisar event logs de Windows** si hay problemas con MySQL

