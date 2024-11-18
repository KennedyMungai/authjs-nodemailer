import authConfig from "@/auth.config";
import NextAuth, { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);

type NextAuthRequest = NextRequest & { auth: Session | null };

export default auth((request: NextAuthRequest) => {
  const { auth, nextUrl } = request;

  const isLoggedIn = !!auth?.user;
  const isOnProfile = nextUrl.pathname.startsWith("/profile");
  const isOnAuth = nextUrl.pathname.startsWith("/auth");

  if (isOnProfile) {
    if (isLoggedIn) return;
    return NextResponse.redirect(new URL("/auth/signin", nextUrl));
  }

  if (isOnAuth) {
    if (isLoggedIn) return NextResponse.redirect(new URL("/", nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
