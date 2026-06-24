# Pneus Continental - ADMR Conect Frontend

Frontend em React e JavaScript para consumir a API Spring Boot do projeto Pneus Continental / ADMR Conect.

## Requisitos

- Node.js 20 ou superior
- Backend Spring Boot rodando em `http://localhost:8080`

## Como rodar

Instale as dependencias:

```bash
npm install
```

Inicie o frontend:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Configuracao da API

Por padrao, o frontend usa:

```text
http://localhost:8080
```

Para alterar, crie um arquivo `.env` na pasta `frontend`:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

## Telas

- Dashboard
- Login visual com criar conta e recuperacao de senha
- Dark mode
- Usuarios
- Clientes
- Produtos
- Pedidos
- Ligacoes
