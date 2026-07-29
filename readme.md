# 🛒 AtacaHub API

> **Backend de um sistema de gestão para atacados e supermercados**, desenvolvido com foco em arquitetura escalável, segurança, performance e boas práticas utilizadas em aplicações reais.

<p align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge\&logo=nestjs\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge\&logo=swagger\&logoColor=black)

</p>

---

# 📑 Sumário

* Sobre
* Arquitetura
* Tecnologias
* Funcionalidades
* Estrutura do Projeto
* Segurança
* Documentação
* Banco de Dados
* Testes
* Roadmap
* Executando o Projeto
* Diferenciais Técnicos

---

# 📖 Sobre

O AtacaHub API é um backend desenvolvido utilizando **NestJS** e **PostgreSQL**, simulando a arquitetura utilizada em sistemas de gestão de atacados, distribuidores e supermercados.

O objetivo do projeto é representar um backend moderno, preparado para crescer conforme novas regras de negócio são adicionadas.

Durante o desenvolvimento foram priorizados:

* Arquitetura modular
* Separação de responsabilidades
* Código limpo
* SQL otimizado
* Escalabilidade
* Facilidade de manutenção
* Documentação completa
* Segurança da aplicação

O projeto busca ir além de um CRUD tradicional, aproximando-se de um ambiente encontrado em empresas.

---

# 🏗 Arquitetura

A aplicação foi organizada por contexto de negócio.

```text
src
│
├── modules
│   ├── iam
│   ├── users
│   ├── customers
│   ├── catalog
│   ├── inventory
│   └── ...
│
├── infra
│
├── shared
│
└── docs
```

Cada módulo possui sua própria organização contendo:

* Controllers
* Services
* Repositories
* DTOs
* Interfaces
* Validators
* Testes

Essa estrutura facilita a manutenção, reduz acoplamento e permite que novos módulos sejam adicionados sem impactar os existentes.

---

# 🚀 Tecnologias

## Backend

* NestJS
* TypeScript
* PostgreSQL
* SQL puro
* Docker

## Segurança

* JWT
* Refresh Token
* Rate Limiting
* Hash de Senhas
* Validação com Zod

## Documentação

* Swagger
* Scalar

## Testes

* Vitest

---

# 📦 Funcionalidades

## IAM

* Cadastro de usuários
* Login
* Refresh Token
* Verificação de e-mail
* Recuperação de senha
* Sessões ativas

---

## Catálogo

* Categorias
* Marcas
* Fornecedores
* Produtos
* Variantes
* Slugs automáticos

---

## Clientes

* CRUD completo
* Exclusão lógica

---

## Estoque

* Controle de estoque
* Movimentações
* Atualização de quantidade

---

## Auditoria

* Registro de operações importantes realizadas na aplicação.

---

# 🔐 Segurança

A API implementa diversas camadas de proteção.

* JWT Authentication
* Refresh Tokens
* Rate Limiting
* Hash de Senhas
* Validação de entrada
* Tratamento centralizado de erros

---

# 📄 Documentação

A API possui documentação interativa utilizando OpenAPI.

### Swagger

```text
http://localhost:3000/docs
```

### Scalar

```text
http://localhost:3000/reference
```

---

# 🗄 Banco de Dados

O projeto utiliza PostgreSQL com:

* SQL escrito manualmente
* Migrations
* Índices
* Constraints
* Relacionamentos normalizados

A escolha por SQL puro foi feita para obter maior controle sobre consultas, performance e modelagem dos dados.

---

# 🧪 Testes

O projeto possui testes automatizados para garantir estabilidade das regras de negócio e reduzir regressões durante a evolução da aplicação.

---

# 📚 Documentação Técnica

A pasta **docs/** contém documentação detalhada sobre:

* Arquitetura
* Estrutura do projeto
* Modelagem
* Requisitos Funcionais
* Requisitos Não Funcionais
* Roadmap

---

# 🚀 Roadmap

## Infraestrutura

* [x] Docker
* [x] Swagger
* [x] Scalar
* [x] Rate Limiting
* [ ] Redis
* [ ] BullMQ
* [ ] RabbitMQ
* [ ] MinIO

---

## Observabilidade

* [ ] OpenTelemetry
* [ ] Prometheus
* [ ] Grafana

---

## Funcionalidades

* [ ] Pedidos
* [ ] Pagamentos
* [ ] Dashboard
* [ ] Relatórios
* [ ] Promoções

---

# ⚙ Executando

## Clonar

```bash
git clone <repositorio>
```

## Instalar

```bash
npm install
```

## Configurar

```env
DATABASE_URL=
JWT_SECRET=
```

## Executar migrations

```bash
npm run migration:up
```

## Rodar

```bash
npm run start:dev
```

---

# 🎯 Diferenciais Técnicos

Este projeto foi desenvolvido buscando aplicar conceitos encontrados em aplicações corporativas.

Entre eles:

* Arquitetura Modular
* Repository Pattern
* Dependency Injection
* SQL Avançado
* PostgreSQL
* Migrations
* JWT
* Refresh Tokens
* Validação de Dados
* Documentação OpenAPI
* Docker
* Testes Automatizados
* Organização por Domínio
* Código desacoplado

---

# 📈 Próximos Passos

As próximas evoluções previstas incluem:

* Cache distribuído com Redis
* Processamento assíncrono com BullMQ
* Arquitetura orientada a eventos com RabbitMQ
* Observabilidade com OpenTelemetry
* Métricas utilizando Prometheus e Grafana
* Armazenamento de arquivos com MinIO
* Busca de produtos utilizando Elasticsearch/OpenSearch

---

# 👨‍💻 Autor

Desenvolvido por **Bruno Henrique**.

Este projeto representa minha forma de desenvolver software: priorizando arquitetura, organização, escalabilidade e qualidade de código, sempre buscando reproduzir cenários encontrados em aplicações reais.
