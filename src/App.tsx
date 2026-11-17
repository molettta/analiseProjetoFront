// src/App.tsx - aula 21: dados da API de verdade, com login; a mensagem de erro vem da propria API
import { useEffect, useState } from "react";
import { Cartao } from "./components/Cartao";
import { FormularioNovoRegistro } from "./components/FormularioNovoRegistro";
import { TelaDetalhe } from "./components/TelaDetalhe";
import { TelaLogin } from "./components/TelaLogin";
import { TelaResumo } from "./components/TelaResumo";
import type { Registro } from "./types";
import * as api from "./api";

type Tela = "lista" | "detalhe" | "resumo";

function App() {
  const [logado, setLogado] = useState(api.temSessao());
  const [avisoLogin, setAvisoLogin] = useState<string | null>(null);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [telaAtual, setTelaAtual] = useState<Tela>("lista");
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);

  // 401 = a sessao acabou: volta para o login. Qualquer outro erro: mostra a
  // mensagem que a API escreveu (400, 403, 404...) em vez de uma frase generica.
  function tratarErro(falha: unknown, mensagemPadrao: string) {
    if (falha instanceof api.ErroDaApi && falha.status === 401) {
      setLogado(false);
      setAvisoLogin("Sua sessao expirou. Entre de novo.");
      return;
    }
    setErro(falha instanceof Error ? falha.message : mensagemPadrao);
  }

  function carregar() {
    setCarregando(true);
    setErro(null);
    api
      .listar()
      .then((lista) => setRegistros(lista))
      .catch((falha) => tratarErro(falha, "Nao foi possivel carregar os registros."))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    if (logado) carregar();
  }, [logado]);

  async function entrar(email: string, senha: string) {
    await api.entrar(email, senha); // se falhar, o erro sobe para a TelaLogin mostrar
    setAvisoLogin(null);
    setLogado(true);
  }

  function sair() {
    api.sair();
    setRegistros([]);
    setTelaAtual("lista");
    setLogado(false);
  }

  async function alternar(id: number) {
    const atual = registros.find((r) => r.id === id);
    if (!atual) return;
    try {
      await api.atualizar(id, !atual.concluido);
      carregar();
    } catch (falha) {
      tratarErro(falha, "Nao foi possivel atualizar o registro.");
    }
  }

  async function adicionar(titulo: string, descricao: string) {
    try {
      await api.criar(titulo, descricao);
      carregar();
    } catch (falha) {
      tratarErro(falha, "Nao foi possivel adicionar o registro.");
    }
  }

  async function remover(id: number) {
    try {
      await api.remover(id);
      carregar();
    } catch (falha) {
      tratarErro(falha, "Nao foi possivel remover o registro.");
    }
  }

  function abrirDetalhe(id: number) {
    setIdSelecionado(id);
    setTelaAtual("detalhe");
  }

  function voltarParaLista() {
    setTelaAtual("lista");
  }

  if (!logado) {
    return <TelaLogin aviso={avisoLogin} onEntrar={entrar} />;
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Hello T-Sistema</h1>
        <button className="btn btn-sm btn-outline-secondary" onClick={sair}>Sair</button>
      </div>

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
