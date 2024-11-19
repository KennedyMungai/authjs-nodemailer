import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email")
      .toLowerCase(),
    password: z.string().min(6, "Password should be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpType = z.infer<typeof SignupSchema>;

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .toLowerCase(),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export type SignInType = z.infer<typeof SignInSchema>;

export const UpdateUserInfoSchema = z.object({
  id: z.string().uuid("Invalid id"),
  name: z.string().min(6, "The name should have at least 6 characters"),
});

export type UpdateUserInfoType = z.infer<typeof UpdateUserInfoSchema>;

export const ForgotPasswordSchema = z.object({ email: z.string().email() });

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password should be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;