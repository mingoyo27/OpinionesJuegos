import { useState } from 'react';
import './Landing.css';

function Landing({ onNavigate }) {
  return (
    <div className="landing">
      <div className="landing-content">
        <div className="landing-header">
          <h1>🎮 Opiniones de Juegos</h1>
          <p className="subtitle">Comparte y descubre opiniones sobre tus videojuegos favoritos</p>
        </div>
        
        <div className="features">
          <div className="feature-card">
            <span className="feature-icon">📝</span>
            <h3>Escribe Opiniones</h3>
            <p>Comparte tu experiencia con otros jugadores</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⭐</span>
            <h3>Califica Juegos</h3>
            <p>Puntúa tus juegos favoritos</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💬</span>
            <h3>Lee Reseñas</h3>
            <p>Descubre qué piensan otros gamers</p>
          </div>
        </div>

        <div className="landing-actions">
          <button className="btn-primary" onClick={() => onNavigate('login')}>
            Iniciar Sesión
          </button>
          <button className="btn-secondary" onClick={() => onNavigate('register')}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
