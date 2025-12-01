import { useState, useEffect } from 'react';
import { tursoService } from '../services/turso';
import { storageService } from '../services/storage';
import OpinionForm from './OpinionForm';
import OpinionItem from './OpinionItem';
import './OpinionList.css';

function OpinionList({ usuario, onLogout }) {
  const [opiniones, setOpiniones] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [opinionEditar, setOpinionEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    cargarOpiniones();
    
    // Detectar cambios en conexión
    const handleOnline = () => {
      setOffline(false);
      cargarOpiniones();
    };
    const handleOffline = () => setOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const cargarOpiniones = async () => {
    setLoading(true);
    
    // Intentar cargar desde la base de datos
    if (navigator.onLine) {
      const result = await tursoService.obtenerOpiniones();
      if (result.success) {
        setOpiniones(result.data);
        // Guardar en cache
        storageService.guardarOpinionesCache(result.data);
      }
    } else {
      // Cargar desde cache si estamos offline
      const cache = storageService.obtenerOpinionesCache();
      setOpiniones(cache);
    }
    
    setLoading(false);
  };

  const handleCrear = async (datos) => {
    const result = await tursoService.crearOpinion(
      datos.nombre,
      datos.descripcion,
      datos.opinion,
      datos.calificacion,
      usuario.id,
      usuario.usuario
    );
    
    if (result.success) {
      await cargarOpiniones();
      setMostrarFormulario(false);
    }
  };

  const handleActualizar = async (datos) => {
    const result = await tursoService.actualizarOpinion(
      opinionEditar.id,
      datos.nombre,
      datos.descripcion,
      datos.opinion,
      datos.calificacion
    );
    
    if (result.success) {
      await cargarOpiniones();
      setMostrarFormulario(false);
      setOpinionEditar(null);
    }
  };

  const handleEliminar = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta opinión?')) {
      const result = await tursoService.eliminarOpinion(id);
      if (result.success) {
        await cargarOpiniones();
      }
    }
  };

  const handleEditar = (opinion) => {
    setOpinionEditar(opinion);
    setMostrarFormulario(true);
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setOpinionEditar(null);
  };

  return (
    <div className="opinion-list-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🎮 Opiniones de Juegos</h1>
          <div className="header-actions">
            <span className="user-info">👤 {usuario.usuario}</span>
            <button className="btn-logout" onClick={onLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {offline && (
        <div className="offline-banner">
          ⚠️ Modo offline - Mostrando datos guardados en caché
        </div>
      )}

      <div className="content">
        {!mostrarFormulario ? (
          <>
            <div className="actions-bar">
              <button 
                className="btn-add"
                onClick={() => setMostrarFormulario(true)}
                disabled={offline}
              >
                ➕ Nueva Opinión
              </button>
            </div>

            {loading ? (
              <div className="loading">Cargando opiniones...</div>
            ) : opiniones.length === 0 ? (
              <div className="empty-state">
                <p>No hay opiniones todavía</p>
                <p>¡Sé el primero en compartir tu opinión sobre un juego!</p>
              </div>
            ) : (
              <div className="opiniones-grid">
                {opiniones.map((opinion) => (
                  <OpinionItem
                    key={opinion.id}
                    opinion={opinion}
                    usuarioActual={usuario}
                    onEditar={handleEditar}
                    onEliminar={handleEliminar}
                    offline={offline}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <OpinionForm
            opinion={opinionEditar}
            onSubmit={opinionEditar ? handleActualizar : handleCrear}
            onCancelar={handleCancelar}
          />
        )}
      </div>
    </div>
  );
}

export default OpinionList;
