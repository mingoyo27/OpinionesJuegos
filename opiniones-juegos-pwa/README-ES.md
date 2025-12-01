# 🎮 Opiniones de Juegos - PWA

Aplicación web progresiva (PWA) para compartir y descubrir opiniones sobre videojuegos.

## ✨ Características Implementadas

### ✅ Requisitos de la Rúbrica

1. **Iconos y colores personalizados** ✓
   - Paleta de colores personalizada (gradiente púrpura/azul)
   - Iconos emoji integrados en toda la aplicación
   - Tema visual consistente

2. **Landing page personalizada** ✓
   - Página de inicio atractiva con gradiente
   - Tarjetas de características
   - Botones de navegación a login/registro

3. **Login (+4 puntos)** ✓
   - Sistema completo de autenticación
   - Registro de nuevos usuarios
   - Inicio de sesión con validación
   - Persistencia de sesión con localStorage

4. **1 Módulo con 3 letras CRUD** ✓
   - **Create**: Crear nuevas opiniones de juegos
   - **Read**: Ver lista de todas las opiniones
   - **Update**: Editar opiniones existentes
   - **Delete**: Eliminar opiniones

5. **1 función en 1 letra CRUD que utilice localStorage o IndexedDB** ✓
   - La función **Read** utiliza localStorage para cachear opiniones
   - Permite ver opiniones en modo offline
   - Cache automático al cargar datos desde Turso

6. **Funcionar sin conexión** ✓
   - Service Worker registrado
   - Detección de estado online/offline
   - Banner de modo offline
   - Cache de opiniones en localStorage
   - Deshabilitación de acciones de escritura en modo offline

## 🚀 Tecnologías Utilizadas

- **React** - Framework web
- **Vite** - Build tool
- **Turso (libSQL)** - Base de datos
- **localStorage** - Cache offline
- **Service Worker** - PWA capabilities

## 📦 Instalación

El proyecto ya está instalado. Para ejecutarlo:

```bash
cd opiniones-juegos-pwa
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🗄️ Base de Datos

### Tabla: usuarios
- id (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- usuario (TEXT, NOT NULL, UNIQUE)
- contrasena (TEXT, NOT NULL)

### Tabla: opiniones_juegos
- id (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- nombre (VARCHAR) - Nombre del juego
- descripcion (VARCHAR) - Descripción breve
- opinion (VARCHAR) - Opinión detallada
- calificacion (DOUBLE) - Calificación de 0 a 5

## 📱 Funcionalidades

### Autenticación
- Registro de nuevos usuarios
- Login con validación
- Persistencia de sesión
- Cierre de sesión

### Gestión de Opiniones (CRUD Completo)
- **Crear**: Formulario para agregar nuevas opiniones con nombre, descripción, opinión y calificación
- **Leer**: Lista de todas las opiniones con sistema de estrellas
- **Actualizar**: Editar opiniones existentes
- **Eliminar**: Borrar opiniones con confirmación

### Modo Offline
- Cache automático de opiniones en localStorage
- Detección de conexión
- Banner informativo cuando está offline
- Visualización de datos cacheados sin conexión
- Deshabilitación de operaciones de escritura offline

## 🎨 Personalización

### Colores
- Primario: #667eea (Azul/Púrpura)
- Secundario: #764ba2 (Púrpura)
- Gradiente: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

### Iconos
- 🎮 - Logo principal
- ⭐ - Sistema de calificación
- 📝 - Escribir opiniones
- 💬 - Leer reseñas
- 👤 - Usuario

## 📝 Notas Importantes

1. **Iconos PWA**: Los archivos `icon-192.png` e `icon-512.png` deben ser creados y colocados en la carpeta `public/` para que la PWA funcione completamente.

2. **HTTPS**: Para que el Service Worker funcione en producción, la aplicación debe servirse sobre HTTPS.

3. **Token de Turso**: El token de autenticación está incluido en el código. En producción, debería estar en variables de entorno.

## 🔧 Estructura del Proyecto

```
opiniones-juegos-pwa/
├── public/
│   ├── manifest.json          # Configuración PWA
│   └── sw.js                  # Service Worker
├── src/
│   ├── components/
│   │   ├── Landing.jsx        # Página de inicio
│   │   ├── Login.jsx          # Inicio de sesión
│   │   ├── Register.jsx       # Registro
│   │   ├── OpinionList.jsx    # Lista de opiniones
│   │   ├── OpinionForm.jsx    # Formulario CRUD
│   │   └── OpinionItem.jsx    # Tarjeta de opinión
│   ├── services/
│   │   ├── turso.js          # Conexión a base de datos
│   │   └── storage.js        # localStorage (cache offline)
│   ├── App.jsx               # Componente principal
│   └── main.jsx              # Punto de entrada
└── package.json
```

## ✅ Checklist de Requisitos

- [x] Iconos y colores personalizados
- [x] Landing page personalizada
- [x] Login (+4 puntos)
- [x] 1 Módulo con 3 letras CRUD (Create, Read, Update, Delete)
- [x] 1 función CRUD con localStorage (Read con cache)
- [x] Funcionar sin conexión (Service Worker + localStorage)

## 🎯 Puntos Adicionales Implementados

- Sistema de calificación con estrellas visuales
- Validación de formularios
- Mensajes de error y éxito
- Diseño responsive
- Animaciones y transiciones
- Confirmación antes de eliminar
- Detección automática de modo offline
- Cache inteligente con timestamp
