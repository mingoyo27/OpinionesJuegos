-- Script para actualizar la base de datos
-- Ejecutar este SQL en Turso para agregar el campo usuario_id

-- Opción 1: Si la tabla está vacía o puedes recrearla
DROP TABLE IF EXISTS opiniones_juegos;
CREATE TABLE opiniones_juegos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR,
  descripcion VARCHAR,
  opinion VARCHAR,
  calificacion DOUBLE,
  usuario_id INTEGER NOT NULL,
  usuario_nombre TEXT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Opción 2: Si ya tienes datos y quieres mantenerlos
-- ALTER TABLE opiniones_juegos ADD COLUMN usuario_id INTEGER;
-- ALTER TABLE opiniones_juegos ADD COLUMN usuario_nombre TEXT;
-- UPDATE opiniones_juegos SET usuario_id = 1, usuario_nombre = 'admin' WHERE usuario_id IS NULL;
