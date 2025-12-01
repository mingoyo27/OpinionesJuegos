import './OpinionItem.css';

function OpinionItem({ opinion, usuarioActual, onEditar, onEliminar, offline }) {
  const renderEstrellas = (calificacion) => {
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

  // Verificar si el usuario actual es el creador de la opinión
  const esCreador = usuarioActual && opinion.usuario_id === usuarioActual.id;

  return (
    <div className="opinion-card">
      <div className="opinion-header">
        <h3>{opinion.nombre}</h3>
        <div className="rating">
          {renderEstrellas(opinion.calificacion)}
          <span className="rating-number">{opinion.calificacion}/5</span>
        </div>
      </div>
      
      <div className="opinion-body">
        <p className="descripcion">{opinion.descripcion}</p>
        <p className="opinion-text">{opinion.opinion}</p>
        <p className="opinion-author">👤 Por: <strong>{opinion.usuario_nombre || 'Anónimo'}</strong></p>
      </div>
      
      {esCreador && (
        <div className="opinion-actions">
          <button 
            className="btn-edit"
            onClick={() => onEditar(opinion)}
            disabled={offline}
          >
            ✏️ Editar
          </button>
          <button 
            className="btn-delete"
            onClick={() => onEliminar(opinion.id)}
            disabled={offline}
          >
            🗑️ Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default OpinionItem;
