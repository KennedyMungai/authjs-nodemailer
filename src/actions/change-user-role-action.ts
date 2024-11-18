"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { USER_ROLES } from "@/lib/constants";
import { findUserByEmail } from "@/lib/user-queries";
import { eq } from "drizzle-orm";

export const changeUserRoleAction = async (email: string, role: USER_ROLES) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser.id && existingUser.role !== role) {
    await db.update(users).set({ role }).where(eq(users.id, existingUser.id));
  }
};
