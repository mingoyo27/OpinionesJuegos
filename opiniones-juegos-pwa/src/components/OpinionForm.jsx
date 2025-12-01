import { useState, useEffect } from 'react';
import './OpinionForm.css';

function OpinionForm({ opinion, onSubmit, onCancelar }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [opinionTexto, setOpinionTexto] = useState('');
  const [calificacion, setCalificacion] = useState(5);

  useEffect(() => {
    if (opinion) {
      setNombre(opinion.nombre);
      setDescripcion(opinion.descripcion);
      setOpinionTexto(opinion.opinion);
      setCalificacion(opinion.calificacion);
    }
  }, [opinion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombre,
      descripcion,
      opinion: opinionTexto,
      calificacion: parseFloat(calificacion)
    });
  };

  const renderEstrellas = () => {
    const estrellas = [];
    const rating = Math.round(calificacion);
    
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ⭐
        </span>
      );
    }
    return estrellas;
  };

  return (
    <div className="opinion-form-container">
      <h2>{opinion ? 'Editar Opinión' : 'Nueva Opinión'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group-opinion">
          <label>Nombre del Juego *</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: The Legend of Zelda"
            required
          />
        </div>

        <div className="form-group-opinion">
          <label>Descripción Breve *</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ej: Aventura épica en Hyrule"
            required
          />
        </div>

        <div className="form-group-opinion">
          <label>Tu Opinión *</label>
          <textarea
            value={opinionTexto}
            onChange={(e) => setOpinionTexto(e.target.value)}
            placeholder="Comparte tu experiencia con este juego..."
            required
          />
        </div>

        <div className="form-group-opinion">
          <label>Calificación *</label>
          <div className="rating-input">
            <input
              type="number"
              min="0"
              max="5"
              step="0.5"
              value={calificacion}
              onChange={(e) => setCalificacion(e.target.value)}
              required
            />
            <div className="rating-preview">
              {renderEstrellas()}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit-form">
            {opinion ? 'Actualizar' : 'Crear'} Opinión
          </button>
          <button type="button" className="btn-cancel" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default OpinionForm;
