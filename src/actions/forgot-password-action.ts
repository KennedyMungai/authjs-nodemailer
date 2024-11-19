"use server";

import { createVerificationTokenAction } from "@/actions/create-verification-token-action";
import { actionClient } from "@/lib/safe-action";
import { findUserByEmail } from "@/lib/user-queries";
import { ForgotPasswordSchema } from "@/lib/validation";

export const forgotPasswordAction = actionClient
  .schema(ForgotPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const existingUser = await findUserByEmail(email);

    if (existingUser && !existingUser.id)
      throw new Error("Something went wrong");

    const verificationToken = await createVerificationTokenAction(
      existingUser.email!,
    );

    // TODO: Send the forgot password email
  });
