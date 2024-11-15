import { findUserByEmail } from "@/lib/user-queries";
import { SignInSchema } from "@/lib/validation";
import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = SignInSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const existingUser = await findUserByEmail(email);

          if (!existingUser || !existingUser.password) return null;

          const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password,
          );

          if (isPasswordValid) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...user } = existingUser;

            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
