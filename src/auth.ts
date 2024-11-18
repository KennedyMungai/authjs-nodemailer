import { OAuthVerifyEmailAction } from "@/actions/oauth-verify-email-action";
import authConfig from "@/auth.config";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { USER_ROLES } from "@/lib/constants";
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
    // authorized({ auth, request }) {
    //   const { nextUrl } = request;

    //   const isLoggedIn = !!auth?.user;
    //   const isOnProfile = nextUrl.pathname.startsWith("/profile");
    //   const isOnAuth = nextUrl.pathname.startsWith("/auth");

    //   if (isOnProfile) {
    //     if (isLoggedIn) return true;
    //     return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    //   }

    //   if (isOnAuth) {
    //     if (isLoggedIn) return NextResponse.redirect(new URL("/", nextUrl));
    //   }

    //   return true;
    // },
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;
      if (
        user?.email &&
        process.env.SUPER_ADMIN_EMAIL_ADDRESS!.toLowerCase() ===
          user?.email.toLowerCase()
      ) {
        token.role = USER_ROLES.ADMIN;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id!;
      session.user.role = token.role;

      return session;
    },
    signIn({ user, account, profile }) {
      if (account?.provider === "google") return !!profile?.email_verified;

      if (account?.provider === "github") return true;

      if (account?.provider === "credentials") {
        if (user.emailVerified) return true;

        return true;
      }

      return false;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (["google", "github"].includes(account.provider)) {
        if (user.email) await OAuthVerifyEmailAction(user.email!);
      }
    },
  },
  ...authConfig,
});
