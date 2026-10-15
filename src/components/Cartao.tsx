// src/components/Cartao.tsx - o estado concluido subiu para o App.tsx
type CartaoProps = {
  titulo: string;
  concluido: boolean;
  onToggle: () => void;
};

export function Cartao({ titulo, concluido, onToggle }: CartaoProps) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8,
                  padding: 16, marginBottom: 12 }}>
      <h3>{titulo}</h3>
      <p>Status: {concluido ? "concluido" : "pendente"}</p>
      <button onClick={onToggle}>
        {concluido ? "Desfazer" : "Marcar como concluido"}
      </button>
    </div>
  );
}
