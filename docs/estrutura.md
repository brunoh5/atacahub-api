atachub-api/
│
├── docs/
│   ├── database/
│   ├── rf/
│   ├── rnf/
│   ├── arquitetura.md
│   ├── estrutura.md
│   ├── roadmap.md
│   └── readme.md
│
├── infra/
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeds/
│   │   ├── database.module.ts
│   │   └── database.service.ts
│   └── compose.yml
│
├── scripts/
│
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   │
│   ├── shared/
│   │   ├── auth/
│   │   ├── cache/
│   │   ├── config/
│   │   ├── database/
│   │   ├── events/
│   │   ├── exceptions/
│   │   ├── queue/
│   │   ├── mail/
│   │   ├── logger/
│   │   ├── validation/
│   │   ├── utils/
│   │   └── types/
│   │
│   └── modules/
│       ├── iam/
│       │   ├── controllers/
│       │   ├── dtos/
│       │   ├── errors/
│       │   ├── services/
│       │   ├── interfaces/
│       │   ├── repositories/
│       │   ├── use-cases/
│       │   ├── iam.module.ts
│       ├── customers/
│       ├── catalog/
│       ├── inventory/
│       ├── orders/
│       ├── checkout/
│       ├── payments/
│       ├── promotions/
│       ├── notifications/
│       ├── admin/
│       └── infrastructure/
│
├── .env
│
├── package.json
├── tsconfig.json
└── README.md