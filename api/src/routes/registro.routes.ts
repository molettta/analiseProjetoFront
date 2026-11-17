// ============================================================================
// ROTAS DE /registros (aula 21)
//
// Montado no app.ts sob o prefixo '/registros'. Cada rota declara, ali mesmo,
// o que exige de quem chama — dá para auditar o acesso lendo só este arquivo.
// Quem TEM cada permissão é decidido em prisma/seed.ts.
// ============================================================================

import { Router } from 'express';

import {
  createRegistro,
  deleteRegistro,
  getAllRegistros,
  updateRegistro,
} from '../controllers/registro.controller';
import { authenticate, requirePermission } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, requirePermission('registros:list'), getAllRegistros);
router.post('/', authenticate, requirePermission('registros:write'), createRegistro);
router.patch('/:id', authenticate, requirePermission('registros:write'), updateRegistro);
router.delete('/:id', authenticate, requirePermission('registros:write'), deleteRegistro);

export default router;
