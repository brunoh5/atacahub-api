# Modelagem do Banco de Dados

# Módulo 09 — Administração e Configurações

Este módulo define as entidades responsáveis pela administração da plataforma. Ele permite configurar parâmetros do sistema, controlar funcionalidades através de Feature Flags, gerenciar notificações, templates reutilizáveis e chaves de integração utilizadas por aplicações externas.

---

# Entidade 047 — SystemSetting

## Descrição

Representa uma configuração global da plataforma.

## Tabela

`system_settings`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| key | VARCHAR(150) | Sim | Chave da configuração |
| value | JSONB | Sim | Valor da configuração |
| description | TEXT | Não | Descrição |
| is_public | BOOLEAN | Sim | Pode ser exposta pela API |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- UNIQUE(key)
- INDEX(is_public)

## Exemplos

- company.name
- company.document
- company.email
- order.expiration_minutes
- inventory.allow_negative_stock
- payment.pix.expiration_minutes

## Relacionamentos

- Não possui relacionamentos diretos.

---

# Entidade 048 — FeatureFlag

## Descrição

Controla funcionalidades que podem ser ativadas ou desativadas sem necessidade de deploy.

## Tabela

`feature_flags`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| key | VARCHAR(150) | Sim | Identificador único |
| name | VARCHAR(150) | Sim | Nome da funcionalidade |
| description | TEXT | Não | |
| enabled | BOOLEAN | Sim | Funcionalidade ativa |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- UNIQUE(key)
- INDEX(enabled)

## Exemplos

- checkout.enabled
- cashback.enabled
- pix.enabled
- reports.enabled
- maintenance.mode

---

# Entidade 049 — Notification

## Descrição

Representa uma notificação enviada ao usuário ou cliente.

## Tabela

`notifications`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| user_id | UUID | Não | FK users |
| customer_id | UUID | Não | FK customers |
| template_id | UUID | Não | FK notification_templates |
| channel | VARCHAR(30) | Sim | Email, SMS, Push, WhatsApp |
| subject | VARCHAR(255) | Não | Assunto |
| content | TEXT | Sim | Conteúdo enviado |
| status | VARCHAR(30) | Sim | Pendente, Enviada, Falhou |
| sent_at | TIMESTAMP | Não | Data do envio |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(user_id)
- INDEX(customer_id)
- INDEX(status)
- INDEX(channel)

## Relacionamentos

- user_id → users.id
- customer_id → customers.id
- template_id → notification_templates.id

---

# Entidade 050 — NotificationTemplate

## Descrição

Representa um modelo reutilizável para envio de notificações.

## Tabela

`notification_templates`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(150) | Sim | Nome |
| code | VARCHAR(100) | Sim | Código único |
| channel | VARCHAR(30) | Sim | Canal |
| subject | VARCHAR(255) | Não | Assunto padrão |
| body | TEXT | Sim | Template |
| is_active | BOOLEAN | Sim | |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- UNIQUE(code)
- INDEX(channel)

## Exemplos

- ORDER_CREATED
- ORDER_PAID
- ORDER_SHIPPED
- PASSWORD_RESET
- WELCOME_EMAIL

## Relacionamentos

- Um NotificationTemplate poderá ser utilizado por diversas Notifications.

---

# Entidade 051 — ApiKey

## Descrição

Representa uma chave de autenticação utilizada por sistemas externos para consumir a API.

## Tabela

`api_keys`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(150) | Sim | Nome da integração |
| api_key_hash | TEXT | Sim | Hash da chave |
| permissions | JSONB | Não | Escopos permitidos |
| expires_at | TIMESTAMP | Não | Expiração |
| last_used_at | TIMESTAMP | Não | Último uso |
| is_active | BOOLEAN | Sim | |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- INDEX(is_active)
- INDEX(expires_at)

## Relacionamentos

- Não possui relacionamentos diretos.

---

# Convenções do Módulo

## Configurações

As configurações globais deverão ser carregadas em memória utilizando cache para reduzir consultas ao banco de dados.

## Feature Flags

As Feature Flags permitirão habilitar ou desabilitar funcionalidades em tempo de execução, sem necessidade de reiniciar a aplicação.

## Notificações

O histórico de notificações deverá ser preservado para fins de auditoria e acompanhamento.

## API Keys

As chaves nunca deverão ser armazenadas em texto puro.

Apenas o hash da chave será persistido no banco de dados.

## Evolução

A estrutura deverá permitir inclusão futura de:

- Configurações por empresa
- Configurações por usuário
- Multi-tenant
- Feature Flags por cliente
- Versionamento de templates
- Filas de envio de notificações
- Rotação automática de API Keys
- Limites de requisições (Rate Limit) por API Key

---

