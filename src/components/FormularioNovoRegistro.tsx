// src/components/FormularioNovoRegistro.tsx - ganha o campo descricao
import { useState, type FormEvent } from "react";

type FormularioNovoRegistroProps = {
  onAdicionar: (titulo: string, descricao: string) => void;
};

export function FormularioNovoRegistro({ onAdicionar }: FormularioNovoRegistroProps) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const podeAdicionar = titulo.trim().length > 0;

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (!podeAdicionar) return;
    onAdicionar(titulo.trim(), descricao.trim());
    setTitulo("");
    setDescricao("");
  }

  return (
    <form onSubmit={enviar} style={{ marginBottom: 16 }}>
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Titulo do novo registro"
      />
      <textarea
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descricao (opcional)"
      />
      <button type="submit" disabled={!podeAdicionar}>
        Adicionar
      </button>
    </form>
  );
}
