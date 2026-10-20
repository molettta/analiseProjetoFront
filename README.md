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

O fim de uma aula **é** o começo da seguinte — por isso o mesmo ponto leva duas etiquetas.

| Etiqueta | O que é |
|---|---|
| `aula-16-fim` | Fim de 05/10: listas, `.map()`/`key`, *lifting state up* e formulário controlado |
| `aula-17-inicio` | O mesmo ponto de `aula-16-fim` |
| `aula-17-fim` / `aula-18-inicio` | Fim de 09/10: composição de telas (Detalhe, Resumo), pilha vs abas por estado |
| `aula-18-fim` | Fim de 16/10: remover registro, estado vazio, roteiro de teste do fluxo completo |

> As aulas 01 a 15 não têm etiqueta porque este repositório só passou a
> guardar código a partir do estado de fim da aula 16 — não existe um commit
> real para o que vinha antes disso.

## Quebrei tudo, quero recomeçar do fim de uma aula

```bash
git fetch --tags
git checkout -B minha-aula-18 aula-17-fim    # ou a etiqueta da aula desejada
```

O `-B` cria um ramo naquele ponto. **Não** vá direto para a etiqueta
(`git checkout aula-17-fim`): isso deixa você em *detached HEAD*, e o commit
que fizer no fim da aula não gruda em lugar nenhum — o trabalho do dia some.

## Rodar

```bash
npm install
npm run dev
```

## Arquivos (estado atual — fim da aula 18)

| Arquivo | O que faz |
|---|---|
| `src/types.ts` | `type Registro` — `id`, `titulo`, `descricao?`, `concluido` |
| `src/components/Cartao.tsx` | Sem estado próprio — recebe `concluido` por prop; avisa o pai com `onToggle`, `onVerDetalhes`, `onRemover` |
| `src/components/FormularioNovoRegistro.tsx` | Formulário controlado (título + descrição) que adiciona um registro novo |
| `src/components/TelaDetalhe.tsx` | Mostra um registro já resolvido pelo pai — não busca nada sozinha |
| `src/components/TelaResumo.tsx` | Contagens calculadas na hora a partir do array recebido — nenhum estado duplicado |
| `src/App.tsx` | Fonte única de verdade: o array de registros e a tela atual moram aqui |

## Ambiente validado

Vite 8 · React 19 · TypeScript ~6.0 (template `react-ts` padrão)

Testado nesta máquina a cada aula: `tsc --noEmit` limpo, `npm run build`
limpo, e confirmado rodando no navegador — listar, adicionar (com e sem
descrição), marcar, ver detalhe, voltar, trocar de aba, remover, e o estado
vazio depois de remover tudo.
