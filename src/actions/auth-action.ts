"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { SignInSchema, SignupSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const signUpAction = actionClient
  .schema(SignupSchema)
  .action(
    async ({ parsedInput: { name, email, password, confirmPassword } }) => {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);

      const [newUser] = await db
        .insert(users)
        .values({ name, email, password: hashedPassword })
        .returning({ id: users.id });

      if (!newUser) throw new Error("Failed to create account");

      return { id: newUser.id };
    },
  );

export const signInAction = actionClient
  .schema(SignInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    console.log({ email, password });
  });