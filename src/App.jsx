import React, { useState, useEffect } from "react";
import DiasAtividades from "./components/DiasAtividades";
import AtividadesPorDia from "./components/AtividadesPorDia";
import ModalAviso from "./components/ModalAviso";
import "./Style.css";

const App = () => {
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(true);

  return (
    <div>
      {mostrarModal && <ModalAviso onClose={() => setMostrarModal(false)} />}
      {diaSelecionado ? (
        <AtividadesPorDia
          dia={diaSelecionado}
          voltar={() => setDiaSelecionado(null)}
        />
      ) : (
        <DiasAtividades onDiaSelecionado={(dia) => setDiaSelecionado(dia)} />
      )}
    </div>
  );
};

export default App;
