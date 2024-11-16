import authConfig from "@/auth.config";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    accountsTable: schema.accounts,
    usersTable: schema.users,
    authenticatorsTable: schema.authenticators,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signIn" },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;

      if (user?.role) token.role = user.role;

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id!;
      session.user.role = token.role;

      return session;
    },
  },
  ...authConfig,
});
