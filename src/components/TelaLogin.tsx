// src/components/TelaLogin.tsx - NOVO arquivo. Pede email e senha; quem fala com a API e o App.
import { useState, type FormEvent } from "react";

type TelaLoginProps = {
  aviso: string | null; // ex.: "Sua sessao expirou" - vem do App
  onEntrar: (email: string, senha: string) => Promise<void>;
};

export function TelaLogin({ aviso, onEntrar }: TelaLoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const podeEnviar = email.trim().length > 0 && senha.length > 0 && !enviando;

  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (!podeEnviar) return;
    setEnviando(true);
    setErro(null);
    try {
      await onEntrar(email.trim(), senha);
      // deu certo: o App troca de tela, e este componente sai de cena
    } catch (falha) {
      setErro(falha instanceof Error ? falha.message : "Nao foi possivel entrar.");
      setEnviando(false);
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h1 className="h3 mb-4">Hello T-Sistema</h1>

      {aviso && <div className="alert alert-warning">{aviso}</div>}

      <form onSubmit={enviar} className="card card-body">
        <div className="mb-2">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {erro && <div className="alert alert-danger py-2">{erro}</div>}

        <button type="submit" className="btn btn-primary" disabled={!podeEnviar}>
          {enviando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
