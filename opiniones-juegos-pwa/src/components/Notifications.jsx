import { useState, useEffect } from 'react';
import { syncQueue } from '../services/syncQueue';
import './Notifications.css';

function Notifications({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    
    // Actualizar cada segundo
    const interval = setInterval(loadNotifications, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = () => {
    const allNotifications = syncQueue.getNotifications();
    const pending = syncQueue.getPendingActions();
    setNotifications(allNotifications);
    setPendingCount(pending.length);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000); // segundos

    if (diff < 60) return 'Hace un momento';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
    return `Hace ${Math.floor(diff / 86400)} días`;
  };

  const clearCompleted = () => {
    syncQueue.cleanOldActions();
    loadNotifications();
  };

  return (
    <div className="notifications-overlay" onClick={onClose}>
      <div className="notifications-panel" onClick={(e) => e.stopPropagation()}>
        <div className="notifications-header">
          <h2>🔔 Notificaciones</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {pendingCount > 0 && (
          <div className="pending-banner">
            ⏳ {pendingCount} {pendingCount === 1 ? 'acción pendiente' : 'acciones pendientes'}
            <br />
            <small>Se sincronizarán al reconectar</small>
          </div>
        )}

        <div className="notifications-actions">
          <button className="btn-clear" onClick={clearCompleted}>
            🗑️ Limpiar completadas
          </button>
        </div>

        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <p>No hay notificaciones</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item status-${notification.status}`}
              >
                <div className="notification-icon">
                  {syncQueue.getActionIcon(notification)}
                </div>
                <div className="notification-content">
                  <div className="notification-title">
                    {syncQueue.getActionDescription(notification)}
                  </div>
                  <div className="notification-status">
                    {syncQueue.getStatusIcon(notification.status)}{' '}
                    {syncQueue.getStatusText(notification.status)}
                  </div>
                  {notification.error && (
                    <div className="notification-error">
                      Error: {notification.error}
                    </div>
                  )}
                  <div className="notification-time">
                    {getTimeAgo(notification.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
