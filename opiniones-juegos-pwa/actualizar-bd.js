// Script para actualizar la base de datos automáticamente
import { createClient } from '@libsql/client';

const tursoClient = createClient({
  url: 'libsql://opinionesjuegos-mingoyo27.aws-eu-west-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NjcxNzM0ODUsImlhdCI6MTc2NDU4MTQ4NSwiaWQiOiIwNzRmMmY2Ny02NWZiLTRlZDctOTY0MS1lZjA1OWI5ZGQxMmUiLCJyaWQiOiIwMDVkYjEzMS0yMGNjLTQ1MjAtOWMxYi0yN2NiNDkwZDgxZTUifQ.Zz4PmZtx8JprVmJ7Lnu6MdNxo0PoAru6K8yoCSPZO8ezufkAtmICxfHBV_5O9laE3-dflMxFJCB8RU0A0bSQDA'
});

async function actualizarBaseDatos() {
  try {
    console.log('🔧 Actualizando base de datos...');
    
    // Opción 1: Recrear tabla (usa esto si la tabla está vacía)
    console.log('📋 Eliminando tabla antigua...');
    await tursoClient.execute('DROP TABLE IF EXISTS opiniones_juegos');
    
    console.log('📋 Creando tabla nueva con campos de usuario...');
    await tursoClient.execute(`
      CREATE TABLE opiniones_juegos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR,
        descripcion VARCHAR,
        opinion VARCHAR,
        calificacion DOUBLE,
        usuario_id INTEGER NOT NULL,
        usuario_nombre TEXT NOT NULL
      )
    `);
    
    console.log('✅ Base de datos actualizada exitosamente!');
    console.log('');
    console.log('Nuevos campos agregados:');
    console.log('  - usuario_id: ID del usuario que creó la opinión');
    console.log('  - usuario_nombre: Nombre del usuario');
    console.log('');
    console.log('Ahora puedes usar la aplicación con las nuevas funcionalidades.');
    
  } catch (error) {
    console.error('❌ Error al actualizar la base de datos:', error.message);
    console.log('');
    console.log('Si ya tienes datos y quieres mantenerlos, usa este SQL manualmente:');
    console.log('  ALTER TABLE opiniones_juegos ADD COLUMN usuario_id INTEGER;');
    console.log('  ALTER TABLE opiniones_juegos ADD COLUMN usuario_nombre TEXT;');
  }
}

actualizarBaseDatos();
