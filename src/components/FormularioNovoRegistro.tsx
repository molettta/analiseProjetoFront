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
    <form onSubmit={enviar} className="card card-body mb-4">
      <div className="mb-2">
        <label className="form-label">Titulo</label>
        <input
          className="form-control"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Titulo do novo registro"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Descricao</label>
        <textarea
          className="form-control"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descricao (opcional)"
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={!podeAdicionar}>
        Adicionar
      </button>
    </form>
  );
}
