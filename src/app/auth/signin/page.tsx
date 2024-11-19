import ForgotPasswordForm from "@/app/auth/signin/_components/forgot-password-form";
import SigninForm from "@/app/auth/signin/_components/signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
        <div className="my-4 h-0.5 bg-muted" />

        <SigninForm />
        <div className="mx-auto max-w-lg p-4">
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
};

export default SigninPage;
