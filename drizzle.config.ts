import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Loads DATABASE_URL from .env in the project root (run CLI from repo root).
export default defineConfig({
  strict: true,
  verbose: true,
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./db/schema.ts",
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})