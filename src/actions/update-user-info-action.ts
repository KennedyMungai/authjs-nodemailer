"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { UpdateUserInfoSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";

export const updateUserInfoAction = actionClient
  .schema(UpdateUserInfoSchema)
  .action(async ({ parsedInput: { id, name } }) => {
    const [updatedUser] = await db
      .update(users)
      .set({ name })
      .where(eq(users.id, id))
      .returning({ id: users.id });

    return updatedUser;
  });
