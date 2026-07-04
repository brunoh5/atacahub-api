# 🧠 AtacaHub API — Arquitetura do Sistema

## 📌 Visão Geral

O AtacaHub API é um backend monolítico modular baseado em Node.js + TypeScript, utilizando PostgreSQL como banco de dados principal.

O sistema é projetado para ser inicialmente um monólito bem estruturado, com capacidade futura de evolução para arquitetura distribuída (workers, filas e microserviços).

---

## 🧱 Estilo Arquitetural

### Monólito Modular

O sistema segue o padrão de monólito modular, onde:

- O sistema é um único deploy
- Os domínios são isolados por módulos
- Cada módulo possui suas próprias responsabilidades internas

---

## 📦 Estrutura de Módulos

Os módulos são organizados por domínio de negócio:

- auth (autenticação e autorização)
- users (gestão de usuários)
- products (catálogo de produtos)
- orders (pedidos)
- payments (pagamentos)
- inventory (estoque)
- files (upload e gerenciamento de arquivos)
- webhooks (integrações externas)
- audit (logs de auditoria)

---

## 🏗️ Estrutura Interna de Cada Módulo

Cada módulo deve seguir a seguinte estrutura:


### Responsabilidades

- Controllers: entrada HTTP (Express/Fastify)
- Services: regras de negócio
- Repositories: acesso ao banco de dados
- DTOs: validação e tipagem de entrada/saída

---

## 🧩 Comunicação entre módulos

### Regra principal:
Módulos não devem acessar diretamente o banco de dados de outros módulos.

### Formas permitidas de comunicação:
- Chamadas via services
- Eventos internos (futuro)
- Orquestração na camada de aplicação

---

## 🗄️ Banco de Dados

### Tecnologia
- PostgreSQL

### Princípios
- Modelo relacional forte
- Uso de foreign keys sempre que possível
- Transações para operações críticas
- Imutabilidade de dados financeiros (ex: price_snapshot)

### Regras importantes
- Não duplicar lógica de negócio no banco
- Não acessar tabelas de outros módulos diretamente
- Usar migrations versionadas obrigatoriamente

---

## ⚡ Padrões de Performance

- Paginação obrigatória em todas as listagens
- Evitar N+1 queries
- Uso de índices em:
  - foreign keys
  - campos de busca (email, status, created_at)

---

## 🔐 Segurança

- Autenticação via JWT
- Senhas com hash seguro (bcrypt ou argon2)
- RBAC (roles e permissões)
- Rate limiting em endpoints críticos
- Proteção contra abuso de API

---

## 📡 Eventos e Integrações

O sistema deve ser preparado para:

- Webhooks externos
- Eventos internos (ex: order.created, payment.success)
- Retry automático de falhas
- Idempotência em operações críticas

---

## 📊 Observabilidade

- Logs estruturados (JSON)
- Correlation ID por request
- Logging de erros centralizado
- Endpoint de health check (/health)

---

## 🚀 Evolução da Arquitetura

O sistema deve ser evolutivo para:

### Fase 1
- Monólito modular
- PostgreSQL

### Fase 2
- Introdução de filas (Redis/RabbitMQ)
- Workers para tarefas pesadas

### Fase 3
- Extração de serviços críticos (ex: payments, webhooks)

---

## 📌 Decisão Arquitetural Base

> A prioridade do sistema é consistência e clareza antes de escala.

Performance e distribuição são decisões de fase futura, não iniciais.

---

## 🧠 Princípio Principal

> “É melhor um monólito bem estruturado do que uma arquitetura distribuída mal desenhada.”