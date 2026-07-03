# AtacaHub API

> Backend de um sistema de gerenciamento para atacarejos e supermercados.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange)
![Node.js](https://img.shields.io/badge/node-%3E%3D25-green)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📖 Sobre o projeto

O **AtacaHub API** é uma API REST desenvolvida com foco em escalabilidade, organização e boas práticas de engenharia de software.

O projeto simula um ambiente real de desenvolvimento, utilizando tecnologias e arquiteturas amplamente adotadas no mercado para sistemas de médio e grande porte.

O sistema é inspirado no funcionamento de atacarejos e supermercados, oferecendo recursos para gerenciamento de produtos, estoque, pedidos, clientes, promoções, pagamentos e administração.

Este projeto possui finalidade educacional e de portfólio, buscando reproduzir desafios encontrados no desenvolvimento de sistemas corporativos.

---

# 🎯 Objetivos

- Desenvolver uma API REST completa.
- Aplicar princípios SOLID.
- Utilizar arquitetura modular.
- Documentar todas as decisões do projeto.
- Simular um ambiente de produção.
- Implementar autenticação e autorização.
- Trabalhar com cache distribuído.
- Utilizar mensageria para processamento assíncrono.
- Garantir qualidade através de testes automatizados.
- Facilitar futuras integrações com aplicações Web, Mobile e Desktop.

---

# 🚀 Tecnologias

## Backend

- Node.js
- TypeScript
- Express

## Banco de Dados

- PostgreSQL
- Drizzle ORM

## Cache

- Redis

## Mensageria

- RabbitMQ

## Armazenamento de Arquivos

- MinIO (compatível com Amazon S3)

## Documentação

- Swagger / OpenAPI

## Testes

- Vitest

## Containerização

- Docker
- Docker Compose

## Qualidade de Código

- Biome
- Husky
- lint-staged

## CI/CD

- GitHub Actions

---

# 🏗 Arquitetura

A aplicação seguirá uma arquitetura modular inspirada em princípios de Clean Architecture e Domain-Driven Design (DDD), buscando manter baixo acoplamento entre módulos e facilitar manutenção, testes e evolução do sistema.

A documentação completa da arquitetura encontra-se em:

```
docs/arquitetura.md
```

---

# 📂 Estrutura da Documentação

Toda a documentação do projeto encontra-se na pasta **docs/**.

| Documento | Descrição |
|------------|-----------|
| README.md | Visão geral da documentação |
| RF.md | Requisitos Funcionais |
| RNF.md | Requisitos Não Funcionais |
| RN.md | Regras de Negócio |
| UC.md | Casos de Uso |
| backlog.md | Backlog do projeto |
| roadmap.md | Roadmap de desenvolvimento |
| arquitetura.md | Arquitetura do sistema |
| banco-de-dados.md | Modelagem do banco de dados |
| api.md | Documentação da API |
| docker.md | Ambiente Docker |
| cache-redis.md | Estratégias de Cache |
| rabbitmq.md | Eventos e Mensageria |
| seguranca.md | Estratégias de Segurança |
| testes.md | Estratégia de Testes |
| deploy.md | Processo de Deploy |
| decisoes-arquiteturais.md | ADRs (Architectural Decision Records) |
| convencoes.md | Convenções do projeto |

---

# ⚙️ Funcionalidades

Entre os principais módulos do sistema estão:

- Autenticação
- Autorização (RBAC)
- Usuários
- Clientes
- Produtos
- Categorias
- Marcas
- Fornecedores
- Estoque
- Carrinho
- Pedidos
- Pagamentos
- Promoções
- Cupons
- Dashboard
- Relatórios
- Auditoria
- Logs
- Importação de Produtos
- Upload de Arquivos
- Cache
- Mensageria

---

# 📈 Escalabilidade

O projeto foi planejado considerando futuras evoluções, como:

- Microsserviços
- Kubernetes
- Balanceamento de carga
- Cache distribuído
- Workers independentes
- Integrações externas
- Gateway de Pagamento
- Gateway de Frete
- Emissão de Nota Fiscal
- Marketplace
- Aplicativo Mobile

---

# 📦 Executando o Projeto

> **Em desenvolvimento**

A documentação completa de instalação será disponibilizada após a implementação da infraestrutura inicial.

---

# 🧪 Testes

O projeto possuirá:

- Testes Unitários
- Testes de Integração
- Testes End-to-End (quando aplicável)

A estratégia de testes estará documentada em:

```
docs/testes.md
```

---

# 📚 Convenções

Todas as convenções utilizadas durante o desenvolvimento encontram-se em:

```
docs/convencoes.md
```

---

# 🗺 Roadmap

O planejamento completo do projeto está disponível em:

```
docs/roadmap.md
```

---

# 📄 Licença

Este projeto possui finalidade exclusivamente educacional e para composição de portfólio.

Todos os nomes, marcas e dados utilizados como exemplo são fictícios ou empregados apenas para fins de demonstração técnica.

---

# 👨‍💻 Autor

Desenvolvido por Bruno Henrique como projeto de estudo e portfólio em Engenharia de Software e Desenvolvimento Backend.