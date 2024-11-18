"use server";

import { createVerificationTokenAction } from "@/actions/create-verification-token-action";
import { sendSignupUserEmailAction } from "@/actions/send-signup-user-email-action";
import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { USER_ROLES } from "@/lib/constants";
import { actionClient } from "@/lib/safe-action";
import { findUserByEmail } from "@/lib/user-queries";
import { SignInSchema, SignupSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";

export const signUpAction = actionClient
  .schema(SignupSchema)
  .action(
    async ({ parsedInput: { name, email, password, confirmPassword } }) => {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const existingUser = await findUserByEmail(email);

      if (existingUser) {
        if (!existingUser.emailVerified) {
          const verificationToken = await createVerificationTokenAction(
            existingUser.email!,
          );

          await sendSignupUserEmailAction({
            email: existingUser.email as string,
            verificationToken: verificationToken.token as string,
          });
        } else {
          throw new Error("User already exists");
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const isAdmin =
        process.env.SUPER_ADMIN_EMAIL_ADDRESS!.toLowerCase() ===
        email.toLowerCase();

      const [newUser] = await db
        .insert(users)
        .values({
          name,
          email,
          password: hashedPassword,
          role: isAdmin ? USER_ROLES.ADMIN : USER_ROLES.USER,
        })
        .returning({
          id: users.id,
          email: users.email,
          emailVerified: users.emailVerified,
        });

      if (!newUser) throw new Error("Failed to create account");

      const verificationToken = await createVerificationTokenAction(
        newUser.email!,
      );

      await sendSignupUserEmailAction({
        email: newUser.email as string,
        verificationToken: verificationToken.token as string,
      });

      console.log({ verificationToken });

      return { id: newUser.id };
    },
  );

export const signInAction = actionClient
  .schema(SignInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    await signIn("credentials", { email, password, redirect: false });
  });

export const signOutAction = async () =>
  await signOut({ redirectTo: "/auth/signin" });