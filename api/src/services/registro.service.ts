// ============================================================================
// REGRA DE NEGÓCIO DE REGISTROS (aula 21)
//
// O que o sistema FAZ com um registro — separado do Express, como pede o
// passo 3 do CONTRIBUTING.md. Quem chama estas funções é o controller.
// ============================================================================

import { notFound } from '../lib/errors';
import { prisma } from '../lib/prisma';

export async function listarRegistros() {
  return prisma.registro.findMany({ orderBy: { id: 'asc' } });
}

export async function criarRegistro(dados: { titulo: string; descricao?: string }) {
  return prisma.registro.create({ data: dados });
}

// Sem esta checagem, atualizar ou apagar um id que não existe faria o Prisma
// lançar um erro próprio — e o errorHandler o transformaria num 500 genérico.
// Com ela, o cliente recebe um 404 com uma mensagem que dá para mostrar na tela.
async function garantirQueExiste(id: number) {
  const registro = await prisma.registro.findUnique({ where: { id } });
  if (!registro) {
    throw notFound('Registro não encontrado');
  }
}

export async function alterarConcluido(id: number, concluido: boolean) {
  await garantirQueExiste(id);
  return prisma.registro.update({ where: { id }, data: { concluido } });
}

export async function removerRegistro(id: number) {
  await garantirQueExiste(id);
  await prisma.registro.delete({ where: { id } });
}
