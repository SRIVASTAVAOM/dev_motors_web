import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load .env.local first, then fall back to .env
dotenv.config({ path: ".env.local" });
dotenv.config();

const dbUrl =
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/postgres";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: dbUrl,
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
