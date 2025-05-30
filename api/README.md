**GiftWise API**

Este repositório contém a implementação do desafio de entrevista "GiftWise", uma API RESTful para gerenciamento de presentes. O objetivo deste projeto é demonstrar habilidades em NestJS, TypeScript, Prisma, Docker, testes automatizados com Jest e Supertest, além de boas práticas de desenvolvimento.

---

## 🛠️ Ferramentas e Tecnologias

* **Node.js & npm**: Tempo de execução e gerenciamento de pacotes.
* **NestJS**: Framework para construção de aplicações Node.js escaláveis.
* **TypeScript**: Tipagem estática e produtividade no desenvolvimento.
* **Prisma**: ORM para acesso ao banco de dados.
* **SQLite** (ou PostgreSQL): Banco de dados relacional (via Docker Compose).
* **Docker & Docker Compose**: Contêineres para banco de dados e serviços auxiliares.
* **Jest & Supertest**: Testes unitários e de integração.
* **ESLint & Prettier**: Linters e formatadores para manter consistência de código.
* **dotenv-cli**: Carregamento de variáveis de ambiente.

---

## 🎯 Funcionalidades da API

Endpoints disponíveis para o recurso **Gift**:

| Método | Rota         | Descrição                       |
| ------ | ------------ | ------------------------------- |
| POST   | `/gifts`     | Cria um novo presente.          |
| GET    | `/gifts`     | Lista todos os presentes.       |
| GET    | `/gifts/:id` | Busca um presente pelo ID.      |
| PUT    | `/gifts/:id` | Atualiza um presente existente. |
| DELETE | `/gifts/:id` | Remove um presente.             |

### Model `Gift`

```ts
export type Gift = {
  id: string;        // UUID gerado automaticamente
  title: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  createdAt: Date;   // Timestamp de criação
};
```

---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/kelwinv/desafio-pixelhouse
cd api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure variáveis de ambiente ()

Para fins de facilitar os envs de dev e test já estão no projeto

### 4. Inicie em modo de desenvolvimento

Este comando:

* Sobe os containers do banco de dados com Docker Compose
* Roda o script de inicialização com Prisma
* Inicia a aplicação com `--watch`

```bash
npm run start:dev
```

O servidor estará disponível em `http://localhost:3000`.

### 5. Testes

Para rodar a suíte de testes automatizados:

```bash
npm run test
```

O banco de dados de testes será iniciado automaticamente e limpo a cada execução de teste.

---

## 📦 Scripts disponíveis

| Script                          | Descrição                                                            |
| ------------------------------- | -------------------------------------------------------------------- |
| `npm run start`                 | Inicia o NestJS sem watch (produção).                                |
| `npm run start:dev`             | Inicia em modo de desenvolvimento com hot-reload e banco via Docker. |
| `npm run start:debug`           | Inicia modo dev com debug ativo.                                     |
| `npm run build`                 | Compila o projeto para a pasta `dist`.                               |
| `npm run test`                  | Executa testes (sobe banco, aplica migrations, executa e limpa).     |
| `npm run services:up`           | Sobe containers de banco via Docker Compose.                         |
| `npm run services:stop`         | Pausa os containers.                                                 |
| `npm run services:down`         | Derruba os containers.                                               |
| `npm run lint:prettier:fix`     | Formata o código com Prettier.                                       |
| `npm run lint:eslint:fix`       | Ajusta problemas de lint com ESLint.                                 |
| `npm run prisma:generate`       | Gera o cliente Prisma.                                               |
| `npm run prisma:validate`       | Valida o schema Prisma.                                              |
| `npm run prisma:migrate:dev`    | Aplica as migrations no ambiente de desenvolvimento.                 |
| `npm run prisma:migrate:deploy` | Aplica migrations em produção.                                       |
| `npm run prisma:studio`         | Abre a interface gráfica do Prisma para inspeção do banco.           |

---

## 🔍 Exemplos de requisições

### Criar um presente

```bash
curl -X POST http://localhost:3000/gifts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bicicleta Infantil",
    "description": "Bicicleta vermelha para crianças",
    "imageUrl": "https://exemplo.com/bicicleta.jpg",
    "basePrice": 300.0
}'
```

Resposta esperada:

```json
{
  "status": 201,
  "data": {
    "id": "uuid-gerado",
    "title": "Bicicleta Infantil",
    "description": "Bicicleta vermelha para crianças",
    "imageUrl": "https://exemplo.com/bicicleta.jpg",
    "basePrice": 300,
    "createdAt": "2025-05-29T12:34:56.789Z"
  },
  "error": null
}
```

---

## ✅ Considerações finais

Este projeto demonstra a implementação de uma API robusta, com validações de entrada via `class-validator`, testes automatizados cobrindo cenários de sucesso e erro, utilização de Docker para garantir portabilidade, e boas práticas de código e arquitetura proporcionadas por NestJS e Prisma.

Durante o modo de desenvolvimento ou testes, o banco de dados é automaticamente iniciado via Docker Compose conforme definido em `infra/db/compose.yml`, garantindo facilidade de setup e consistência entre ambientes.

Sinta-se à vontade para clonar, explorar e sugerir melhorias!
