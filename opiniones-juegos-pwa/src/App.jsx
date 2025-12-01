import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import OpinionList from './components/OpinionList';
import { storageService } from './services/storage';
import './App.css';

function App() {
  const [vista, setVista] = useState('landing');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Verificar si hay usuario logueado
    const usuarioGuardado = storageService.obtenerUsuario();
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
      setVista('opiniones');
    }

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registrado'))
        .catch((error) => console.log('Error al registrar SW:', error));
    }
  }, []);

  const handleLogin = (user) => {
    setUsuario(user);
    setVista('opiniones');
  };

  const handleLogout = () => {
    storageService.cerrarSesion();
    setUsuario(null);
    setVista('landing');
  };

  const handleNavigate = (nuevaVista) => {
    setVista(nuevaVista);
  };

  return (
    <>
      {vista === 'landing' && <Landing onNavigate={handleNavigate} />}
      {vista === 'login' && <Login onNavigate={handleNavigate} onLogin={handleLogin} />}
      {vista === 'register' && <Register onNavigate={handleNavigate} />}
      {vista === 'opiniones' && usuario && (
        <OpinionList usuario={usuario} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
