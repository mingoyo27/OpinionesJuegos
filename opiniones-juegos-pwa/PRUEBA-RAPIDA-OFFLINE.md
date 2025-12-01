# ⚡ Prueba Rápida - Funcionalidad Offline

## 🎯 Prueba en 5 Minutos

### 1️⃣ Preparación (30 segundos)
```
✓ Servidor corriendo en http://localhost:5173
✓ Abre la app en el navegador
✓ Inicia sesión con cualquier usuario
✓ Crea 1-2 opiniones para tener datos
```

### 2️⃣ Activar Modo Offline (10 segundos)
```
✓ Presiona F12 (DevTools)
✓ Ve a pestaña "Network"
✓ Selecciona "Offline" en el dropdown
✓ Verás banner naranja: "Modo offline"
```

### 3️⃣ Probar Operaciones Offline (2 minutos)

#### Crear Opinión
```
1. Click en "➕ Nueva Opinión (Offline)"
2. Nombre: "Zelda"
3. Descripción: "Aventura épica"
4. Opinión: "Increíble juego"
5. Calificación: 5
6. Click "Crear Opinión"
✅ Aparece inmediatamente en la lista
```

#### Editar Opinión
```
1. Click en "✏️ Editar (Offline)" en cualquier opinión
2. Cambia la calificación a 4
3. Click "Actualizar Opinión"
✅ Cambios visibles inmediatamente
```

#### Eliminar Opinión
```
1. Click en "🗑️ Eliminar (Offline)" en cualquier opinión
2. Confirma la eliminación
✅ Desaparece de la lista
```

### 4️⃣ Ver Notificaciones (30 segundos)
```
1. Click en "🔔 Notificaciones"
2. Verás badge rojo con número (ej: 3)
3. Panel se abre desde la derecha
4. Verás 3 notificaciones con estado "⏳ En espera"
5. Banner naranja: "⏳ 3 acciones pendientes"
```

### 5️⃣ Sincronizar (1 minuto)
```
1. En DevTools, cambia "Offline" → "Online"
2. Espera 2-3 segundos
3. ✅ Notificaciones cambian a "✅ Completado"
4. ✅ Badge desaparece
5. Recarga la página (F5)
6. ✅ Todos los cambios persisten
```

## 🎬 Video Mental del Flujo

```
Usuario sin internet
    ↓
Crea opinión "Zelda" → Aparece en lista
    ↓
Edita opinión → Cambios visibles
    ↓
Elimina opinión → Desaparece
    ↓
Abre notificaciones → Ve 3 pendientes
    ↓
Reconecta internet
    ↓
¡MAGIA! → Todo se sincroniza
    ↓
Notificaciones: ✅ ✅ ✅
```

## 🔍 Qué Observar

### En Modo Offline
- ✅ Banner naranja visible
- ✅ Botones dicen "(Offline)"
- ✅ Badge rojo con número
- ✅ Cambios inmediatos en UI
- ✅ Notificaciones "En espera"

### Al Reconectar
- ✅ Banner desaparece
- ✅ Botones sin "(Offline)"
- ✅ Badge desaparece
- ✅ Notificaciones "Completado"
- ✅ Datos persisten al recargar

## 🐛 Si Algo No Funciona

### Problema: No aparece el banner offline
```
Solución: Asegúrate de estar en "Offline" en DevTools
```

### Problema: No se sincronizan las acciones
```
Solución: 
1. Verifica que estés "Online" en DevTools
2. Espera 3-5 segundos
3. Abre consola (F12) y busca errores
```

### Problema: Badge no aparece
```
Solución: Recarga la página después de crear acciones offline
```

## 📸 Capturas Esperadas

### Vista Normal
```
┌────────────────────────────────────┐
│ 🎮 Opiniones  [🔔] 👤 user [Salir]│
├────────────────────────────────────┤
│ [➕ Nueva Opinión]                 │
│                                    │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ Zelda        │ │ Mario        │ │
│ │ ⭐⭐⭐⭐⭐   │ │ ⭐⭐⭐⭐     │ │
│ └──────────────┘ └──────────────┘ │
└────────────────────────────────────┘
```

### Vista Offline
```
┌────────────────────────────────────┐
│ 🎮 Opiniones [🔔③] 👤 user [Salir]│
├────────────────────────────────────┤
│ ⚠️ Modo offline - Datos en caché  │
├────────────────────────────────────┤
│ [➕ Nueva Opinión (Offline)]       │
│                                    │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ Zelda        │ │ Mario        │ │
│ │ [✏️ Editar]  │ │ [✏️ Editar]  │ │
│ │ [🗑️ Eliminar]│ │ [🗑️ Eliminar]│ │
│ └──────────────┘ └──────────────┘ │
└────────────────────────────────────┘
```

### Panel de Notificaciones
```
┌─────────────────────────┐
│ 🔔 Notificaciones  [✕] │
├─────────────────────────┤
│ ⏳ 3 acciones pendientes│
├─────────────────────────┤
│ ➕ Crear: "Zelda"       │
│ ⏳ En espera            │
│ Hace 2 min              │
├─────────────────────────┤
│ ✏️ Actualizar: "Mario" │
│ ⏳ En espera            │
│ Hace 1 min              │
├─────────────────────────┤
│ 🗑️ Eliminar opinión     │
│ ⏳ En espera            │
│ Hace un momento         │
└─────────────────────────┘
```

## ✅ Checklist de Prueba

- [ ] Banner offline aparece
- [ ] Puedo crear opinión offline
- [ ] Puedo editar opinión offline
- [ ] Puedo eliminar opinión offline
- [ ] Badge muestra número correcto
- [ ] Panel de notificaciones se abre
- [ ] Notificaciones muestran "En espera"
- [ ] Al reconectar, se sincronizan
- [ ] Notificaciones cambian a "Completado"
- [ ] Badge desaparece
- [ ] Cambios persisten al recargar

## 🎉 Si Todo Funciona

**¡Felicidades! Tienes una PWA completamente funcional offline.**

Ahora puedes:
- ✅ Usar la app sin internet
- ✅ Ver el estado de tus acciones
- ✅ Confiar en que todo se sincronizará
- ✅ Tener una experiencia fluida

## 📚 Más Información

- **Documentación completa**: `FUNCIONALIDAD-OFFLINE-AVANZADA.md`
- **Resumen técnico**: `RESUMEN-OFFLINE-AVANZADO.md`
- **Código fuente**: `src/services/syncQueue.js`

---

**¡Disfruta tu PWA offline!** 🚀
