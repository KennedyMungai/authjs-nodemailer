import { db } from "@/db";
import { verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only";

/**
 * The function queries the database for a similar token to the one in the search params
 * @param token The token sent over email
 * @returns A promise of the verification token object
 */
export const findVerificationTokenByToken = async (
  token?: string,
): Promise<typeof verificationTokens.$inferSelect | null> => {
  if (!token) return null;

  const [verificationToken] = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token));

  return verificationToken;
};
