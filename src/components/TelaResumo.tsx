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
      <h2 className="h4 mb-3">Resumo</h2>
      <div className="row g-3">
        <div className="col-4">
          <div className="card text-center">
            <div className="card-body">
              <p className="display-6 mb-0">{registros.length}</p>
              <p className="text-muted mb-0">Total</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card text-center border-success">
            <div className="card-body">
              <p className="display-6 mb-0 text-success">{concluidos}</p>
              <p className="text-muted mb-0">Concluidos</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card text-center border-secondary">
            <div className="card-body">
              <p className="display-6 mb-0 text-secondary">{pendentes}</p>
              <p className="text-muted mb-0">Pendentes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
