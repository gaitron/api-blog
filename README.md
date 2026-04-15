# API Blog / Fórum com Next.js, TypeScript e MongoDB

Projeto com CRUD completo para posts de blog/forum usando a API `app/api/posts`.

## Como usar

1. Instale dependências:

```bash
npm install
```

2. Crie um arquivo `.env.local` a partir do exemplo:

```bash
cp .env.local.example .env.local
```

3. Defina `MONGODB_URI` com a string de conexão do MongoDB.

4. Inicie o servidor:

```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000).

## Estrutura do projeto

- `src/app/page.tsx` — interface do fórum com listagem, criação e edição.
- `src/components/ForumClient.tsx` — cliente React para consumir a API.
- `src/app/api/posts/route.ts` — rotas `GET` e `POST` para lista e criação de posts.
- `src/app/api/posts/[id]/route.ts` — rotas `GET`, `PUT` e `DELETE` para post individual.
- `src/lib/mongodb.ts` — conexão reutilizável com MongoDB.

## Endpoints REST

### Listar posts

- Método: `GET`
- URL: `/api/posts`

### Criar post

- Método: `POST`
- URL: `/api/posts`
- Body JSON:
  - `title` (string, obrigatório)
  - `content` (string, obrigatório)
  - `author` (string, opcional)

### Buscar post por ID

- Método: `GET`
- URL: `/api/posts/:id`

### Atualizar post

- Método: `PUT`
- URL: `/api/posts/:id`
- Body JSON:
  - `title` (string, obrigatório)
  - `content` (string, obrigatório)
  - `author` (string, opcional)

### Excluir post

- Método: `DELETE`
- URL: `/api/posts/:id`

## Arquivos de documentação

- `openapi.yaml` — especificação OpenAPI 3.0 para os quatro endpoints CRUD.
- `docs/api.md` — documentação detalhada com exemplos de requisições.
- `src/app/docs/page.tsx` — página Swagger UI disponível em `/docs`.

## Exemplo de requisição `POST`

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Meu primeiro post","content":"Conteúdo do post","author":"João"}'
```

## Observações

- Configure `MONGODB_URI` para conectar a uma base MongoDB.
- A coleção usada pelo CRUD é `posts`.
- A interface do app usa o ponto de extremidade `/api/posts` para gerenciar posts em tempo real.
