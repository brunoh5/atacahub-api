# Modelagem do Banco de Dados

# Módulo 04 — Estoque (Inventory / WMS)

Este módulo define as entidades responsáveis pelo gerenciamento do estoque da plataforma. Ele controla depósitos, localizações físicas, quantidade disponível, reservas, movimentações, ajustes, transferências e inventários.

O estoque será controlado por **SKU (ProductVariant)**, nunca diretamente pelo produto.

---

# Entidade 023 — Warehouse

## Descrição

Representa um depósito, loja ou centro de distribuição onde os produtos são armazenados.

## Tabela

`warehouses`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(150) | Sim | Nome do depósito |
| code | VARCHAR(50) | Sim | Código único |
| description | TEXT | Não | |
| is_active | BOOLEAN | Sim | |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |
| deleted_at | TIMESTAMP | Não | Soft Delete |

## Índices

- UNIQUE(code)
- INDEX(is_active)

## Relacionamentos

- Um Warehouse possui várias WarehouseLocations.
- Um Warehouse possui diversos registros de Inventory.

---

# Entidade 024 — WarehouseLocation

## Descrição

Representa uma localização física dentro de um depósito.

## Tabela

`warehouse_locations`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| warehouse_id | UUID | Sim | FK warehouses |
| code | VARCHAR(100) | Sim | Ex.: A01-B02-C03 |
| description | VARCHAR(255) | Não | |
| is_active | BOOLEAN | Sim | |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- UNIQUE(warehouse_id, code)
- INDEX(warehouse_id)

## Relacionamentos

- warehouse_id → warehouses.id

---

# Entidade 025 — Inventory

## Descrição

Controla a quantidade disponível de cada SKU em um depósito.

## Tabela

`inventories`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| warehouse_id | UUID | Sim | FK warehouses |
| warehouse_location_id | UUID | Não | FK warehouse_locations |
| product_variant_id | UUID | Sim | FK product_variants |
| quantity_available | INTEGER | Sim | Quantidade disponível |
| quantity_reserved | INTEGER | Sim | Quantidade reservada |
| minimum_stock | INTEGER | Não | Estoque mínimo |
| maximum_stock | INTEGER | Não | Estoque máximo |
| updated_at | TIMESTAMP | Sim | Última atualização |
| version | INTEGER | Sim | Controle de concorrência |

## Índices

- UNIQUE(warehouse_id, warehouse_location_id, product_variant_id)
- INDEX(product_variant_id)

## Relacionamentos

- Inventory pertence a um Warehouse.
- Inventory pertence a uma ProductVariant.
- Inventory pode possuir diversas reservas e movimentações.

---

# Entidade 026 — InventoryReservation

## Descrição

Representa uma reserva temporária de estoque.

## Tabela

`inventory_reservations`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| inventory_id | UUID | Sim | FK inventories |
| order_id | UUID | Sim | FK orders |
| quantity | INTEGER | Sim | Quantidade reservada |
| expires_at | TIMESTAMP | Não | Expiração da reserva |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(order_id)
- INDEX(inventory_id)

## Relacionamentos

- inventory_id → inventories.id
- order_id → orders.id

---

# Entidade 027 — InventoryMovement

## Descrição

Registra toda movimentação realizada no estoque.

## Tabela

`inventory_movements`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| inventory_id | UUID | Sim | FK inventories |
| movement_type | VARCHAR(30) | Sim | Entrada, Saída, Ajuste, Reserva |
| quantity | INTEGER | Sim | Quantidade |
| reference_type | VARCHAR(50) | Não | Pedido, Compra, Ajuste... |
| reference_id | UUID | Não | Registro relacionado |
| notes | TEXT | Não | Observações |
| created_by | UUID | Não | FK users |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(inventory_id)
- INDEX(movement_type)
- INDEX(reference_type)

## Relacionamentos

- inventory_id → inventories.id
- created_by → users.id

---

# Entidade 028 — InventoryAdjustment

## Descrição

Representa um ajuste manual de estoque.

## Tabela

`inventory_adjustments`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| inventory_id | UUID | Sim | FK inventories |
| previous_quantity | INTEGER | Sim | Quantidade anterior |
| new_quantity | INTEGER | Sim | Quantidade após ajuste |
| reason | TEXT | Sim | Motivo |
| adjusted_by | UUID | Sim | FK users |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(inventory_id)

## Relacionamentos

- inventory_id → inventories.id
- adjusted_by → users.id

---

# Entidade 029 — InventoryTransfer

## Descrição

Representa uma transferência de estoque entre depósitos.

## Tabela

`inventory_transfers`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| source_warehouse_id | UUID | Sim | Depósito origem |
| destination_warehouse_id | UUID | Sim | Depósito destino |
| status | VARCHAR(30) | Sim | Status da transferência |
| transferred_by | UUID | Sim | FK users |
| created_at | TIMESTAMP | Sim | |
| completed_at | TIMESTAMP | Não | |

## Índices

- INDEX(source_warehouse_id)
- INDEX(destination_warehouse_id)
- INDEX(status)

## Relacionamentos

- source_warehouse_id → warehouses.id
- destination_warehouse_id → warehouses.id
- transferred_by → users.id

---

# Entidade 030 — InventoryCount

## Descrição

Representa um inventário físico realizado no estoque.

## Tabela

`inventory_counts`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| warehouse_id | UUID | Sim | FK warehouses |
| status | VARCHAR(30) | Sim | Aberto, Em andamento, Finalizado |
| started_at | TIMESTAMP | Sim | |
| finished_at | TIMESTAMP | Não | |
| created_by | UUID | Sim | FK users |

## Índices

- INDEX(warehouse_id)
- INDEX(status)

## Relacionamentos

- warehouse_id → warehouses.id
- created_by → users.id

---

# Convenções do Módulo

## Controle por SKU

Todo o estoque será controlado utilizando a entidade `ProductVariant (SKU)`.

## Histórico

Nenhuma movimentação será alterada ou excluída após sua criação. Todo histórico deverá ser preservado para fins de auditoria.

## Reserva de Estoque

A reserva de estoque será utilizada durante o Checkout e o OMS para evitar vendas acima da quantidade disponível.

## Controle de Concorrência

A entidade `Inventory` utilizará o campo `version` para implementar concorrência otimista, evitando inconsistências em operações simultâneas.

## Evolução

A estrutura deverá permitir inclusão futura de:

- Lotes
- Número de série
- Datas de fabricação
- Datas de validade
- Controle FEFO/FIFO
- Múltiplos níveis de localização
- Picking
- Packing
- Cross Docking
- Inventário cíclico
- Rastreabilidade completa por SKU

---