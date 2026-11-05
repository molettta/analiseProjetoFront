// src/components/TelaDetalhe.tsx - NOVO arquivo
import type { Registro } from "../types";

type TelaDetalheProps = {
  registro: Registro;
  onVoltar: () => void;
};

export function TelaDetalhe({ registro, onVoltar }: TelaDetalheProps) {
  return (
    <div className="container py-4" style={{ maxWidth: 720 }}>
      <button className="btn btn-link ps-0 mb-3" onClick={onVoltar}>&larr; Voltar</button>
      <div className="card">
        <div className="card-body">
          <h2 className="h4 card-title">{registro.titulo}</h2>
          <p className="card-text"><strong>Descricao:</strong> {registro.descricao || "sem descricao"}</p>
          <span className={`badge ${registro.concluido ? "bg-success" : "bg-secondary"}`}>
            {registro.concluido ? "concluido" : "pendente"}
          </span>
        </div>
      </div>
    </div>
  );
}
