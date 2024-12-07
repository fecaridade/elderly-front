import React from "react";
import "./ModalGifExercicio.css";

const ModalGifExercicio = ({ gifUrl, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          x
        </button>
        {gifUrl ? (
          <img src={gifUrl} alt="GIF do Exercício" className="gif-image" />
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default ModalGifExercicio;