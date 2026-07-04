# Modelagem do Banco de Dados

# Módulo 05 — Pedidos (OMS - Order Management System)

Este módulo define as entidades responsáveis pelo gerenciamento completo dos pedidos da plataforma. O OMS controla o ciclo de vida do pedido, seus itens, alterações de status e cancelamentos.

O pedido é o núcleo operacional do sistema, integrando Clientes, Estoque, Pagamentos, Promoções, Notificações e Auditoria.

---

# Entidade 031 — Order

## Descrição

Representa um pedido realizado por um cliente.

## Tabela

`orders`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| customer_id | UUID | Sim | FK customers |
| order_number | BIGINT | Sim | Número sequencial único |
| status | VARCHAR(30) | Sim | Status atual |
| subtotal | NUMERIC(12,2) | Sim | Soma dos itens |
| discount_total | NUMERIC(12,2) | Sim | Total de descontos |
| shipping_total | NUMERIC(12,2) | Sim | Valor do frete |
| tax_total | NUMERIC(12,2) | Sim | Impostos |
| total | NUMERIC(12,2) | Sim | Valor final |
| notes | TEXT | Não | Observações |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |
| cancelled_at | TIMESTAMP | Não | Cancelamento |
| version | INTEGER | Sim | Controle de concorrência |

## Índices

- UNIQUE(order_number)
- INDEX(customer_id)
- INDEX(status)
- INDEX(created_at)

## Relacionamentos

- Um Order pertence a um Customer.
- Um Order possui vários OrderItems.
- Um Order possui um histórico de status.
- Um Order poderá possuir um ou mais pagamentos.
- Um Order poderá gerar reservas de estoque.

---

# Entidade 032 — OrderItem

## Descrição

Representa um item pertencente ao pedido.

## Tabela

`order_items`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| order_id | UUID | Sim | FK orders |
| product_variant_id | UUID | Sim | FK product_variants |
| quantity | INTEGER | Sim | Quantidade |
| unit_price | NUMERIC(12,2) | Sim | Preço unitário |
| discount | NUMERIC(12,2) | Sim | Desconto aplicado |
| total | NUMERIC(12,2) | Sim | Total do item |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(order_id)
- INDEX(product_variant_id)

## Relacionamentos

- order_id → orders.id
- product_variant_id → product_variants.id

---

# Entidade 033 — OrderStatusHistory

## Descrição

Armazena todas as alterações de status de um pedido.

## Tabela

`order_status_history`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| order_id | UUID | Sim | FK orders |
| previous_status | VARCHAR(30) | Não | Status anterior |
| current_status | VARCHAR(30) | Sim | Novo status |
| changed_by | UUID | Não | FK users |
| notes | TEXT | Não | Observações |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(order_id)
- INDEX(current_status)

## Relacionamentos

- order_id → orders.id
- changed_by → users.id

---

# Entidade 034 — OrderCancellation

## Descrição

Registra informações sobre o cancelamento de um pedido.

## Tabela

`order_cancellations`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| order_id | UUID | Sim | FK orders |
| cancelled_by | UUID | Não | FK users |
| reason | TEXT | Sim | Motivo do cancelamento |
| refund_required | BOOLEAN | Sim | Necessita estorno |
| cancelled_at | TIMESTAMP | Sim | Data do cancelamento |

## Índices

- UNIQUE(order_id)

## Relacionamentos

- order_id → orders.id
- cancelled_by → users.id

---

# Convenções do Módulo

## Numeração dos Pedidos

O campo `order_number` será um número sequencial utilizado para identificação comercial do pedido.

O UUID continuará sendo a chave primária interna.

## Histórico

Nenhuma alteração de status substituirá o status anterior.

Todas as mudanças deverão ser registradas na tabela `order_status_history`.

## Cancelamento

O cancelamento de um pedido não excluirá registros do banco.

As informações serão preservadas para auditoria e emissão de relatórios.

## Valores Monetários

Todos os valores financeiros utilizarão o tipo `NUMERIC(12,2)`.

## Evolução

A estrutura deverá permitir inclusão futura de:

- Múltiplos pagamentos
- Múltiplas entregas por pedido
- Separação por depósito
- Devoluções
- Trocas
- Faturamento parcial
- Expedição parcial
- Marketplace
- Dropshipping
- Assinaturas

---

