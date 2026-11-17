// ============================================================================
// CONTROLLER DE REGISTROS (aula 21)
//
// Lê o request, valida a entrada e devolve a resposta — a regra de negócio
// mora no registro.service.ts. Sem try/catch: quem converte os erros lançados
// em resposta HTTP é o errorHandler (veja src/middleware/error.ts).
// ============================================================================

import type { Request, Response } from 'express';

import { badRequest } from '../lib/errors';
import * as registroService from '../services/registro.service';

// O id chega na URL como texto ("/registros/7"). Number("abc") é NaN, e um id
// zero, negativo ou quebrado nunca existe no banco: melhor um 400 claro aqui
// do que deixar isso chegar ao Prisma.
function lerId(req: Request): number {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    throw badRequest('id inválido');
  }
  return id;
}

/** GET /registros */
export async function getAllRegistros(_req: Request, res: Response) {
  res.json(await registroService.listarRegistros());
}

/** POST /registros — body: { titulo, descricao? } */
export async function createRegistro(req: Request, res: Response) {
  const { titulo, descricao } = req.body ?? {};

  // Validar aqui mesmo que o front já valide: quem chama a API pode ser um
  // curl, não o seu formulário.
  if (typeof titulo !== 'string' || titulo.trim() === '') {
    throw badRequest('Campo "titulo" é obrigatório');
  }
  if (descricao !== undefined && typeof descricao !== 'string') {
    throw badRequest('Campo "descricao" deve ser texto');
  }

  const registro = await registroService.criarRegistro({
    titulo: titulo.trim(),
    descricao: descricao?.trim() || undefined,
  });
  res.status(201).json(registro);
}

/** PATCH /registros/:id — body: { concluido } */
export async function updateRegistro(req: Request, res: Response) {
  const id = lerId(req);
  const { concluido } = req.body ?? {};

  if (typeof concluido !== 'boolean') {
    throw badRequest('Campo "concluido" é obrigatório e deve ser true ou false');
  }

  res.json(await registroService.alterarConcluido(id, concluido));
}

/** DELETE /registros/:id — 204: deu certo, e não há corpo para devolver. */
export async function deleteRegistro(req: Request, res: Response) {
  const id = lerId(req);
  await registroService.removerRegistro(id);
  res.status(204).end();
}
