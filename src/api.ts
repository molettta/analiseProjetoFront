// src/api.ts - fala com a API via fetch; nenhum componente chama fetch diretamente
import type { Registro } from "./types";

const BASE_URL = "http://localhost:3001";

async function tratarResposta<T>(resposta: Response): Promise<T> {
  if (!resposta.ok) {
    throw new Error(`Falha na API: ${resposta.status} ${resposta.statusText}`);
  }
  return resposta.json() as Promise<T>;
}

export async function listar(): Promise<Registro[]> {
  const resposta = await fetch(`${BASE_URL}/registros`);
  return tratarResposta<Registro[]>(resposta);
}

export async function criar(titulo: string, descricao: string): Promise<Registro> {
  const novo: Registro = {
    id: String(Date.now()),
    titulo,
    descricao: descricao || undefined,
    concluido: false,
  };
  const resposta = await fetch(`${BASE_URL}/registros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novo),
  });
  return tratarResposta<Registro>(resposta);
}

export async function atualizar(id: string, concluido: boolean): Promise<Registro> {
  const resposta = await fetch(`${BASE_URL}/registros/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ concluido }),
  });
  return tratarResposta<Registro>(resposta);
}

export async function remover(id: string): Promise<void> {
  const resposta = await fetch(`${BASE_URL}/registros/${id}`, { method: "DELETE" });
  if (!resposta.ok) {
    throw new Error(`Falha na API: ${resposta.status} ${resposta.statusText}`);
  }
}
