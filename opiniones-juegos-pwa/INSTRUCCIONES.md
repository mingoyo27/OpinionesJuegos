# 🚀 Instrucciones de Uso

## Para ejecutar el proyecto:

1. Abre una terminal en la carpeta del proyecto
2. Ejecuta:
   ```bash
   npm run dev
   ```
3. Abre tu navegador en `http://localhost:5173`

## Flujo de uso:

1. **Landing Page**: Verás la página de inicio con opciones de Login o Registro
2. **Registro**: Crea una cuenta nueva con usuario y contraseña
3. **Login**: Inicia sesión con tus credenciales
4. **Dashboard**: Una vez dentro, podrás:
   - Ver todas las opiniones de juegos
   - Crear nueva opinión (botón "➕ Nueva Opinión")
   - Editar opiniones existentes (botón "✏️ Editar")
   - Eliminar opiniones (botón "🗑️ Eliminar")
   - Cerrar sesión

## Características especiales:

### Modo Offline
- Desconecta tu internet y la app seguirá funcionando
- Podrás ver las opiniones cacheadas
- Aparecerá un banner naranja indicando modo offline
- Las acciones de crear/editar/eliminar se deshabilitarán

### Sistema de Calificación
- Califica juegos de 0 a 5 estrellas
- Puedes usar decimales (ej: 4.5)
- Las estrellas se muestran visualmente

## Notas importantes:

- La sesión se mantiene incluso si cierras el navegador (localStorage)
- Las opiniones se cachean automáticamente para uso offline
- Todos los datos se guardan en la base de datos Turso

## Para producción:

1. Construir la aplicación:
   ```bash
   npm run build
   ```

2. Los archivos estarán en la carpeta `dist/`

3. Necesitarás crear iconos PWA:
   - `icon-192.png` (192x192 px)
   - `icon-512.png` (512x512 px)
   - Colócalos en la carpeta `public/`

4. Servir sobre HTTPS para que el Service Worker funcione correctamente
