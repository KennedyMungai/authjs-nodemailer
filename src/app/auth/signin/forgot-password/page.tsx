import { verifyCredentialsEmailAction } from "@/actions/verify-credentials-email-action";
import { Button } from "@/components/ui/button";
import { findVerificationTokenByToken } from "@/lib/verification-token-queries";
import Link from "next/link";
import ResetPasswordForm from "./_components/reset-password-form";

type Props = {
  searchParams: { token: string };
};

const ForgotPasswordPage = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  const verificationToken = await findVerificationTokenByToken(token);

  if (!verificationToken?.expires) return <TokenIsInvalidState />;

  const isExpired = new Date(verificationToken.expires) < new Date();

  if (isExpired) return <TokenIsInvalidState />;

  await verifyCredentialsEmailAction(token as string);

  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <div className="fond-bold text-3xl tracking-tight">
          Enter your new password below
        </div>
        <div className="my-4 h-0.5 bg-muted" />

        <div className="mt-4">
          <ResetPasswordForm
            email={verificationToken.identifier}
            token={token}
          />
        </div>

        <span>
          {" "}
          No longer need to reset your password? Click{" "}
          <Button variant={"link"} size="sm" className="px-0" asChild>
            <Link href="/auth/signin">here</Link>
          </Button>
          to go back to the sign in page
        </span>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;

const TokenIsInvalidState = () => {
  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <div className="fond-bold text-3xl tracking-tight">
          Forgot Password?
        </div>
        <div className="my-4 h-0.5 bg-muted" />
        <div className="rounded bg-red-100 p-4">
          <p>Token is invalid</p>
          <span>
            Click{" "}
            <Button variant={"link"} size="sm" className="px-0" asChild>
              <Link href="/auth/signin">here</Link>
            </Button>{" "}
            to go to the signin page to get a new token
          </span>
        </div>
      </div>
    </main>
  );
};
