import z from "zod";
export declare const envSchema: z.ZodObject<{
    PORT: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    POSTGRES_PORT: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    POSTGRES_USER: z.ZodString;
    POSTGRES_DB: z.ZodString;
    POSTGRES_PASSWORD: z.ZodString;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
