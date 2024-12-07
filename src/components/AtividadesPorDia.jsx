// AtividadesPorDia.js
import React, { useEffect, useState } from "react";
import headerImage from "../assets/header.jpg";
import ModalGifExercicio from "./ModalGifExercicio";

const AtividadesPorDia = ({ dia, voltar }) => {
  const [atividades, setAtividades] = useState([]);
  const [tempo, setTempo] = useState(0);
  const [cronometroAtivo, setCronometroAtivo] = useState(false);
  const [gifUrl, setGifUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/atividades/`)
      .then((response) => response.json())
      .then((data) => {
        const atividadesDoDia = data.filter((atividade) => atividade.dia_semana === dia);
        setAtividades(atividadesDoDia);
      })
      .catch((error) => console.error("Erro ao buscar atividades:", error));
  }, [dia]);

  useEffect(() => {
    let intervalo;
    if (cronometroAtivo) {
      intervalo = setInterval(() => {
        setTempo((prevTempo) => prevTempo + 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [cronometroAtivo]);

  const iniciarOuResetarCronometro = () => {
    if (cronometroAtivo) {
      setTempo(0); 
    }
    setCronometroAtivo(!cronometroAtivo); 
  };

  const formatarTempo = (tempo) => {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
  };

  const abrirModalComGif = (gifUrl) => {
    setGifUrl(gifUrl);
  };

  const fecharModal = () => {
    setGifUrl(null);
  };

  return (
    <div className="dias-container">
      <header className="header">
        <img src={headerImage} alt="Header" className="header-image" />
        <button className="voltar-btn" onClick={voltar}>
          Voltar
        </button>
      </header>
      <div className="background-overlay">
        <div className="cronometro-container">
          <div className="cronometro">{formatarTempo(tempo)}</div>
        </div>
        <h1 className="titulo">{dia}</h1>
        <table className="atividades-tabela">
          <thead>
            <tr>
              <th>Exercício</th>
              <th>Séries</th>
            </tr>
          </thead>
          <tbody>
            {atividades.map((atividade) => (
              <tr key={atividade.id}>
                <td
                  onClick={() => abrirModalComGif(atividade.gif_exercicio)}
                  style={{ backgroundColor: "rgba(70, 122, 224, 0.8)", color: "white", cursor: "pointer" }}
                >
                  {atividade.nome}
                </td>
                <td>{atividade.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="iniciar-btn" onClick={iniciarOuResetarCronometro}>
          {cronometroAtivo ? "Resetar" : "Iniciar"} Treino
        </button>
      </div>
      {gifUrl && <ModalGifExercicio gifUrl={gifUrl} onClose={fecharModal} />}
    </div>
  );
};

export default AtividadesPorDia;
