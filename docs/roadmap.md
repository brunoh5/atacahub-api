# Roadmap

> Versão: 1.0.0
>
> Última atualização: 03/07/2026

---

# Visão Geral

O desenvolvimento do **AtacaHub API** será realizado de forma incremental, priorizando a construção de uma base sólida antes da implementação das funcionalidades de negócio.

O sistema foi projetado para atender atacarejos, supermercados e distribuidores, servindo como núcleo para futuras integrações com aplicações Web, Mobile, Desktop e sistemas de terceiros.

Cada fase representa um conjunto de funcionalidades (Épicos) que podem ser desenvolvidas, testadas e implantadas de forma independente.

---

# Objetivos do Roadmap

- Construir uma API escalável.
- Priorizar qualidade e manutenibilidade.
- Garantir baixo acoplamento entre módulos.
- Facilitar futuras integrações.
- Permitir evolução para arquitetura distribuída.
- Simular um projeto corporativo.

---

# Fase 0 — Planejamento

## Objetivos

- Definição da arquitetura
- Modelagem inicial
- Organização da documentação
- Planejamento do produto

### Entregáveis

- [ ] README
- [ ] Roadmap
- [ ] RF
- [ ] RNF
- [ ] RN
- [ ] Casos de Uso
- [ ] Backlog
- [ ] Arquitetura
- [ ] Banco de Dados
- [ ] Convenções

---

# Fase 1 — Infraestrutura

## Objetivos

Preparar toda a infraestrutura de desenvolvimento.

### Entregáveis

- [ ] Node.js
- [ ] TypeScript
- [ ] Express
- [ ] Docker
- [ ] Docker Compose
- [ ] PostgreSQL
- [ ] Redis
- [ ] RabbitMQ
- [ ] MinIO
- [ ] Mailpit
- [ ] Variáveis de Ambiente
- [ ] Logger
- [ ] Health Check
- [ ] Configuração inicial do projeto

---

# Fase 2 — Banco de Dados

## Objetivos

Construção da camada de persistência.

### Entregáveis

- [ ] Drizzle ORM
- [ ] Migrations
- [ ] Seeds iniciais
- [ ] Índices
- [ ] Constraints
- [ ] Relacionamentos
- [ ] Auditoria

---

# Fase 3 — Autenticação

### Entregáveis

- [ ] Cadastro
- [ ] Login
- [ ] Logout
- [ ] JWT
- [ ] Refresh Token
- [ ] Recuperação de Senha
- [ ] Verificação de Email
- [ ] Sessões
- [ ] Dispositivos Conectados

---

# Fase 4 — Controle de Acesso

### Entregáveis

- [ ] RBAC
- [ ] Roles
- [ ] Permissões
- [ ] Middleware de Autorização

---

# Fase 5 — Cadastros Básicos

### Entregáveis

- [ ] Usuários
- [ ] Clientes
- [ ] Categorias
- [ ] Marcas
- [ ] Fornecedores
- [ ] Unidades de Medida
- [ ] Departamentos

---

# Fase 6 — Produtos

### Entregáveis

- [ ] Cadastro de Produtos
- [ ] SKU
- [ ] Código de Barras
- [ ] Slug
- [ ] Imagens
- [ ] Produtos Ativos/Inativos
- [ ] Produtos Relacionados
- [ ] Produtos Similares

---

# Fase 7 — Estoque

### Entregáveis

- [ ] Entradas
- [ ] Saídas
- [ ] Reservas
- [ ] Ajustes
- [ ] Inventário
- [ ] Estoque Mínimo
- [ ] Estoque Máximo
- [ ] Histórico

---

# Fase 8 — Compras

### Entregáveis

- [ ] Ordem de Compra
- [ ] Recebimento de Mercadorias
- [ ] Conferência
- [ ] Atualização Automática de Estoque

---

# Fase 9 — Importação

### Entregáveis

- [ ] Importação CSV
- [ ] Validação
- [ ] Processamento Assíncrono
- [ ] Worker RabbitMQ
- [ ] Relatório de Importação
- [ ] Histórico de Importações

---

# Fase 10 — Catálogo

### Entregáveis

- [ ] Pesquisa
- [ ] Filtros
- [ ] Ordenação
- [ ] Paginação
- [ ] Produtos em Destaque

---

# Fase 11 — Carrinho

### Entregáveis

- [ ] Carrinho
- [ ] Adicionar Produtos
- [ ] Atualizar Quantidade
- [ ] Remover Produtos
- [ ] Reserva de Estoque

---

# Fase 12 — Pedidos (OMS)

### Entregáveis

- [ ] Checkout
- [ ] Criação de Pedidos
- [ ] Aprovação
- [ ] Separação
- [ ] Expedição
- [ ] Entrega
- [ ] Cancelamento
- [ ] Linha do Tempo

---

# Fase 13 — Pagamentos

### Entregáveis

- [ ] Gateway Fake
- [ ] Interface de Gateway
- [ ] PIX (Simulado)
- [ ] Cartão (Simulado)
- [ ] Estornos

---

# Fase 14 — Promoções

### Entregáveis

- [ ] Cupons
- [ ] Promoções
- [ ] Campanhas
- [ ] Regras Promocionais

---

# Fase 15 — Upload de Arquivos

### Entregáveis

- [ ] Upload para MinIO
- [ ] Imagens
- [ ] Exclusão
- [ ] Versionamento

---

# Fase 16 — Cache

### Entregáveis

- [ ] Cache Redis
- [ ] Produtos
- [ ] Categorias
- [ ] Pesquisas
- [ ] Dashboard

---

# Fase 17 — Mensageria

### Entregáveis

- [ ] RabbitMQ
- [ ] Producers
- [ ] Consumers
- [ ] Retry
- [ ] Dead Letter Queue

---

# Fase 18 — Dashboard

### Entregáveis

- [ ] KPIs
- [ ] Produtos Mais Vendidos
- [ ] Clientes Ativos
- [ ] Receita
- [ ] Pedidos
- [ ] Estoque

---

# Fase 19 — Relatórios

### Entregáveis

- [ ] CSV
- [ ] XLSX
- [ ] PDF

---

# Fase 20 — Auditoria

### Entregáveis

- [ ] Histórico de Alterações
- [ ] Logs de Auditoria
- [ ] Responsável pela Alteração

---

# Fase 21 — Observabilidade

### Entregáveis

- [ ] Logs Estruturados
- [ ] Métricas
- [ ] OpenTelemetry
- [ ] Prometheus
- [ ] Grafana

---

# Fase 22 — Segurança

### Entregáveis

- [ ] Rate Limiting
- [ ] Helmet
- [ ] CORS
- [ ] Validação Global
- [ ] Sanitização
- [ ] API Keys
- [ ] Webhooks Seguros

---

# Fase 23 — Testes

### Entregáveis

- [ ] Testes Unitários
- [ ] Testes de Integração
- [ ] Testes End-to-End
- [ ] Cobertura de Código

---

# Fase 24 — Documentação

### Entregáveis

- [ ] Swagger
- [ ] OpenAPI
- [ ] Exemplos
- [ ] Guias de Uso

---

# Fase 25 — CI/CD

### Entregáveis

- [ ] GitHub Actions
- [ ] Lint
- [ ] Testes
- [ ] Build
- [ ] Docker Build

---

# Fase 26 — Deploy

### Entregáveis

- [ ] Docker Compose
- [ ] Ambiente de Produção
- [ ] Backup
- [ ] Monitoramento
- [ ] Logs

---

# Fase 27 — Evoluções Futuras

## Gestão Empresarial

- [ ] Multiempresa
- [ ] Multi Filiais
- [ ] Múltiplos Centros de Distribuição
- [ ] Múltiplos Estoques

## Logística

- [ ] Transferência entre Estoques
- [ ] Inventário Rotativo
- [ ] Controle de Lotes
- [ ] Controle de Validade
- [ ] Picking
- [ ] Packing

## Integrações

- [ ] Gateway de Pagamento Real
- [ ] Transportadoras
- [ ] Emissão de Nota Fiscal
- [ ] ERP
- [ ] Marketplaces

## Arquitetura

- [ ] Microsserviços
- [ ] Kubernetes
- [ ] API Gateway
- [ ] Service Discovery

## Performance

- [ ] Elasticsearch
- [ ] Cache Distribuído
- [ ] CDN para Arquivos

## Novas APIs

- [ ] GraphQL
- [ ] API Pública
- [ ] SDK JavaScript
- [ ] SDK TypeScript