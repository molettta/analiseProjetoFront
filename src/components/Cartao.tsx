// src/components/Cartao.tsx - ganha o botao "Remover"
type CartaoProps = {
  titulo: string;
  concluido: boolean;
  onToggle: () => void;
  onVerDetalhes: () => void;
  onRemover: () => void;
};

export function Cartao({ titulo, concluido, onToggle, onVerDetalhes, onRemover }: CartaoProps) {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-wrap justify-content-between align-items-start gap-2">
        <div>
          <h3 className="h5 card-title mb-1">{titulo}</h3>
          <span className={`badge ${concluido ? "bg-success" : "bg-secondary"}`}>
            {concluido ? "concluido" : "pendente"}
          </span>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-sm btn-outline-secondary" onClick={onToggle}>
            {concluido ? "Desfazer" : "Marcar como concluido"}
          </button>
          <button className="btn btn-sm btn-outline-primary" onClick={onVerDetalhes}>
            Ver detalhes
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={onRemover}>
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
