// src/components/TelaResumo.tsx - NOVO arquivo
import type { Registro } from "../types";

type TelaResumoProps = {
  registros: Registro[];
};

export function TelaResumo({ registros }: TelaResumoProps) {
  const concluidos = registros.filter((r) => r.concluido).length;
  const pendentes = registros.length - concluidos;

  return (
    <div>
      <h2>Resumo</h2>
      <p>Total de registros: {registros.length}</p>
      <p>Concluidos: {concluidos}</p>
      <p>Pendentes: {pendentes}</p>
    </div>
  );
}
