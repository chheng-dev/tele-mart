import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "STAFF";

export const auth = betterAuth({
  appName: "Tele_Mart",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  basePath: "/api/auth",

  database: new Pool({
    connectionString: process.env.DATABASEcl_URL,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    // github: {
    //   enabled: true,
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "STAFF" satisfies UserRole,
      },
    },
  },

  plugins: [nextCookies()],
});
