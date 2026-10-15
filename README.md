# Hello T-Sistema — projeto de referência

Análise e Projeto de Sistemas — SENAC.
Repositório: [github.com/molettta/analiseProjetoFront](https://github.com/molettta/analiseProjetoFront)

Este projeto guarda o código **no estado exato do fim de cada aula**, marcado
por etiquetas (`tags`) no git — o mesmo esquema do projeto de referência de
Tecnologias Móveis e Híbridas.

> Esta é a variante do material (entidade `Registro` genérica). O T-Sistema
> do seu grupo é o seu, com a entidade do seu domínio — é para conferir a
> estrutura, não para copiar.

## As etiquetas

| Etiqueta | O que é |
|---|---|
| `aula-16-fim` | Fim de 05/10: listas, `.map()`/`key`, *lifting state up* e formulário controlado |

## Quebrei tudo, quero recomeçar do fim da aula 16

```bash
git fetch --tags
git checkout -B minha-aula-17 aula-16-fim
```

O `-B` cria um ramo naquele ponto. **Não** vá direto para a etiqueta
(`git checkout aula-16-fim`): isso deixa você em *detached HEAD*, e o commit
que fizer no fim da aula não gruda em lugar nenhum — o trabalho do dia some.

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
