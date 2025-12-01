import { useState, useEffect } from 'react';
import { tursoService } from '../services/turso';
import { storageService } from '../services/storage';
import { syncQueue } from '../services/syncQueue';
import OpinionForm from './OpinionForm';
import OpinionItem from './OpinionItem';
import Notifications from './Notifications';
import './OpinionList.css';

function OpinionList({ usuario, onLogout }) {
  const [opiniones, setOpiniones] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [opinionEditar, setOpinionEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(!navigator.onLine);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    cargarOpiniones();
    actualizarPendientes();
    
    // Detectar cambios en conexión
    const handleOnline = async () => {
      setOffline(false);
      // Procesar cola de sincronización
      await procesarCola();
      await cargarOpiniones();
    };
    const handleOffline = () => setOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Actualizar contador de pendientes cada segundo
    const interval = setInterval(actualizarPendientes, 1000);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const actualizarPendientes = () => {
    const pending = syncQueue.getPendingActions();
    setPendingCount(pending.length);
  };

  const procesarCola = async () => {
    const result = await syncQueue.processQueue();
    if (result.processed > 0) {
      // Mostrar notificación de éxito
      console.log(`✅ ${result.processed} acciones sincronizadas`);
    }
    actualizarPendientes();
  };

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
    if (offline) {
      // Agregar a cola offline
      syncQueue.addToQueue({
        type: 'create',
        data: {
          nombre: datos.nombre,
          descripcion: datos.descripcion,
          opinion: datos.opinion,
          calificacion: datos.calificacion,
          usuarioId: usuario.id,
          usuarioNombre: usuario.usuario
        }
      });
      
      // Agregar optimistamente al cache local
      const nuevaOpinion = {
        id: 'temp_' + Date.now(),
        ...datos,
        usuario_id: usuario.id,
        usuario_nombre: usuario.usuario
      };
      const opinionesActuales = [...opiniones, nuevaOpinion];
      setOpiniones(opinionesActuales);
      storageService.guardarOpinionesCache(opinionesActuales);
      
      setMostrarFormulario(false);
      actualizarPendientes();
      return;
    }

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
    if (offline) {
      // Agregar a cola offline
      syncQueue.addToQueue({
        type: 'update',
        data: {
          id: opinionEditar.id,
          nombre: datos.nombre,
          descripcion: datos.descripcion,
          opinion: datos.opinion,
          calificacion: datos.calificacion
        }
      });
      
      // Actualizar optimistamente en cache
      const opinionesActualizadas = opiniones.map(op => 
        op.id === opinionEditar.id ? { ...op, ...datos } : op
      );
      setOpiniones(opinionesActualizadas);
      storageService.guardarOpinionesCache(opinionesActualizadas);
      
      setMostrarFormulario(false);
      setOpinionEditar(null);
      actualizarPendientes();
      return;
    }

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
    if (!confirm('¿Estás seguro de eliminar esta opinión?')) return;

    if (offline) {
      // Agregar a cola offline
      syncQueue.addToQueue({
        type: 'delete',
        data: { id }
      });
      
      // Eliminar optimistamente del cache
      const opinionesFiltradas = opiniones.filter(op => op.id !== id);
      setOpiniones(opinionesFiltradas);
      storageService.guardarOpinionesCache(opinionesFiltradas);
      
      actualizarPendientes();
      return;
    }

    const result = await tursoService.eliminarOpinion(id);
    if (result.success) {
      await cargarOpiniones();
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
            <button 
              className="btn-notifications"
              onClick={() => setMostrarNotificaciones(true)}
            >
              🔔 Notificaciones
              {pendingCount > 0 && (
                <span className="notification-badge">{pendingCount}</span>
              )}
            </button>
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
              >
                ➕ Nueva Opinión
                {offline && <span className="offline-label"> (Offline)</span>}
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

      {mostrarNotificaciones && (
        <Notifications onClose={() => setMostrarNotificaciones(false)} />
      )}
    </div>
  );
}

export default OpinionList;
