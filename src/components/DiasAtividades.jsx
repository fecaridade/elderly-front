import React, { useEffect, useState } from "react";
import headerImage from "../assets/header.jpg"; 


const DiasAtividades = ({ onDiaSelecionado }) => {
  const [dias, setDias] = useState([]);

  
  const ordemDias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  useEffect(() => {
    fetch("http://localhost:8000/api/atividades/")
      .then((response) => response.json())
      .then((data) => {
        
        const diasComAtividades = [...new Set(data.map((atividade) => atividade.dia_semana))];

        
        const diasOrdenados = diasComAtividades.sort((a, b) => ordemDias.indexOf(a) - ordemDias.indexOf(b));
        setDias(diasOrdenados);
      })
      .catch((error) => console.error("Erro ao buscar atividades:", error));
  }, []);

  return (
    <div className="dias-container">
      <header className="header">
        <img src={headerImage} alt="Header" className="header-image" />
      </header>
      <div className="background-overlay">
        <h1 className="titulo">Treino Semanal</h1>
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
