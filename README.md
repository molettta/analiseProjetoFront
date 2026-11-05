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
| `aula-18-fim` / `aula-19-inicio` | Fim de 16/10: remover registro, estado vazio, roteiro de teste do fluxo completo |
| `aula-19-fim` / `aula-20-inicio` | Refino de UX: Bootstrap (cards, badges, nav-pills), boilerplate do Vite removido |
| `aula-20-fim` | Acesso à API: fetch real via `src/api.ts`, estados de loading/erro, dados deixam de ser inventados |

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

A partir da aula 20, o front precisa da API mock rodando — **dois terminais**:

```bash
npm install
npm run api    # terminal 1 - json-server em http://localhost:3001
npm run dev    # terminal 2 - front em http://localhost:5173
```

## Arquivos (estado atual — fim da aula 20)

| Arquivo | O que faz |
|---|---|
| `src/types.ts` | `type Registro` — `id`, `titulo`, `descricao?`, `concluido` |
| `src/api.ts` | Único arquivo que chama `fetch` — `listar`, `criar`, `atualizar`, `remover` contra o `json-server` |
| `db.json` | Dados da API mock (`json-server --watch db.json --port 3001`) — mesmos registros de sempre |
| `src/components/Cartao.tsx` | Sem estado próprio — recebe `concluido` por prop; avisa o pai com `onToggle`, `onVerDetalhes`, `onRemover`. É um `card` do Bootstrap |
| `src/components/FormularioNovoRegistro.tsx` | Formulário controlado (título + descrição) que adiciona um registro novo |
| `src/components/TelaDetalhe.tsx` | Mostra um registro já resolvido pelo pai — não busca nada sozinha |
| `src/components/TelaResumo.tsx` | Contagens calculadas na hora a partir do array recebido — nenhum estado duplicado |
| `src/App.tsx` | Busca os registros da API no `useEffect` de montagem; `carregando`/`erro` tratados na tela; cada mutação reconsulta a API |

## Ambiente validado

Vite 8 · React 19 · TypeScript ~6.0 (template `react-ts` padrão) · Bootstrap 5
(só CSS, importado em `main.tsx` — nenhum JS do Bootstrap é usado) · json-server
0.17 como API mock (dev only, não entra no build de produção)

Testado nesta máquina a cada aula: `tsc --noEmit` limpo, `npm run build`
limpo, e confirmado rodando no navegador — listar, adicionar (com e sem
descrição), marcar, ver detalhe, voltar, trocar de aba, remover, e o estado
vazio depois de remover tudo. Na aula 19, testado também em largura estreita
(card com os três botões de ação quebrando linha em vez de estourar). Na
aula 20, testado com a API real rodando (CRUD completo, com a mudança
persistindo em `db.json`) e com a API derrubada no meio da sessão (mensagem
de erro aparece, e "Tentar novamente" recupera assim que a API volta).
