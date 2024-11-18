"use server";

import { db } from "@/db";
import { verificationTokens } from "@/db/schema";
import { VERIFICATION_TOKEN_EXPIRATION_IN_MINUTES } from "@/lib/constants";

export const createVerificationTokenAction = async (
  identifier: (typeof verificationTokens.$inferSelect)["identifier"],
) => {
  const expires = new Date(
    Date.now() + VERIFICATION_TOKEN_EXPIRATION_IN_MINUTES * 60 * 1000,
  );

  const token = Math.random().toString(36).substring(2);

  const [newVerificationToken] = await db
    .insert(verificationTokens)
    .values({
      identifier,
      token,
      expires,
    })
    .returning({ token: verificationTokens.token });

  return newVerificationToken;
};
