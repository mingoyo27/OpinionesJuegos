// LocalStorage para caché offline
export const storageService = {
  // Guardar opiniones en localStorage
  guardarOpinionesCache(opiniones) {
    try {
      localStorage.setItem('opiniones_cache', JSON.stringify(opiniones));
      localStorage.setItem('opiniones_cache_timestamp', Date.now().toString());
      return true;
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
      return false;
    }
  },

  // Obtener opiniones del cache
  obtenerOpinionesCache() {
    try {
      const cache = localStorage.getItem('opiniones_cache');
      return cache ? JSON.parse(cache) : [];
    } catch (error) {
      console.error('Error leyendo localStorage:', error);
      return [];
    }
  },

  // Verificar si el cache es reciente (menos de 5 minutos)
  esCacheValido() {
    const timestamp = localStorage.getItem('opiniones_cache_timestamp');
    if (!timestamp) return false;
    const ahora = Date.now();
    const diferencia = ahora - parseInt(timestamp);
    return diferencia < 5 * 60 * 1000; // 5 minutos
  },

  // Guardar usuario logueado
  guardarUsuario(usuario) {
    localStorage.setItem('usuario_actual', JSON.stringify(usuario));
  },

  // Obtener usuario logueado
  obtenerUsuario() {
    const usuario = localStorage.getItem('usuario_actual');
    return usuario ? JSON.parse(usuario) : null;
  },

  // Cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('usuario_actual');
  }
};
