import NextAuth from "next-auth";
import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import authConfig from "@/auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signIn" },
  ...authConfig,
});
