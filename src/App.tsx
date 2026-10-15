// src/App.tsx - versao final: lista + formulario que adiciona
import { useState } from "react";
import { Cartao } from "./components/Cartao";
import { FormularioNovoRegistro } from "./components/FormularioNovoRegistro";
import type { Registro } from "./types";

function App() {
  const [registros, setRegistros] = useState<Registro[]>([
    { id: "1", titulo: "Item A", concluido: false },
    { id: "2", titulo: "Item B", concluido: false },
    { id: "3", titulo: "Item C", concluido: false },
  ]);

  function alternar(id: string) {
    setRegistros(
      registros.map((r) =>
        r.id === id ? { ...r, concluido: !r.concluido } : r
      )
    );
  }

  function adicionar(titulo: string) {
    const novo: Registro = { id: String(Date.now()), titulo, concluido: false };
    setRegistros([...registros, novo]);
  }

  return (
    <div>
      <h1>Hello T-Sistema</h1>
      <FormularioNovoRegistro onAdicionar={adicionar} />
      {registros.map((r) => (
        <Cartao
          key={r.id}
          titulo={r.titulo}
          concluido={r.concluido}
          onToggle={() => alternar(r.id)}
        />
      ))}
    </div>
  );
}

export default App;
