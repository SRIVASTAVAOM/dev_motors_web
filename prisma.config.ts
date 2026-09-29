import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load .env.local first, then fall back to .env
dotenv.config({ path: ".env.local" });
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // For CLI migrations/push on Supabase, direct connection (session mode) is preferred
    url: process.env.DIRECT_URL ? env("DIRECT_URL") : env("DATABASE_URL"),
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
