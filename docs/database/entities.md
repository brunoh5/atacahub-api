User

Role

Permission

Customer

Address

Supplier

Brand

Category

Product

SKU

Warehouse

Stock

StockMovement

Order

OrderItem

Payment

Coupon

Promotion

Cashback

Notification

Webhook

AuditLog

SystemSetting

File

# Padrão das tabelas

id UUID PRIMARY KEY uuiv7() (Postgresql 18+)

created_at TIMESTAMP

updated_at TIMESTAMP

deleted_at TIMESTAMP NULL

created_by UUID NULL

updated_by UUID NULL

deleted_by UUID NULL

version INTEGER