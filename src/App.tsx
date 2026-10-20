// src/App.tsx - versao final: lista/detalhe/resumo + remover + estado vazio
import { useState } from "react";
import { Cartao } from "./components/Cartao";
import { FormularioNovoRegistro } from "./components/FormularioNovoRegistro";
import { TelaDetalhe } from "./components/TelaDetalhe";
import { TelaResumo } from "./components/TelaResumo";
import type { Registro } from "./types";

type Tela = "lista" | "detalhe" | "resumo";

function App() {
  const [registros, setRegistros] = useState<Registro[]>([
    { id: "1", titulo: "Item A", concluido: false },
    { id: "2", titulo: "Item B", concluido: false },
    { id: "3", titulo: "Item C", concluido: false },
  ]);
  const [telaAtual, setTelaAtual] = useState<Tela>("lista");
  const [idSelecionado, setIdSelecionado] = useState<string | null>(null);

  function alternar(id: string) {
    setRegistros(
      registros.map((r) =>
        r.id === id ? { ...r, concluido: !r.concluido } : r
      )
    );
  }

  function adicionar(titulo: string, descricao: string) {
    const novo: Registro = {
      id: String(Date.now()),
      titulo,
      descricao: descricao || undefined,
      concluido: false,
    };
    setRegistros([...registros, novo]);
  }

  function remover(id: string) {
    setRegistros(registros.filter((r) => r.id !== id));
  }

  function abrirDetalhe(id: string) {
    setIdSelecionado(id);
    setTelaAtual("detalhe");
  }

  function voltarParaLista() {
    setTelaAtual("lista");
  }

  if (telaAtual === "detalhe") {
    const registro = registros.find((r) => r.id === idSelecionado);
    if (!registro) {
      return (
        <div>
          <p>Registro nao encontrado. Pode ter sido removido.</p>
          <button onClick={voltarParaLista}>Voltar</button>
        </div>
      );
    }
    return <TelaDetalhe registro={registro} onVoltar={voltarParaLista} />;
  }

  return (
    <div>
      <h1>Hello T-Sistema</h1>

      <nav style={{ marginBottom: 16 }}>
        <button onClick={() => setTelaAtual("lista")} disabled={telaAtual === "lista"}>
          Registros
        </button>
        <button onClick={() => setTelaAtual("resumo")} disabled={telaAtual === "resumo"}>
          Resumo
        </button>
      </nav>

      {telaAtual === "resumo" ? (
        <TelaResumo registros={registros} />
      ) : (
        <>
          <FormularioNovoRegistro onAdicionar={adicionar} />
          {registros.length === 0 ? (
            <p>Nenhum registro ainda. Use o formulario acima para criar o primeiro.</p>
          ) : (
            registros.map((r) => (
              <Cartao
                key={r.id}
                titulo={r.titulo}
                concluido={r.concluido}
                onToggle={() => alternar(r.id)}
                onVerDetalhes={() => abrirDetalhe(r.id)}
                onRemover={() => remover(r.id)}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}

export default App;
