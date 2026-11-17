// src/types.ts - aula 21: o formato e o que a API de verdade devolve, nao o que inventamos
export type Registro = {
  id: number;                // o banco gera (autoincrement) - nao e mais texto
  titulo: string;
  descricao: string | null;  // campo opcional no Prisma chega como null, nao undefined
  concluido: boolean;
};
