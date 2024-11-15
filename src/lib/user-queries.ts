import "server-only";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email: string) =>
  await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((data) => data[0]);
