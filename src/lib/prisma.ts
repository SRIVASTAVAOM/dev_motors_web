import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

const connectionString = process.env.DATABASE_URL;

export const isDatabaseConfigured: boolean = Boolean(
  connectionString &&
    !connectionString.includes("[YOUR-") &&
    !connectionString.includes("[") &&
    !connectionString.includes("]")
);

const pool =
  globalForPrisma.pool ??
  (isDatabaseConfigured && connectionString
    ? new Pool({
        connectionString,
        max: 10,
        idleTimeoutMillis: 30000,
      })
    : undefined);

const adapter = pool ? new PrismaPg(pool) : undefined;

export const prisma =
  globalForPrisma.prisma ??
  (adapter
    ? new PrismaClient({
        adapter,
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
      })
    : (new Proxy({}, {
        get(_target, prop) {
          if (prop === "$connect" || prop === "$disconnect") {
            return () => Promise.resolve();
          }
          return new Proxy({}, {
            get() {
              return () => Promise.resolve(null);
            },
          });
        },
      }) as unknown as PrismaClient));

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pool = pool;
}

export default prisma;
