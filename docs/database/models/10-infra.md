# Modelagem do Banco de Dados

# Módulo 10 — Infraestrutura e Serviços de Suporte

Este módulo define as entidades responsáveis pelos serviços transversais da plataforma. Essas entidades não pertencem a um domínio específico do negócio, mas dão suporte a todos os demais módulos, fornecendo auditoria, logs, armazenamento de arquivos, integrações, webhooks e tarefas agendadas.

---

# Entidade 052 — AuditLog

## Descrição

Registra todas as ações relevantes realizadas no sistema para fins de auditoria, rastreabilidade e conformidade.

## Tabela

`audit_logs`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| user_id | UUID | Não | FK users |
| entity_type | VARCHAR(100) | Sim | Entidade afetada |
| entity_id | UUID | Não | Registro afetado |
| action | VARCHAR(100) | Sim | Ação executada |
| old_data | JSONB | Não | Valores anteriores |
| new_data | JSONB | Não | Valores posteriores |
| ip_address | VARCHAR(45) | Não | IPv4 ou IPv6 |
| user_agent | TEXT | Não | Navegador ou aplicação |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(user_id)
- INDEX(entity_type)
- INDEX(entity_id)
- INDEX(action)
- INDEX(created_at)

## Relacionamentos

- user_id → users.id

---

# Entidade 053 — SystemLog

## Descrição

Armazena eventos técnicos gerados pela aplicação para diagnóstico e monitoramento.

## Tabela

`system_logs`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| level | VARCHAR(20) | Sim | Trace, Debug, Info, Warn, Error, Fatal |
| service | VARCHAR(100) | Sim | Serviço responsável |
| message | TEXT | Sim | Mensagem |
| context | JSONB | Não | Dados adicionais |
| stack_trace | TEXT | Não | Stack Trace |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(level)
- INDEX(service)
- INDEX(created_at)

---

# Entidade 054 — File

## Descrição

Representa um arquivo armazenado pelo sistema.

## Tabela

`files`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| original_name | VARCHAR(255) | Sim | Nome original |
| stored_name | VARCHAR(255) | Sim | Nome interno |
| mime_type | VARCHAR(100) | Sim | Tipo MIME |
| extension | VARCHAR(20) | Sim | Extensão |
| size | BIGINT | Sim | Tamanho em bytes |
| storage_provider | VARCHAR(50) | Sim | Local, S3, MinIO etc. |
| path | TEXT | Sim | Caminho do arquivo |
| checksum | VARCHAR(128) | Não | Hash do arquivo |
| uploaded_by | UUID | Não | FK users |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(uploaded_by)
- INDEX(storage_provider)
- INDEX(checksum)

## Relacionamentos

- uploaded_by → users.id

---

# Entidade 055 — Webhook

## Descrição

Representa um endpoint cadastrado para receber eventos do sistema.

## Tabela

`webhooks`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(150) | Sim | Nome |
| url | TEXT | Sim | Endpoint |
| secret | TEXT | Não | Segredo para assinatura |
| events | JSONB | Sim | Eventos assinados |
| is_active | BOOLEAN | Sim | |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- INDEX(is_active)

---

# Entidade 056 — WebhookDelivery

## Descrição

Registra cada tentativa de envio de um webhook.

## Tabela

`webhook_deliveries`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| webhook_id | UUID | Sim | FK webhooks |
| event_name | VARCHAR(100) | Sim | Evento |
| payload | JSONB | Sim | Conteúdo enviado |
| response_status | INTEGER | Não | HTTP Status |
| response_body | TEXT | Não | Resposta |
| delivered_at | TIMESTAMP | Não | |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(webhook_id)
- INDEX(event_name)
- INDEX(delivered_at)

## Relacionamentos

- webhook_id → webhooks.id

---

# Entidade 057 — ScheduledTask

## Descrição

Representa tarefas executadas automaticamente pelo Scheduler da plataforma.

## Tabela

`scheduled_tasks`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(150) | Sim | Nome |
| cron_expression | VARCHAR(100) | Sim | Expressão CRON |
| status | VARCHAR(30) | Sim | Ativa, Pausada, Executando |
| last_execution_at | TIMESTAMP | Não | Última execução |
| next_execution_at | TIMESTAMP | Não | Próxima execução |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- INDEX(status)
- INDEX(next_execution_at)

---

# Entidade 058 — Integration

## Descrição

Representa uma integração configurada com sistemas externos.

## Tabela

`integrations`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(150) | Sim | Nome |
| type | VARCHAR(50) | Sim | ERP, Marketplace, API etc. |
| configuration | JSONB | Sim | Configuração da integração |
| is_active | BOOLEAN | Sim | |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- INDEX(type)
- INDEX(is_active)

---

# Convenções do Módulo

## Auditoria

Os registros de auditoria nunca deverão ser alterados ou excluídos.

## Logs

Os logs poderão seguir políticas de retenção configuráveis para evitar crescimento excessivo do banco de dados.

## Arquivos

A tabela `files` armazenará apenas os metadados. Os arquivos físicos poderão ser armazenados em disco local ou serviços compatíveis com S3.

## Webhooks

Cada tentativa de entrega deverá ser registrada independentemente do resultado, permitindo reenvios e auditoria.

## Scheduler

As tarefas agendadas deverão registrar datas de execução e permitir pausas sem perda da configuração.

## Integrações

Cada integração deverá manter suas configurações isoladas, permitindo a inclusão de novos provedores sem alterações estruturais no banco.

## Evolução

A estrutura deverá permitir inclusão futura de:

- Versionamento de arquivos
- CDN
- Assinatura digital de arquivos
- Retry automático de Webhooks
- Dead Letter Queue
- Scheduler distribuído
- Monitoramento de integrações
- Histórico de sincronizações
- Métricas de execução
- Health Checks

---

# 📌 Modelagem Inicial Concluída

Com estes dez módulos, a modelagem inicial do banco de dados cobre os principais domínios do sistema:

- IAM
- Clientes
- Catálogo
- Estoque (WMS)
- Pedidos (OMS)
- Checkout
- Pagamentos
- Promoções
- Administração e Configurações
- Infraestrutura e Serviços de Suporte

Esta estrutura servirá como base para a criação das migrations com `node-pg-migrate`, implementação das entidades de domínio, repositórios utilizando `pg` puro e evolução futura da plataforma.