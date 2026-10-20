// src/components/Cartao.tsx - ganha o botao "Ver detalhes"
type CartaoProps = {
  titulo: string;
  concluido: boolean;
  onToggle: () => void;
  onVerDetalhes: () => void;
};

export function Cartao({ titulo, concluido, onToggle, onVerDetalhes }: CartaoProps) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8,
                  padding: 16, marginBottom: 12 }}>
      <h3>{titulo}</h3>
      <p>Status: {concluido ? "concluido" : "pendente"}</p>
      <button onClick={onToggle}>
        {concluido ? "Desfazer" : "Marcar como concluido"}
      </button>
      <button onClick={onVerDetalhes}>Ver detalhes</button>
    </div>
  );
}
