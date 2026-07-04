# Estrutura da pasta `/docs`

A pasta `/docs` concentra toda a documentação técnica do projeto **AtacaHub API**. O objetivo é manter todos os artefatos de arquitetura, requisitos e decisões organizados de forma padronizada.

```
docs/
│
├── README.md                    # Índice da documentação
├── roadmap.md                   # Roadmap do projeto
├── arquitetura.md               # Visão geral da arquitetura
│
├── rf/
│   └── README.md                # Requisitos Funcionais
│
├── rnf/
│   └── README.md                # Requisitos Não Funcionais
│
├── adr/
│   ├── README.md
│   └── ADR-XXX.md
│
├── domain/
│   ├── entidades.md
│   ├── agregados.md
│   ├── value-objects.md
│   ├── eventos.md
│   └── bounded-contexts.md
│
├── database/
│   ├── modelo-relacional.md
│   ├── convencoes.md
│   ├── migrations.md
│   ├── indexes.md
│   ├── seeds.md
│   └── diagramas/
│
├── diagrams/
│   ├── c4/
│   ├── er/
│   ├── sequence/
│   ├── activity/
│   ├── deployment/
│   └── component/
│
├── api/
│   ├── convencoes.md
│   ├── autenticacao.md
│   ├── versionamento.md
│   ├── paginacao.md
│   ├── filtros.md
│   ├── erros.md
│   └── openapi/
│
├── modules/
│   ├── auth.md
│   ├── users.md
│   ├── customers.md
│   ├── catalog.md
│   ├── inventory.md
│   ├── orders.md
│   ├── checkout.md
│   ├── payment.md
│   ├── promotions.md
│   ├── dashboard.md
│   ├── notifications.md
│   └── integrations.md
│
├── architecture/
│   ├── layers.md
│   ├── dependency-rules.md
│   ├── repositories.md
│   ├── services.md
│   ├── events.md
│   ├── cache.md
│   ├── messaging.md
│   ├── scheduler.md
│   └── uploads.md
│
├── security/
│   ├── authentication.md
│   ├── authorization.md
│   ├── jwt.md
│   ├── permissions.md
│   ├── encryption.md
│   └── secrets.md
│
├── infrastructure/
│   ├── docker.md
│   ├── docker-compose.md
│   ├── environments.md
│   ├── deployment.md
│   ├── backup.md
│   └── monitoring.md
│
├── testing/
│   ├── strategy.md
│   ├── unit.md
│   ├── integration.md
│   ├── e2e.md
│   ├── performance.md
│   └── load.md
│
├── standards/
│   ├── naming.md
│   ├── commits.md
│   ├── branches.md
│   ├── code-style.md
│   └── reviews.md
│
└── changelog/
    └── CHANGELOG.md
```

## Organização

A documentação é dividida por responsabilidade:

- **rf/**: Requisitos Funcionais.
- **rnf/**: Requisitos Não Funcionais.
- **adr/**: Decisões arquiteturais.
- **domain/**: Modelo de domínio e conceitos de negócio.
- **database/**: Estrutura e convenções do banco de dados.
- **diagrams/**: Diagramas técnicos da aplicação.
- **api/**: Convenções e especificações da API.
- **modules/**: Documentação funcional de cada módulo.
- **architecture/**: Estrutura técnica da aplicação.
- **security/**: Estratégias de segurança.
- **infrastructure/**: Infraestrutura, containers e deploy.
- **testing/**: Estratégia de testes.
- **standards/**: Padrões adotados no projeto.
- **changelog/**: Histórico de versões e alterações.

## Objetivos

Esta organização busca:

- Facilitar a navegação pela documentação.
- Reduzir duplicidade de informações.
- Manter cada assunto isolado em seu próprio contexto.
- Facilitar futuras expansões do projeto.
- Servir como referência durante todo o desenvolvimento do AtacaHub API.