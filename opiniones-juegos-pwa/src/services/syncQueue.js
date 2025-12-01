// Sistema de cola de sincronización para operaciones offline
import { tursoService } from './turso';

export const syncQueue = {
  // Obtener cola de acciones pendientes
  getQueue() {
    const queue = localStorage.getItem('sync_queue');
    return queue ? JSON.parse(queue) : [];
  },

  // Guardar cola
  saveQueue(queue) {
    localStorage.setItem('sync_queue', JSON.stringify(queue));
  },

  // Agregar acción a la cola
  addToQueue(action) {
    const queue = this.getQueue();
    const newAction = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      status: 'pending', // pending, processing, completed, failed
      ...action
    };
    queue.push(newAction);
    this.saveQueue(queue);
    return newAction;
  },

  // Actualizar estado de una acción
  updateActionStatus(actionId, status, error = null) {
    const queue = this.getQueue();
    const action = queue.find(a => a.id === actionId);
    if (action) {
      action.status = status;
      action.error = error;
      if (status === 'completed' || status === 'failed') {
        action.completedAt = new Date().toISOString();
      }
      this.saveQueue(queue);
    }
  },

  // Obtener acciones pendientes
  getPendingActions() {
    return this.getQueue().filter(a => a.status === 'pending');
  },

  // Obtener todas las notificaciones (últimas 20)
  getNotifications() {
    return this.getQueue().slice(-20).reverse();
  },

  // Limpiar acciones completadas antiguas (más de 1 hora)
  cleanOldActions() {
    const queue = this.getQueue();
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    const filtered = queue.filter(action => {
      if (action.status === 'pending') return true;
      const actionTime = new Date(action.timestamp).getTime();
      return actionTime > oneHourAgo;
    });
    this.saveQueue(filtered);
  },

  // Procesar cola de sincronización
  async processQueue() {
    const pendingActions = this.getPendingActions();
    
    if (pendingActions.length === 0) {
      return { success: true, processed: 0 };
    }

    let processed = 0;
    let failed = 0;

    for (const action of pendingActions) {
      this.updateActionStatus(action.id, 'processing');

      try {
        let result;

        switch (action.type) {
          case 'create':
            result = await tursoService.crearOpinion(
              action.data.nombre,
              action.data.descripcion,
              action.data.opinion,
              action.data.calificacion,
              action.data.usuarioId,
              action.data.usuarioNombre
            );
            break;

          case 'update':
            result = await tursoService.actualizarOpinion(
              action.data.id,
              action.data.nombre,
              action.data.descripcion,
              action.data.opinion,
              action.data.calificacion
            );
            break;

          case 'delete':
            result = await tursoService.eliminarOpinion(action.data.id);
            break;

          default:
            throw new Error('Tipo de acción desconocido');
        }

        if (result.success) {
          this.updateActionStatus(action.id, 'completed');
          processed++;
        } else {
          this.updateActionStatus(action.id, 'failed', result.error);
          failed++;
        }
      } catch (error) {
        this.updateActionStatus(action.id, 'failed', error.message);
        failed++;
      }

      // Pequeña pausa entre operaciones
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return { success: true, processed, failed };
  },

  // Obtener descripción legible de una acción
  getActionDescription(action) {
    const descriptions = {
      create: `Crear opinión: "${action.data.nombre}"`,
      update: `Actualizar opinión: "${action.data.nombre}"`,
      delete: `Eliminar opinión`
    };
    return descriptions[action.type] || 'Acción desconocida';
  },

  // Obtener icono de una acción
  getActionIcon(action) {
    const icons = {
      create: '➕',
      update: '✏️',
      delete: '🗑️'
    };
    return icons[action.type] || '📝';
  },

  // Obtener icono de estado
  getStatusIcon(status) {
    const icons = {
      pending: '⏳',
      processing: '⚙️',
      completed: '✅',
      failed: '❌'
    };
    return icons[status] || '❓';
  },

  // Obtener texto de estado
  getStatusText(status) {
    const texts = {
      pending: 'En espera',
      processing: 'Procesando...',
      completed: 'Completado',
      failed: 'Error'
    };
    return texts[status] || 'Desconocido';
  }
};
