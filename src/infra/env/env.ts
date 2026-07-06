import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  POSTGRES_PORT: z.coerce.number().optional().default(5432),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PASSWORD: z.string(),
});

export type Env = z.infer<typeof envSchema>;