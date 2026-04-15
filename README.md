# Blog API - REST CRUD API for Blog/Forum

A complete REST CRUD API for blog/forum posts built with Next.js, TypeScript, and MongoDB. Features full documentation with Swagger UI.

## Features

- ✅ Complete CRUD operations (Create, Read, Update, Delete)
- ✅ RESTful API design
- ✅ TypeScript for type safety
- ✅ MongoDB database integration
- ✅ Interactive API documentation with Swagger UI
- ✅ Next.js App Router
- ✅ Tailwind CSS for styling
- ✅ Production-ready with dynamic OpenAPI spec

## Quick Start

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

- `src/app/api/openapi/route.ts` — rota que serve o OpenAPI dinamicamente com o servidor URL correto.
- `src/app/docs/page.tsx` — página Swagger UI disponível em `/docs`.
- `docs/api.md` — documentação detalhada com exemplos de requisições.

## Documentação dinâmica

O endpoint `/api/openapi` sirve a especificação OpenAPI com o servidor URL detectado automaticamente baseado no `host` e `x-forwarded-proto` headers. Isso permite que a mesma aplicação funcione em localhost, desenvolvimento, staging e produção sem necessidade de configuração adicional.

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
