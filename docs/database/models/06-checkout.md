# Modelagem do Banco de Dados

# Módulo 06 — Checkout

Este módulo define as entidades responsáveis pelo processo de checkout da plataforma. O Checkout é responsável por transformar um carrinho de compras em um pedido, validando estoque, endereço de entrega, método de entrega e demais informações necessárias antes da confirmação da compra.

---

# Entidade 035 — Cart

## Descrição

Representa o carrinho de compras de um cliente.

## Tabela

`carts`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| customer_id | UUID | Não | FK customers |
| session_id | UUID | Não | FK sessions (carrinho de visitante) |
| status | VARCHAR(30) | Sim | Ativo, Convertido, Abandonado |
| expires_at | TIMESTAMP | Não | Expiração do carrinho |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- INDEX(customer_id)
- INDEX(session_id)
- INDEX(status)

## Relacionamentos

- Um Cart pode possuir vários CartItems.
- Um Cart poderá ser convertido em um Order.

---

# Entidade 036 — CartItem

## Descrição

Representa um item presente no carrinho de compras.

## Tabela

`cart_items`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| cart_id | UUID | Sim | FK carts |
| product_variant_id | UUID | Sim | FK product_variants |
| quantity | INTEGER | Sim | Quantidade |
| unit_price | NUMERIC(12,2) | Sim | Preço no momento da adição |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- INDEX(cart_id)
- INDEX(product_variant_id)

## Relacionamentos

- cart_id → carts.id
- product_variant_id → product_variants.id

---

# Entidade 037 — ShippingMethod

## Descrição

Representa um método de entrega disponível para o cliente.

## Tabela

`shipping_methods`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(150) | Sim | Nome do método |
| description | TEXT | Não | |
| estimated_days | INTEGER | Não | Prazo estimado |
| base_price | NUMERIC(12,2) | Sim | Valor base |
| is_active | BOOLEAN | Sim | Método ativo |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- UNIQUE(name)
- INDEX(is_active)

## Exemplos

- Retirada na Loja
- Entrega Própria
- Motoboy

## Relacionamentos

- Um ShippingMethod poderá ser utilizado em várias entregas.

---

# Entidade 038 — Delivery

## Descrição

Representa a entrega associada a um pedido.

## Tabela

`deliveries`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| order_id | UUID | Sim | FK orders |
| shipping_method_id | UUID | Sim | FK shipping_methods |
| customer_address_id | UUID | Sim | FK customer_addresses |
| tracking_code | VARCHAR(100) | Não | Código interno de rastreamento |
| status | VARCHAR(30) | Sim | Status da entrega |
| shipped_at | TIMESTAMP | Não | Data de envio |
| delivered_at | TIMESTAMP | Não | Data de entrega |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(order_id)
- INDEX(status)
- INDEX(shipping_method_id)

## Relacionamentos

- order_id → orders.id
- shipping_method_id → shipping_methods.id
- customer_address_id → customer_addresses.id

---

# Convenções do Módulo

## Carrinho

Cada cliente poderá possuir apenas um carrinho ativo.

Carrinhos abandonados poderão ser expirados automaticamente pelo Scheduler.

## Preços

O preço armazenado em `CartItem` representa apenas uma referência temporária.

Durante a criação do pedido, todos os valores deverão ser recalculados para garantir consistência.

## Estoque

A disponibilidade dos produtos deverá ser validada antes da confirmação do pedido.

A reserva definitiva será realizada pelo módulo de Estoque.

## Entrega

O módulo foi projetado para suportar futuras expansões, como múltiplas entregas para um único pedido.

## Evolução

A estrutura deverá permitir inclusão futura de:

- Entrega parcial
- Agendamento de entrega
- Janelas de entrega
- Retirada em loja
- Múltiplos endereços por pedido
- Rastreamento em tempo real
- Comprovante de entrega
- Assinatura do recebedor

---

