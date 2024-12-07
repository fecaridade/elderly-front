import React from "react";
import "./ModalAviso.css";

const ModalAviso = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          x
        </button>
        <p>
          Este App foi feito exclusivamente para ajuda no inicio dos seus
          treinos de alongamento e cardio antes de suas atividades físicas.
          Caso deseje treinos mais avançados, recomendamos que procure o
          acompanhamento de um profissional da área.
        </p>
      </div>
    </div>
  );
};

export default ModalAviso;
