import { useState } from 'react';
import { tursoService } from '../services/turso';
import { storageService } from '../services/storage';
import './Auth.css';

function Login({ onNavigate, onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!usuario || !contrasena) {
      setError('Por favor completa todos los campos');
      return;
    }

    const result = await tursoService.loginUsuario(usuario, contrasena);
    
    if (result.success) {
      storageService.guardarUsuario(result.user);
      onLogin(result.user);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <button className="back-button" onClick={() => onNavigate('landing')}>
          ← Volver
        </button>
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu cuenta de Opiniones de Juegos</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingresa tu usuario"
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          
          <button type="submit" className="btn-submit">
            Iniciar Sesión
          </button>
        </form>
        
        <div className="auth-footer">
          ¿No tienes cuenta?{' '}
          <button onClick={() => onNavigate('register')}>
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
