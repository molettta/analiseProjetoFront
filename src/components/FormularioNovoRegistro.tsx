// src/components/FormularioNovoRegistro.tsx - NOVO arquivo
import { useState, type FormEvent } from "react";

type FormularioNovoRegistroProps = {
  onAdicionar: (titulo: string) => void;
};

export function FormularioNovoRegistro({ onAdicionar }: FormularioNovoRegistroProps) {
  const [titulo, setTitulo] = useState("");

  const podeAdicionar = titulo.trim().length > 0;

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (!podeAdicionar) return;
    onAdicionar(titulo.trim());
    setTitulo("");
  }

  return (
    <form onSubmit={enviar} style={{ marginBottom: 16 }}>
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Titulo do novo registro"
      />
      <button type="submit" disabled={!podeAdicionar}>
        Adicionar
      </button>
    </form>
  );
}
