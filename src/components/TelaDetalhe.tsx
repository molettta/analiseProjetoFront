// src/components/TelaDetalhe.tsx - NOVO arquivo
import type { Registro } from "../types";

type TelaDetalheProps = {
  registro: Registro;
  onVoltar: () => void;
};

export function TelaDetalhe({ registro, onVoltar }: TelaDetalheProps) {
  return (
    <div>
      <button onClick={onVoltar}>&larr; Voltar</button>
      <h2>{registro.titulo}</h2>
      <p><strong>Descricao:</strong> {registro.descricao || "sem descricao"}</p>
      <p><strong>Situacao:</strong> {registro.concluido ? "concluido" : "pendente"}</p>
    </div>
  );
}
