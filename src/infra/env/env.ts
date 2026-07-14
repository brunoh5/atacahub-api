import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number().optional().default(5432),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PASSWORD: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().optional().default(1025),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.string().default("DEVELOPMENT"),
  DATABASE_URL: z.string()
});

export type Env = z.infer<typeof envSchema>;