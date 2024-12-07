import React, { useEffect, useState } from "react";
import headerImage from "../assets/header.jpg"; 

const DiasAtividades = ({ onDiaSelecionado }) => {
  const [dias, setDias] = useState([]);

  useEffect(() => {
    fetch("http://3.88.192.56/api/atividades/")
      .then((response) => response.json())
      .then((data) => {
        // Obtém valores únicos de atividade.dia_semana
        const diasComAtividades = [...new Set(data.map((atividade) => atividade.dia_semana))];
        setDias(diasComAtividades);
      })
      .catch((error) => console.error("Erro ao buscar atividades:", error));
  }, []);

  return (
    <div className="dias-container">
      <header className="header">
        <img src={headerImage} alt="Header" className="header-image" />
      </header>
      <div className="background-overlay">
        <h1 className="titulo">Atividades</h1>
        <ul className="dias-lista">
          {dias.map((dia) => (
            <li
              key={dia}
              className="dia-item"
              onClick={() => onDiaSelecionado(dia)}
            >
              {dia}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiasAtividades;
