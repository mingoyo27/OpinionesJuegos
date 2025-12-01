import { useState } from 'react';
import { tursoService } from '../services/turso';
import './Auth.css';

function Register({ onNavigate }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!usuario || !contrasena || !confirmarContrasena) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (contrasena.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    const result = await tursoService.registrarUsuario(usuario, contrasena);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        onNavigate('login');
      }, 2000);
    } else {
      setError('El usuario ya existe o hubo un error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <button className="back-button" onClick={() => onNavigate('landing')}>
          ← Volver
        </button>
        <h2>Registrarse</h2>
        <p>Crea tu cuenta para empezar a compartir opiniones</p>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">¡Registro exitoso! Redirigiendo...</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Elige un nombre de usuario"
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Crea una contraseña"
            />
          </div>
          
          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              placeholder="Confirma tu contraseña"
            />
          </div>
          
          <button type="submit" className="btn-submit">
            Crear Cuenta
          </button>
        </form>
        
        <div className="auth-footer">
          ¿Ya tienes cuenta?{' '}
          <button onClick={() => onNavigate('login')}>
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
