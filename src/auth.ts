import authConfig from "@/auth.config";
import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signIn" },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id!;

      return session;
    },
  },
  ...authConfig,
});
