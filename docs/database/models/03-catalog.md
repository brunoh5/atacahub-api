# Modelagem do Banco de Dados

# Módulo 03 — Catálogo (Catalog)

Este módulo define as entidades responsáveis pelo catálogo de produtos da plataforma. O catálogo concentra todas as informações comerciais dos produtos, incluindo categorias, marcas, fornecedores, atributos, imagens e variações (SKU).

---

# Entidade 014 — Category

## Descrição

Representa uma categoria utilizada para organizar os produtos.

## Tabela

`categories`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| parent_id | UUID | Não | Categoria Pai |
| name | VARCHAR(150) | Sim | Nome da categoria |
| slug | VARCHAR(180) | Sim | Identificador amigável |
| description | TEXT | Não | Descrição |
| is_active | BOOLEAN | Sim | Categoria ativa |
| sort_order | INTEGER | Sim | Ordem de exibição |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |
| deleted_at | TIMESTAMP | Não | Soft Delete |

## Índices

- UNIQUE(slug)
- INDEX(parent_id)

## Relacionamentos

- Uma Category pode possuir várias subcategorias.
- Uma Category pode conter diversos Products.

---

# Entidade 015 — Brand

## Descrição

Representa a marca de um produto.

## Tabela

`brands`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(150) | Sim | Nome |
| slug | VARCHAR(180) | Sim | Identificador amigável |
| description | TEXT | Não | |
| website | VARCHAR(255) | Não | Site oficial |
| is_active | BOOLEAN | Sim | |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |
| deleted_at | TIMESTAMP | Não | Soft Delete |

## Índices

- UNIQUE(name)
- UNIQUE(slug)

## Relacionamentos

- Uma Brand pode possuir diversos Products.

---

# Entidade 016 — Supplier

## Descrição

Representa um fornecedor de produtos.

## Tabela

`suppliers`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| company_name | VARCHAR(255) | Sim | Razão Social |
| trade_name | VARCHAR(255) | Não | Nome Fantasia |
| email | VARCHAR(255) | Não | |
| phone | VARCHAR(30) | Não | |
| website | VARCHAR(255) | Não | |
| notes | TEXT | Não | |
| is_active | BOOLEAN | Sim | |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |
| deleted_at | TIMESTAMP | Não | Soft Delete |

## Índices

- INDEX(company_name)
- INDEX(is_active)

## Relacionamentos

- Um Supplier poderá fornecer vários Products.

---

# Entidade 017 — Product

## Descrição

Representa o produto principal comercializado.

## Tabela

`products`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| category_id | UUID | Sim | FK categories |
| brand_id | UUID | Não | FK brands |
| supplier_id | UUID | Não | FK suppliers |
| name | VARCHAR(255) | Sim | |
| slug | VARCHAR(255) | Sim | URL amigável |
| short_description | TEXT | Não | |
| description | TEXT | Não | |
| status | VARCHAR(30) | Sim | |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |
| deleted_at | TIMESTAMP | Não | Soft Delete |
| version | INTEGER | Sim | Controle de concorrência |

## Índices

- UNIQUE(slug)
- INDEX(category_id)
- INDEX(brand_id)
- INDEX(status)

## Relacionamentos

- Um Product pertence a uma Category.
- Um Product pode possuir uma Brand.
- Um Product pode possuir um Supplier.
- Um Product possui uma ou mais ProductVariants.
- Um Product pode possuir várias imagens.
- Um Product pode possuir vários atributos.

---

# Entidade 018 — ProductVariant (SKU)

## Descrição

Representa uma variação comercializável do produto.

## Tabela

`product_variants`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| product_id | UUID | Sim | FK products |
| sku | VARCHAR(100) | Sim | Código único |
| barcode | VARCHAR(100) | Não | Código de barras |
| price | NUMERIC(12,2) | Sim | Preço de venda |
| cost_price | NUMERIC(12,2) | Não | Custo |
| weight | NUMERIC(10,3) | Não | Peso |
| width | NUMERIC(10,2) | Não | Largura |
| height | NUMERIC(10,2) | Não | Altura |
| length | NUMERIC(10,2) | Não | Comprimento |
| is_active | BOOLEAN | Sim | |
| created_at | TIMESTAMP | Sim | |
| updated_at | TIMESTAMP | Sim | |

## Índices

- UNIQUE(sku)
- UNIQUE(barcode)
- INDEX(product_id)

## Relacionamentos

- Uma ProductVariant pertence a um Product.
- Uma ProductVariant será utilizada pelo estoque e pelos pedidos.

---

# Entidade 019 — ProductImage

## Descrição

Armazena as imagens vinculadas ao produto.

## Tabela

`product_images`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| product_id | UUID | Sim | FK products |
| file_id | UUID | Não | FK files (futuro) |
| url | TEXT | Sim | Caminho da imagem |
| alt_text | VARCHAR(255) | Não | Texto alternativo |
| sort_order | INTEGER | Sim | Ordem |
| is_primary | BOOLEAN | Sim | Imagem principal |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(product_id)

## Relacionamentos

- Um Product pode possuir várias imagens.

---

# Entidade 020 — Attribute

## Descrição

Representa um atributo disponível para produtos.

## Tabela

`attributes`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| name | VARCHAR(100) | Sim | Nome |
| code | VARCHAR(100) | Sim | Código |
| created_at | TIMESTAMP | Sim | |

## Índices

- UNIQUE(code)

## Exemplos

- Cor
- Tamanho
- Material
- Voltagem

---

# Entidade 021 — AttributeValue

## Descrição

Representa um valor possível para um atributo.

## Tabela

`attribute_values`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| id | UUID | Sim | Chave Primária |
| attribute_id | UUID | Sim | FK attributes |
| value | VARCHAR(150) | Sim | Valor |
| created_at | TIMESTAMP | Sim | |

## Índices

- INDEX(attribute_id)

## Relacionamentos

- Um Attribute possui vários AttributeValues.

---

# Entidade 022 — ProductAttribute

## Descrição

Relaciona uma variação (SKU) aos valores de atributos.

## Tabela

`product_attributes`

## Campos

| Campo | Tipo | Obrigatório | Observação |
|--------|------|-------------|------------|
| product_variant_id | UUID | Sim | FK product_variants |
| attribute_value_id | UUID | Sim | FK attribute_values |

## Chave Primária

- (product_variant_id, attribute_value_id)

## Relacionamentos

- product_variant_id → product_variants.id
- attribute_value_id → attribute_values.id

---

# Convenções do Módulo

## Categoria Hierárquica

As categorias poderão possuir estrutura em árvore por meio do campo `parent_id`.

## Produto x SKU

Um Product representa o produto comercial.

Uma ProductVariant (SKU) representa a unidade efetivamente comercializada, utilizada pelo estoque, pedidos e faturamento.

## Imagens

Os arquivos físicos poderão ser gerenciados futuramente pelo módulo File Service.

## Atributos

Os atributos serão reutilizáveis entre diferentes categorias e produtos.

## Evolução

A estrutura deverá permitir inclusão futura de:

- SEO
- Produtos digitais
- Kits
- Produtos compostos
- Produtos relacionados
- Produtos similares
- Tabelas de preço
- Múltiplos fornecedores por SKU
- Múltiplas moedas

---

