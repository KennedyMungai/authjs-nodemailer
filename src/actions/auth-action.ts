"use server";

import { actionClient } from "@/lib/safe-action";
import { SignInSchema, SignupSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";

export const signUpAction = actionClient
  .schema(SignupSchema)
  .action(
    async ({ parsedInput: { name, email, password, confirmPassword } }) => {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      console.log(hashedPassword);
    },
  );

export const signInAction = actionClient
  .schema(SignInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    console.log({ email, password });
  });