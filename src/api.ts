// src/api.ts - aula 21: fala com a API da base (Express + Prisma), com login e token.
// Continua sendo o UNICO arquivo do front que chama fetch.
import type { Registro } from "./types";

const BASE_URL = "http://localhost:3000";
const CHAVE_TOKEN = "tsistema:token";

// Erro que carrega o status HTTP e a mensagem que a PROPRIA API escreveu
// (o { message } do errorHandler da base) - e essa mensagem que vai para a tela.
export class ErroDaApi extends Error {
  readonly status: number;
  constructor(status: number, mensagem: string) {
    super(mensagem);
    this.status = status;
  }
}

export function temSessao(): boolean {
  return localStorage.getItem(CHAVE_TOKEN) !== null;
}

export function sair(): void {
  localStorage.removeItem(CHAVE_TOKEN);
}

async function pedir<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(CHAVE_TOKEN);
  let resposta: Response;
  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      ...opcoes,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch {
    // fetch so rejeita quando NAO houve resposta: API fora do ar... ou CORS
    // bloqueado pelo navegador. O console do navegador diz qual dos dois.
    throw new ErroDaApi(0, "Sem conexao com a API. Ela esta rodando na porta 3000?");
  }

  if (resposta.status === 401) {
    sair(); // token ausente, invalido ou vencido: a sessao acabou
  }
  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null);
    throw new ErroDaApi(resposta.status, corpo?.message ?? `A API respondeu ${resposta.status}`);
  }
  if (resposta.status === 204) {
    return undefined as T; // 204 = deu certo e nao ha corpo para ler
  }
  return resposta.json() as Promise<T>;
}

export async function entrar(email: string, senha: string): Promise<void> {
  const { token } = await pedir<{ token: string }>("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password: senha }),
  });
  localStorage.setItem(CHAVE_TOKEN, token);
}

export function listar(): Promise<Registro[]> {
  return pedir<Registro[]>("/registros");
}

export function criar(titulo: string, descricao: string): Promise<Registro> {
  // o id NAO vai mais daqui: quem cria o id agora e o banco
  return pedir<Registro>("/registros", {
    method: "POST",
    body: JSON.stringify({ titulo, descricao: descricao || undefined }),
  });
}

export function atualizar(id: number, concluido: boolean): Promise<Registro> {
  return pedir<Registro>(`/registros/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ concluido }),
  });
}

export function remover(id: number): Promise<void> {
  return pedir<void>(`/registros/${id}`, { method: "DELETE" });
}
