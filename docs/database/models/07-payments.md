# Modelagem do Banco de Dados

# Módulo 07 — Pagamentos (Payment Service)

Este módulo define as entidades responsáveis pelo processamento dos pagamentos da plataforma. O serviço de pagamentos controla os métodos disponíveis, os pagamentos realizados, as transações geradas e possíveis estornos.

O módulo foi projetado para suportar diferentes provedores de pagamento no futuro, mantendo o domínio desacoplado.

---

# Entidade 039 — Payment

## Descrição

Representa um pagamento vinculado a um pedido.

## Tabela

`payments`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| order_id | UUID | Sim | FK orders |
| payment_method_id | UUID | Sim | FK payment_methods |
| status | VARCHAR(30) | Sim | Status do pagamento |
| amount | NUMERIC(12,2) | Sim | Valor do pagamento |
| paid_at | TIMESTAMP | Não | Data da confirmação |
| expires_at | TIMESTAMP | Não | Expiração da cobrança |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- INDEX(order_id)
- INDEX(payment_method_id)
- INDEX(status)

## Relacionamentos

- Um Payment pertence a um Order.
- Um Payment utiliza um PaymentMethod.
- Um Payment pode possuir várias PaymentTransactions.
- Um Payment pode possuir vários Refunds.

---

# Entidade 040 — PaymentMethod

## Descrição

Representa um método de pagamento disponível no sistema.

## Tabela

`payment_methods`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(100) | Sim | Nome |
| code | VARCHAR(50) | Sim | Código interno |
| description | TEXT | Não | |
| is_active | BOOLEAN | Sim | Método ativo |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- UNIQUE(code)
- UNIQUE(name)

## Exemplos

- Dinheiro
- PIX
- Cartão de Crédito
- Cartão de Débito
- Boleto
- Transferência Bancária

## Relacionamentos

- Um PaymentMethod pode ser utilizado em diversos Payments.

---

# Entidade 041 — PaymentTransaction

## Descrição

Representa cada tentativa ou operação realizada durante o processamento de um pagamento.

## Tabela

`payment_transactions`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| payment_id | UUID | Sim | FK payments |
| provider | VARCHAR(100) | Não | Gateway ou provedor |
| transaction_code | VARCHAR(255) | Não | Código da transação |
| status | VARCHAR(30) | Sim | Status da transação |
| amount | NUMERIC(12,2) | Sim | Valor |
| response_data | JSONB | Não | Resposta do provedor |
| processed_at | TIMESTAMP | Não | Data do processamento |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(payment_id)
- INDEX(status)
- INDEX(transaction_code)

## Relacionamentos

- payment_id → payments.id

---

# Entidade 042 — Refund

## Descrição

Representa um estorno total ou parcial de um pagamento.

## Tabela

`refunds`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| payment_id | UUID | Sim | FK payments |
| amount | NUMERIC(12,2) | Sim | Valor estornado |
| reason | TEXT | Não | Motivo |
| status | VARCHAR(30) | Sim | Status do estorno |
| refunded_at | TIMESTAMP | Não | Data do estorno |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(payment_id)
- INDEX(status)

## Relacionamentos

- payment_id → payments.id

---

# Convenções do Módulo

## Pagamentos

Um pedido poderá possuir um ou mais pagamentos, permitindo futuras funcionalidades como pagamento dividido.

## Transações

Cada comunicação com um provedor de pagamento deverá gerar um registro em `payment_transactions`, preservando o histórico completo das operações.

## Estornos

Os estornos poderão ser totais ou parciais, conforme as regras de negócio e o método de pagamento utilizado.

## Histórico

Os registros de pagamentos, transações e estornos nunca deverão ser excluídos fisicamente do banco de dados.

## Evolução

A estrutura deverá permitir inclusão futura de:

- Múltiplos gateways de pagamento
- Parcelamento
- Pagamento recorrente
- Split de pagamento
- Conciliação financeira
- Webhooks de pagamento
- PIX dinâmico
- Link de pagamento
- Antecipação de recebíveis

---

