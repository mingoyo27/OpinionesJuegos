import { createClient } from '@libsql/client';

const tursoClient = createClient({
  url: 'libsql://opinionesjuegos-mingoyo27.aws-eu-west-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NjcxNzM0ODUsImlhdCI6MTc2NDU4MTQ4NSwiaWQiOiIwNzRmMmY2Ny02NWZiLTRlZDctOTY0MS1lZjA1OWI5ZGQxMmUiLCJyaWQiOiIwMDVkYjEzMS0yMGNjLTQ1MjAtOWMxYi0yN2NiNDkwZDgxZTUifQ.Zz4PmZtx8JprVmJ7Lnu6MdNxo0PoAru6K8yoCSPZO8ezufkAtmICxfHBV_5O9laE3-dflMxFJCB8RU0A0bSQDA'
});

export const tursoService = {
  // Usuarios
  async registrarUsuario(usuario, contrasena) {
    try {
      const result = await tursoClient.execute({
        sql: 'INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)',
        args: [usuario, contrasena]
      });
      return { success: true, id: result.lastInsertRowid };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async loginUsuario(usuario, contrasena) {
    try {
      const result = await tursoClient.execute({
        sql: 'SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?',
        args: [usuario, contrasena]
      });
      return result.rows.length > 0 ? { success: true, user: result.rows[0] } : { success: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Opiniones CRUD
  async crearOpinion(nombre, descripcion, opinion, calificacion, usuarioId, usuarioNombre) {
    try {
      const result = await tursoClient.execute({
        sql: 'INSERT INTO opiniones_juegos (nombre, descripcion, opinion, calificacion, usuario_id, usuario_nombre) VALUES (?, ?, ?, ?, ?, ?)',
        args: [nombre, descripcion, opinion, calificacion, usuarioId, usuarioNombre]
      });
      return { success: true, id: result.lastInsertRowid };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async obtenerOpiniones() {
    try {
      const result = await tursoClient.execute('SELECT * FROM opiniones_juegos ORDER BY id DESC');
      return { success: true, data: result.rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async actualizarOpinion(id, nombre, descripcion, opinion, calificacion) {
    try {
      await tursoClient.execute({
        sql: 'UPDATE opiniones_juegos SET nombre = ?, descripcion = ?, opinion = ?, calificacion = ? WHERE id = ?',
        args: [nombre, descripcion, opinion, calificacion, id]
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async eliminarOpinion(id) {
    try {
      await tursoClient.execute({
        sql: 'DELETE FROM opiniones_juegos WHERE id = ?',
        args: [id]
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
