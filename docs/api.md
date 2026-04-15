# Documentação da API - CRUD de Posts

Esta API gerencia posts de blog/fórum com operações completas de CRUD.

## Endpoints

### 1. Listar posts

- Método: `GET`
- URL: `/api/posts`
- Resposta:
  - `200 OK`
  - Body: array de objetos Post

### 2. Criar post

- Método: `POST`
- URL: `/api/posts`
- Body JSON:
  - `title` (string, obrigatório)
  - `content` (string, obrigatório)
  - `author` (string, opcional)
- Resposta:
  - `201 Created`
  - Body: objeto Post criado
- Erros possíveis:
  - `400 Bad Request` quando `title` ou `content` estiverem ausentes ou vazios.

### 3. Buscar post por ID

- Método: `GET`
- URL: `/api/posts/:id`
- Parâmetros:
  - `id` (string) — MongoDB ObjectId do post
- Resposta:
  - `200 OK` quando o post for encontrado
  - `404 Not Found` se o post não existir
  - `400 Bad Request` se o `id` for inválido

### 4. Atualizar post

- Método: `PUT`
- URL: `/api/posts/:id`
- Parâmetros:
  - `id` (string) — MongoDB ObjectId do post
- Body JSON:
  - `title` (string, obrigatório)
  - `content` (string, obrigatório)
  - `author` (string, opcional)
- Resposta:
  - `200 OK` com o objeto Post atualizado
  - `404 Not Found` se o post não existir
  - `400 Bad Request` quando o `id` for inválido ou campos obrigatórios estiverem ausentes

### 5. Excluir post

- Método: `DELETE`
- URL: `/api/posts/:id`
- Parâmetros:
  - `id` (string) — MongoDB ObjectId do post
- Resposta:
  - `204 No Content` quando a exclusão ocorrer com sucesso
  - `404 Not Found` se o post não existir
  - `400 Bad Request` se o `id` for inválido

## Modelo de dados

### Post

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "author": "string|null",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Request de criação/atualização

```json
{
  "title": "Meu post",
  "content": "Conteúdo do post",
  "author": "Nome opcional"
}
```

## Exemplos de uso

### Criar post com cURL

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Olá mundo","content":"Este é um post de exemplo.","author":"Ana"}'
```

### Atualizar post com cURL

```bash
curl -X PUT http://localhost:3000/api/posts/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Título novo","content":"Conteúdo atualizado","author":"Ana"}'
```

### Excluir post com cURL

```bash
curl -X DELETE http://localhost:3000/api/posts/<id>
```
