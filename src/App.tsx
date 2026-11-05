// src/App.tsx - os registros agora vem da API, nao de um array inventado
import { useEffect, useState } from "react";
import { Cartao } from "./components/Cartao";
import { FormularioNovoRegistro } from "./components/FormularioNovoRegistro";
import { TelaDetalhe } from "./components/TelaDetalhe";
import { TelaResumo } from "./components/TelaResumo";
import type { Registro } from "./types";
import * as api from "./api";

type Tela = "lista" | "detalhe" | "resumo";

function App() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [telaAtual, setTelaAtual] = useState<Tela>("lista");
  const [idSelecionado, setIdSelecionado] = useState<string | null>(null);

  function carregar() {
    setCarregando(true);
    setErro(null);
    api
      .listar()
      .then((lista) => setRegistros(lista))
      .catch(() => setErro("Nao foi possivel carregar os registros. O servidor da API esta rodando?"))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
  }, []);

  async function alternar(id: string) {
    const atual = registros.find((r) => r.id === id);
    if (!atual) return;
    try {
      await api.atualizar(id, !atual.concluido);
      carregar();
    } catch {
      setErro("Nao foi possivel atualizar o registro.");
    }
  }

  async function adicionar(titulo: string, descricao: string) {
    try {
      await api.criar(titulo, descricao);
      carregar();
    } catch {
      setErro("Nao foi possivel adicionar o registro.");
    }
  }

  async function remover(id: string) {
    try {
      await api.remover(id);
      carregar();
    } catch {
      setErro("Nao foi possivel remover o registro.");
    }
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
        <div className="container py-4" style={{ maxWidth: 720 }}>
          <p className="text-danger">Registro nao encontrado. Pode ter sido removido.</p>
          <button className="btn btn-secondary" onClick={voltarParaLista}>Voltar</button>
        </div>
      );
    }
    return <TelaDetalhe registro={registro} onVoltar={voltarParaLista} />;
  }

  return (
    <div className="container py-4" style={{ maxWidth: 720 }}>
      <h1 className="h3 mb-4">Hello T-Sistema</h1>

      {erro && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
          <span>{erro}</span>
          <button className="btn btn-sm btn-outline-danger" onClick={carregar}>
            Tentar novamente
          </button>
        </div>
      )}

      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${telaAtual === "lista" ? "active" : ""}`}
            onClick={() => setTelaAtual("lista")}
          >
            Registros
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${telaAtual === "resumo" ? "active" : ""}`}
            onClick={() => setTelaAtual("resumo")}
          >
            Resumo
          </button>
        </li>
      </ul>

      {carregando ? (
        <p className="text-muted">Carregando...</p>
      ) : telaAtual === "resumo" ? (
        <TelaResumo registros={registros} />
      ) : (
        <>
          <FormularioNovoRegistro onAdicionar={adicionar} />
          {registros.length === 0 ? (
            <p className="text-muted">Nenhum registro ainda. Use o formulario acima para criar o primeiro.</p>
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
