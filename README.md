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
| `aula-20-fim` / `aula-21-inicio` | Acesso à API: fetch real via `src/api.ts`, estados de loading/erro, dados deixam de ser inventados |
| `aula-21-fim` | UI fala com API e banco: `api/` (base do semestre + recurso `Registro`), login com token, CORS, mensagens de erro da própria API |

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

A partir da aula 21, o back é a **base do semestre** (Express + Prisma +
PostgreSQL), na pasta `api/`. Precisa do Docker para o banco.

Uma vez só, preparando o back:

```bash
cd api
npm install                 # também gera o client do Prisma
cp .env.example .env
npm run db:up               # Postgres em container, porta 5433
npm run db:migrate          # cria as tabelas (inclusive Registro)
npm run db:seed             # usuários e permissões de teste
cd ..
npm install
```

No dia a dia, **dois terminais**, na raiz:

```bash
npm run api    # terminal 1 - API em http://localhost:3000
npm run dev    # terminal 2 - front em http://localhost:5173
```

Usuários do seed (senha `password123`): `eduardo@example.com` (Admin — lista e
altera registros) e `user@example.com` (User — só lista; tentar adicionar dá
403, de propósito).

## A pasta `api/` (aula 21)

É a base do semestre ([github.com/molettta/startup](https://github.com/molettta/startup),
commit `f22b833`) copiada **sem alterações** no commit `f8fbabe`; o commit
seguinte acrescenta só o que a aula 21 pede. Para ver exatamente o que mudou
na base:

```bash
git diff f8fbabe aula-21-fim -- api/
```

O que a aula acrescentou, seguindo o `CONTRIBUTING.md` da base: o model
`Registro` (com a migration), `registro.service.ts`, `registro.controller.ts`,
`registro.routes.ts`, as permissões `registros:list`/`registros:write` no seed,
e o CORS no `app.ts`.

> **Pegadinha do Prisma 7:** `npm run db:migrate` **não** regenera mais o
> client (o `CONTRIBUTING.md` da base ainda diz que regenera). Depois de mudar o
> schema, rode também `npx prisma generate` — sem isso o TypeScript reclama que
> `prisma.registro` não existe, e a API responde 500.

## Arquivos (estado atual — fim da aula 21)

| Arquivo | O que faz |
|---|---|
| `src/types.ts` | `type Registro` — `id: number`, `titulo`, `descricao: string \| null`, `concluido` — o formato que a API devolve |
| `src/api.ts` | Único arquivo que chama `fetch` — `entrar`, `sair`, `listar`, `criar`, `atualizar`, `remover`; manda o token e transforma erro HTTP em `ErroDaApi` com a mensagem da própria API |
| `src/components/TelaLogin.tsx` | Email e senha; mostra a mensagem da API quando o login falha |
| `api/` | A base do semestre + recurso `Registro` (ver seção acima) |
| `src/components/Cartao.tsx` | Sem estado próprio — recebe `concluido` por prop; avisa o pai com `onToggle`, `onVerDetalhes`, `onRemover`. É um `card` do Bootstrap |
| `src/components/FormularioNovoRegistro.tsx` | Formulário controlado (título + descrição) que adiciona um registro novo |
| `src/components/TelaDetalhe.tsx` | Mostra um registro já resolvido pelo pai — não busca nada sozinha |
| `src/components/TelaResumo.tsx` | Contagens calculadas na hora a partir do array recebido — nenhum estado duplicado |
| `src/App.tsx` | Sessão (`logado`), tela de login, busca da API ao entrar; 401 volta ao login com aviso; os outros erros mostram a mensagem da API |

## Ambiente validado

Vite 8 · React 19 · TypeScript ~6.0 (template `react-ts` padrão) · Bootstrap 5
(só CSS, importado em `main.tsx` — nenhum JS do Bootstrap é usado). API: Node 25,
Express 5, Prisma 7.9, PostgreSQL 17 (Docker). O `json-server` da aula 20
saiu na aula 21 (continua na etiqueta `aula-20-fim`).

Testado nesta máquina a cada aula: `tsc --noEmit` limpo, `npm run build`
limpo, e confirmado rodando no navegador — listar, adicionar (com e sem
descrição), marcar, ver detalhe, voltar, trocar de aba, remover, e o estado
vazio depois de remover tudo. Na aula 19, testado também em largura estreita
(card com os três botões de ação quebrando linha em vez de estourar). Na
aula 20, testado com a API real rodando (CRUD completo, com a mudança
persistindo em `db.json`) e com a API derrubada no meio da sessão (mensagem
de erro aparece, e "Tentar novamente" recupera assim que a API volta). Na
aula 21, testado contra a API e o Postgres de verdade: login errado e certo,
CRUD completo pelo front persistindo no banco, 403 do `user` aparecendo na
tela com a mensagem da API, token inválido levando de volta ao login, API
derrubada, e CORS com a origem errada (a tela diz "sem conexão", o console do
navegador mostra o bloqueio). No back, toda a bateria do `CONTRIBUTING.md` via
curl: 201/200/204 e 401, 403, 400 e 404.
