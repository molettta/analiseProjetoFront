# Hello T-Sistema — projeto de referência

Análise e Projeto de Sistemas — SENAC.

Este projeto guarda o código **no estado exato do fim da aula 16** (05/10 —
listas, `.map()`/`key`, *lifting state up* e formulário controlado), para
conferência contra `aulas/material_aula_16_listas_formularios.pdf`.

> Esta é a variante do material (entidade `Registro` genérica). O T-Sistema
> do seu grupo é o seu, com a entidade do seu domínio — é para conferir a
> estrutura, não para copiar.

## Rodar

```bash
npm install
npm run dev
```

## Arquivos do dia

| Arquivo | O que faz |
|---|---|
| `src/types.ts` | `type Registro` — `id`, `titulo`, `concluido` |
| `src/components/Cartao.tsx` | Componente sem estado próprio — recebe `concluido` e `onToggle` por prop |
| `src/components/FormularioNovoRegistro.tsx` | Formulário controlado que adiciona um registro novo |
| `src/App.tsx` | Fonte única de verdade: o array de registros mora aqui |

## Ambiente validado

Vite 8 · React 19 · TypeScript ~6.0 (template `react-ts` padrão)

Testado nesta máquina: `tsc --noEmit` limpo, `npm run build` limpo, e
confirmado rodando no navegador (listar, adicionar, marcar como concluído —
cada card reage só a si mesmo).
