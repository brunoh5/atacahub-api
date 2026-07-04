# Modelagem do Banco de Dados

# Módulo 02 — Clientes (Customer)

Este módulo define as entidades responsáveis pelo gerenciamento dos clientes cadastrados na plataforma. Os clientes poderão realizar pedidos, possuir múltiplos endereços, documentos, contatos e pertencer a grupos específicos para fins comerciais.

---

# Entidade 009 — Customer

## Descrição

Representa um cliente cadastrado no sistema.

## Tabela

`customers`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| customer_group_id | UUID | Não | Grupo do cliente |
| first_name | VARCHAR(100) | Sim | Nome |
| last_name | VARCHAR(100) | Sim | Sobrenome |
| company_name | VARCHAR(255) | Não | Empresa (Pessoa Jurídica) |
| birth_date | DATE | Não | Data de nascimento |
| is_active | BOOLEAN | Sim | Cliente ativo |
| notes | TEXT | Não | Observações internas |
| created_at | TIMESTAMP | Sim | Data de criação |
| updated_at | TIMESTAMP | Sim | Última atualização |
| deleted_at | TIMESTAMP | Não | Soft Delete |
| version | INTEGER | Sim | Controle de concorrência |

## Índices

- INDEX(customer_group_id)
- INDEX(is_active)
- INDEX(deleted_at)

## Relacionamentos

- Um Customer pode possuir vários endereços.
- Um Customer pode possuir vários contatos.
- Um Customer pode possuir vários documentos.
- Um Customer pertence a, no máximo, um CustomerGroup.
- Um Customer poderá possuir vários pedidos.

---

# Entidade 010 — CustomerAddress

## Descrição

Representa um endereço pertencente a um cliente.

## Tabela

`customer_addresses`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| customer_id | UUID | Sim | FK customers |
| label | VARCHAR(100) | Sim | Ex.: Casa, Trabalho |
| recipient_name | VARCHAR(255) | Sim | Destinatário |
| postal_code | VARCHAR(20) | Sim | CEP |
| street | VARCHAR(255) | Sim | Rua |
| number | VARCHAR(20) | Sim | Número |
| complement | VARCHAR(255) | Não | Complemento |
| neighborhood | VARCHAR(150) | Sim | Bairro |
| city | VARCHAR(150) | Sim | Cidade |
| state | VARCHAR(100) | Sim | Estado |
| country | VARCHAR(100) | Sim | País |
| is_default | BOOLEAN | Sim | Endereço padrão |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |
| deleted_at | TIMESTAMP | Não | Soft Delete |

## Índices

- INDEX(customer_id)
- INDEX(postal_code)

## Relacionamentos

- customer_id → customers.id

---

# Entidade 011 — CustomerContact

## Descrição

Representa um meio de contato do cliente.

## Tabela

`customer_contacts`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| customer_id | UUID | Sim | FK customers |
| type | VARCHAR(30) | Sim | Email, Telefone, WhatsApp |
| value | VARCHAR(255) | Sim | Valor do contato |
| is_primary | BOOLEAN | Sim | Contato principal |
| verified_at | TIMESTAMP | Não | Data da verificação |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- INDEX(customer_id)
- INDEX(type)

## Relacionamentos

- customer_id → customers.id

---

# Entidade 012 — CustomerDocument

## Descrição

Armazena os documentos vinculados ao cliente.

## Tabela

`customer_documents`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| customer_id | UUID | Sim | FK customers |
| type | VARCHAR(30) | Sim | CPF, CNPJ, RG, IE |
| document | VARCHAR(30) | Sim | Número do documento |
| issued_by | VARCHAR(100) | Não | Órgão emissor |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- UNIQUE(type, document)
- INDEX(customer_id)

## Relacionamentos

- customer_id → customers.id

---

# Entidade 013 — CustomerGroup

## Descrição

Agrupa clientes com características comerciais semelhantes.

## Tabela

`customer_groups`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(100) | Sim | Nome do grupo |
| description | TEXT | Não | Descrição |
| discount_percentage | NUMERIC(5,2) | Não | Desconto padrão |
| is_active | BOOLEAN | Sim | Grupo ativo |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |
| deleted_at | TIMESTAMP | Não | Soft Delete |

## Índices

- UNIQUE(name)

## Exemplos

- Cliente Comum
- Cliente Atacadista
- Revendedor
- Parceiro
- VIP

## Relacionamentos

- Um CustomerGroup pode possuir vários Customers.

---

# Convenções do Módulo

## Exclusão Lógica

As entidades Customer, CustomerAddress e CustomerGroup utilizarão Soft Delete.

CustomerContact e CustomerDocument permanecerão disponíveis para histórico, podendo ser desativados conforme regras de negócio.

## Integridade

Nenhum pedido deverá perder a referência ao cliente mesmo que ele seja desativado.

## Evolução

A estrutura deverá permitir inclusão futura de:

- Limite de crédito
- Classificação fiscal
- Programa de fidelidade
- Cashback
- Múltiplos documentos internacionais
- Preferências de comunicação

---

