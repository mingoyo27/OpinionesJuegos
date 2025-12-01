# 🔧 Instrucciones para Actualizar la Base de Datos

## Cambios Necesarios

Se necesita agregar dos columnas a la tabla `opiniones_juegos`:
- `usuario_id` (INTEGER) - ID del usuario que creó la opinión
- `usuario_nombre` (TEXT) - Nombre del usuario que creó la opinión

## Opción 1: Recrear la tabla (Si está vacía o puedes perder los datos)

Ejecuta estos comandos en Turso CLI:

```bash
turso db shell opinionesjuegos-mingoyo27
```

Luego ejecuta:

```sql
DROP TABLE IF EXISTS opiniones_juegos;

CREATE TABLE opiniones_juegos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR,
  descripcion VARCHAR,
  opinion VARCHAR,
  calificacion DOUBLE,
  usuario_id INTEGER NOT NULL,
  usuario_nombre TEXT NOT NULL
);
```

## Opción 2: Agregar columnas (Si quieres mantener datos existentes)

```sql
ALTER TABLE opiniones_juegos ADD COLUMN usuario_id INTEGER;
ALTER TABLE opiniones_juegos ADD COLUMN usuario_nombre TEXT;

-- Actualizar registros existentes con un usuario por defecto
UPDATE opiniones_juegos 
SET usuario_id = 1, usuario_nombre = 'admin' 
WHERE usuario_id IS NULL;
```

## Opción 3: Usar la interfaz web de Turso

1. Ve a https://turso.tech/
2. Inicia sesión
3. Selecciona tu base de datos `opinionesjuegos-mingoyo27`
4. Ve a la sección SQL
5. Ejecuta uno de los scripts de arriba

## Verificar los cambios

Después de actualizar, verifica que la tabla tenga las nuevas columnas:

```sql
PRAGMA table_info(opiniones_juegos);
```

Deberías ver:
- id
- nombre
- descripcion
- opinion
- calificacion
- usuario_id
- usuario_nombre

## ¿Qué hace esto?

Con estos cambios:
- ✅ Cada opinión guardará quién la creó
- ✅ Se mostrará el nombre del usuario en cada opinión
- ✅ Solo el creador podrá editar/eliminar su opinión
- ✅ Otros usuarios solo podrán ver las opiniones

## Después de actualizar la BD

Una vez actualizada la base de datos, la aplicación funcionará automáticamente con las nuevas características.
