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

| Campo              | Tipo         | Obrigatório | Observação               |
| ------------------ | ------------ | ----------- | ------------------------ |
| id                 | UUID         | Sim         | Chave Primária           |
| user_id            | UUID         | Sim         | FK users (UNIQUE)        |
| customer_group_id  | UUID         | Não         | FK customer_groups       |
| default_address_id | UUID         | Não         | FK customer_addresses    |
| first_name         | VARCHAR(100) | Sim         | Nome                     |
| last_name          | VARCHAR(100) | Sim         | Sobrenome                |
| company_name       | VARCHAR(255) | Não         | Pessoa Jurídica          |
| birth_date         | DATE         | Não         | Data de nascimento       |
| notes              | TEXT         | Não         | Observações internas     |
| created_at         | TIMESTAMP    | Sim         |                          |
| updated_at         | TIMESTAMP    | Sim         |                          |
| deleted_at         | TIMESTAMP    | Não         | Soft Delete              |
| version            | INTEGER      | Sim         | Controle de concorrência |


## Índices
- UNIQUE(user_id)
- INDEX(customer_group_id)
- INDEX(default_address_id)
- INDEX(deleted_at)

## Relacionamentos

- Customer → User (1:1)
- Customer → CustomerGroup (N:1)
- Customer → CustomerAddress (1:N)
- Customer → CustomerContact (1:N)
- Customer → CustomerDocument (1:N)
- Customer → Order (1:N)

---

# Entidade 010 — CustomerAddress

## Descrição

Representa um endereço pertencente a um cliente.

## Tabela

`customer_addresses`

## Campos

| Campo          | Tipo         | Obrigatório | Observação               |
| -------------- | ------------ | ----------- | ------------------------ |
| id             | UUID         | Sim         | Chave Primária           |
| customer_id    | UUID         | Sim         | FK customers             |
| label          | VARCHAR(100) | Sim         | Casa, Trabalho...        |
| recipient_name | VARCHAR(255) | Sim         | Destinatário             |
| phone          | VARCHAR(30)  | Não         | Telefone da entrega      |
| postal_code    | VARCHAR(20)  | Sim         | CEP                      |
| street         | VARCHAR(255) | Sim         | Rua                      |
| number         | VARCHAR(20)  | Sim         | Número                   |
| complement     | VARCHAR(255) | Não         | Complemento              |
| reference      | VARCHAR(255) | Não         | Ponto de referência      |
| neighborhood   | VARCHAR(150) | Sim         | Bairro                   |
| city           | VARCHAR(150) | Sim         | Cidade                   |
| state          | VARCHAR(100) | Sim         | Estado                   |
| country        | VARCHAR(100) | Sim         | País                     |
| created_at     | TIMESTAMP    | Sim         |                          |
| updated_at     | TIMESTAMP    | Sim         |                          |
| deleted_at     | TIMESTAMP    | Não         | Soft Delete              |
| version        | INTEGER      | Sim         | Controle de concorrência |

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

| Campo       | Tipo         | Obrigatório | Observação                   |
| ----------- | ------------ | ----------- | ---------------------------- |
| id          | UUID         | Sim         | Chave Primária               |
| customer_id | UUID         | Sim         | FK customers                 |
| type        | VARCHAR(30)  | Sim         | PHONE, WHATSAPP, TELEGRAM... |
| value       | VARCHAR(255) | Sim         | Valor                        |
| is_primary  | BOOLEAN      | Sim         | Contato principal            |
| verified_at | TIMESTAMP    | Não         | Verificado                   |
| created_at  | TIMESTAMP    | Sim         |                              |
| updated_at  | TIMESTAMP    | Sim         |                              |
| version     | INTEGER      | Sim         | Controle de concorrência     |


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

| Campo       | Tipo         | Obrigatório | Observação               |
| ----------- | ------------ | ----------- | ------------------------ |
| id          | UUID         | Sim         | Chave Primária           |
| customer_id | UUID         | Sim         | FK customers             |
| type        | VARCHAR(30)  | Sim         | CPF, CNPJ...             |
| document    | VARCHAR(30)  | Sim         | Documento                |
| issued_by   | VARCHAR(100) | Não         | Órgão emissor            |
| is_primary  | BOOLEAN      | Sim         | Documento principal      |
| verified_at | TIMESTAMP    | Não         | Documento validado       |
| created_at  | TIMESTAMP    | Sim         |                          |
| updated_at  | TIMESTAMP    | Sim         |                          |
| version     | INTEGER      | Sim         | Controle de concorrência |


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

| Campo               | Tipo         | Obrigatório | Observação               |
| ------------------- | ------------ | ----------- | ------------------------ |
| id                  | UUID         | Sim         | Chave Primária           |
| name                | VARCHAR(100) | Sim         | Nome                     |
| description         | TEXT         | Não         |                          |
| discount_percentage | NUMERIC(5,2) | Não         | Desconto padrão          |
| is_active           | BOOLEAN      | Sim         | Grupo ativo              |
| created_at          | TIMESTAMP    | Sim         |                          |
| updated_at          | TIMESTAMP    | Sim         |                          |
| deleted_at          | TIMESTAMP    | Não         | Soft Delete              |
| version             | INTEGER      | Sim         | Controle de concorrência |

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

