import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { createAuthClient } from "better-auth/react";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ["profile", "email"],
    },
  },
});

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL!,
});

export const { signIn, signUp, useSession } = createAuthClient();
