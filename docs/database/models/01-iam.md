# Modelagem do Banco de Dados

# Módulo 01 — Identidade e Controle de Acesso (IAM)

Este módulo define as entidades responsáveis pela autenticação, autorização, sessões e auditoria do AtacaHub.

---

# Entidade 001 — User

## Descrição

Representa um usuário que possui acesso ao sistema.

## Tabela

`users`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| email | VARCHAR(255) | Sim | Deve ser único |
| password_hash | TEXT | Sim | Senha criptografada |
| first_name | VARCHAR(100) | Sim | Nome |
| last_name | VARCHAR(100) | Sim | Sobrenome |
| is_active | BOOLEAN | Sim | Usuário ativo |
| last_login_at | TIMESTAMP | Não | Último login |
| created_at | TIMESTAMP | Sim | Data de criação |
| updated_at | TIMESTAMP | Sim | Última atualização |
| deleted_at | TIMESTAMP | Não | Soft Delete |
| version | INTEGER | Sim | Controle de concorrência |

## Índices

- UNIQUE(email)
- INDEX(is_active)
- INDEX(deleted_at)

## Relacionamentos

- Um usuário pode possuir várias funções (Roles).
- Um usuário pode possuir várias sessões.
- Um usuário pode possuir vários Refresh Tokens.
- Um usuário pode gerar diversos registros de auditoria.

---

# Entidade 002 — Role

## Descrição

Representa um perfil de acesso utilizado pelo RBAC.

## Tabela

`roles`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(100) | Sim | Nome único |
| description | TEXT | Não | Descrição |
| is_system | BOOLEAN | Sim | Perfil interno |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |
| deleted_at | TIMESTAMP | Não | Soft Delete |

## Índices

- UNIQUE(name)

## Exemplos

- Administrador
- Gerente
- Operador
- Estoquista
- Financeiro
- Cliente

## Relacionamentos

- Uma Role possui várias Permissions.
- Uma Role pode ser atribuída a vários usuários.

---

# Entidade 003 — Permission

## Descrição

Representa uma permissão individual do sistema.

## Tabela

`permissions`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| code | VARCHAR(150) | Sim | Código único |
| name | VARCHAR(150) | Sim | Nome |
| description | TEXT | Não | |
| resource | VARCHAR(100) | Sim | Recurso |
| action | VARCHAR(50) | Sim | Ação |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- UNIQUE(code)
- INDEX(resource)

## Exemplos

- users.create
- users.read
- users.update
- users.delete
- products.create
- products.read
- inventory.adjust
- orders.approve

## Relacionamentos

- Uma Permission pode pertencer a várias Roles.

---

# Entidade 004 — UserRole

## Descrição

Tabela de relacionamento entre usuários e funções.

## Tabela

`user_roles`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| user_id | UUID | Sim | FK users |
| role_id | UUID | Sim | FK roles |
| assigned_at | TIMESTAMP | Sim | Data da atribuição |
| assigned_by | UUID | Não | Usuário responsável |

## Chave Primária

- (user_id, role_id)

## Relacionamentos

- user_id → users.id
- role_id → roles.id
- assigned_by → users.id

---

# Entidade 005 — RolePermission

## Descrição

Relaciona perfis de acesso às permissões disponíveis.

## Tabela

`role_permissions`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| role_id | UUID | Sim | FK roles |
| permission_id | UUID | Sim | FK permissions |
| granted_at | TIMESTAMP | Sim | Data da concessão |

## Chave Primária

- (role_id, permission_id)

## Relacionamentos

- role_id → roles.id
- permission_id → permissions.id

---

# Entidade 006 — RefreshToken

## Descrição

Armazena os Refresh Tokens utilizados na autenticação.

## Tabela

`refresh_tokens`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| user_id | UUID | Sim | FK users |
| token_hash | TEXT | Sim | Hash do Refresh Token |
| expires_at | TIMESTAMP | Sim | Expiração |
| revoked_at | TIMESTAMP | Não | Revogação |
| created_at | TIMESTAMP | Sim | Criação |

## Índices

- INDEX(user_id)
- INDEX(expires_at)

## Relacionamentos

- user_id → users.id

---

# Entidade 007 — Session

## Descrição

Representa uma sessão ativa do usuário.

## Tabela

`sessions`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| user_id | UUID | Sim | FK users |
| ip_address | VARCHAR(45) | Não | IPv4 ou IPv6 |
| user_agent | TEXT | Não | Navegador/Aplicação |
| device_name | VARCHAR(255) | Não | Nome do dispositivo |
| last_activity_at | TIMESTAMP | Sim | Última atividade |
| created_at | TIMESTAMP | Sim | Criação |
| expires_at | TIMESTAMP | Sim | Expiração |
| revoked_at | TIMESTAMP | Não | Revogação |

## Índices

- INDEX(user_id)
- INDEX(expires_at)

## Relacionamentos

- user_id → users.id

---

# Entidade 008 — AuditLog

## Descrição

Registra eventos relevantes do sistema para auditoria.

## Tabela

`audit_logs`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| user_id | UUID | Não | FK users |
| entity_type | VARCHAR(100) | Sim | Entidade afetada |
| entity_id | UUID | Não | Registro afetado |
| action | VARCHAR(50) | Sim | Ação realizada |
| old_values | JSONB | Não | Valores anteriores |
| new_values | JSONB | Não | Valores atuais |
| ip_address | VARCHAR(45) | Não | IP de origem |
| created_at | TIMESTAMP | Sim | Data do evento |

## Exemplos de ações

- USER_CREATED
- USER_UPDATED
- PRODUCT_UPDATED
- ORDER_CANCELLED
- STOCK_ADJUSTED

## Relacionamentos

- user_id → users.id

---

# Convenções do Módulo

## Chaves Primárias

- Todas as tabelas utilizarão UUID como chave primária.

## Soft Delete

Será utilizado apenas em entidades de negócio.

Exemplos:

- users
- roles
- customers
- products

Não será utilizado em tabelas de relacionamento ou auditoria.

## Controle de Concorrência

Entidades de negócio poderão utilizar o campo `version` para controle otimista de concorrência.

## JSONB

Será utilizado apenas quando houver necessidade de armazenar estruturas flexíveis, como registros de auditoria.