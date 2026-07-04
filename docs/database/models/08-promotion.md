# Modelagem do Banco de Dados

# Módulo 08 — Promoções (Promotion Service)

Este módulo define as entidades responsáveis pelas campanhas promocionais da plataforma. Ele centraliza regras de desconto, cupons, programas de cashback e seus respectivos históricos, mantendo essas funcionalidades desacopladas do Checkout e do OMS.

---

# Entidade 043 — Promotion

## Descrição

Representa uma campanha promocional disponível para aplicação durante o processo de compra.

## Tabela

`promotions`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(150) | Sim | Nome da campanha |
| description | TEXT | Não | Descrição |
| discount_type | VARCHAR(30) | Sim | Percentual, Valor Fixo, Frete etc. |
| discount_value | NUMERIC(12,2) | Sim | Valor do desconto |
| minimum_order_value | NUMERIC(12,2) | Não | Valor mínimo do pedido |
| starts_at | TIMESTAMP | Sim | Início da campanha |
| ends_at | TIMESTAMP | Não | Fim da campanha |
| is_active | BOOLEAN | Sim | Campanha ativa |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- INDEX(is_active)
- INDEX(starts_at)
- INDEX(ends_at)

## Relacionamentos

- Uma Promotion poderá possuir diversos Coupons.

---

# Entidade 044 — Coupon

## Descrição

Representa um cupom promocional utilizado pelo cliente.

## Tabela

`coupons`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| promotion_id | UUID | Não | FK promotions |
| code | VARCHAR(100) | Sim | Código único |
| usage_limit | INTEGER | Não | Limite total de uso |
| usage_count | INTEGER | Sim | Quantidade utilizada |
| usage_limit_per_customer | INTEGER | Não | Limite por cliente |
| expires_at | TIMESTAMP | Não | Expiração |
| is_active | BOOLEAN | Sim | Cupom ativo |
| created_at | TIMESTAMP | Sim | |

## Índices

- UNIQUE(code)
- INDEX(promotion_id)
- INDEX(is_active)

## Relacionamentos

- coupon.promotion_id → promotions.id

---

# Entidade 045 — Cashback

## Descrição

Representa o saldo de cashback disponível para um cliente.

## Tabela

`cashbacks`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| customer_id | UUID | Sim | FK customers |
| available_balance | NUMERIC(12,2) | Sim | Saldo disponível |
| pending_balance | NUMERIC(12,2) | Sim | Saldo pendente |
| expired_balance | NUMERIC(12,2) | Sim | Saldo expirado |
| updated_at | TIMESTAMP | Sim | Última atualização |

## Índices

- UNIQUE(customer_id)

## Relacionamentos

- cashback.customer_id → customers.id
- Um Cashback possui várias CashbackTransactions.

---

# Entidade 046 — CashbackTransaction

## Descrição

Representa toda movimentação realizada no saldo de cashback.

## Tabela

`cashback_transactions`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| cashback_id | UUID | Sim | FK cashbacks |
| order_id | UUID | Não | FK orders |
| transaction_type | VARCHAR(30) | Sim | Crédito, Débito, Expiração, Ajuste |
| amount | NUMERIC(12,2) | Sim | Valor movimentado |
| expires_at | TIMESTAMP | Não | Data de expiração |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(cashback_id)
- INDEX(order_id)
- INDEX(transaction_type)

## Relacionamentos

- cashback_id → cashbacks.id
- order_id → orders.id

---

# Convenções do Módulo

## Promoções

Uma promoção poderá possuir diversas regras de aplicação e poderá ser reutilizada por vários cupons.

## Cupons

Os códigos dos cupons deverão ser únicos em todo o sistema.

O controle de utilização será realizado através dos campos de limite e contador de uso.

## Cashback

O saldo disponível será calculado a partir das movimentações registradas em `cashback_transactions`, podendo ser mantido de forma consolidada na tabela `cashbacks` para melhorar a performance.

## Histórico

Nenhuma movimentação de cashback deverá ser excluída fisicamente do banco de dados.

Todo histórico financeiro deverá ser preservado para auditoria.

## Evolução

A estrutura deverá permitir inclusão futura de:

- Campanhas automáticas
- Brindes
- Compre X e Leve Y
- Descontos progressivos
- Promoções por categoria
- Promoções por marca
- Promoções por cliente
- Programa de fidelidade
- Cashback por categoria
- Cashback promocional

---

