import { verifyCredentialsEmailAction } from "@/actions/verify-credentials-email-action";
import { Button } from "@/components/ui/button";
import { findVerificationTokenByToken } from "@/lib/verification-token-queries";
import Link from "next/link";

type Props = {
  searchParams: {
    token?: string;
  };
};

const VerificationPage = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  const verificationToken = await findVerificationTokenByToken(token);

  if (!verificationToken?.expires) return <TokenIsInvalidState />;

  const isExpired = new Date(verificationToken.expires) < new Date();

  if (isExpired) return <TokenIsInvalidState />;

  await verifyCredentialsEmailAction(token as string);

  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <div className="fond-bold text-3xl tracking-tight">Verify Email</div>
        <div className="my-4 h-0.5 bg-muted" />
        <div className="rounded bg-emerald-100 p-4">
          <p>Email Verified</p>
          <span>
            Click{" "}
            <Button variant={"link"} size="sm" className="px-0" asChild>
              <Link href="/auth/signin">here</Link>
            </Button>{" "}
            to sign in
          </span>
        </div>
      </div>
    </main>
  );
};

export default VerificationPage;

const TokenIsInvalidState = () => {
  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <div className="fond-bold text-3xl tracking-tight">Verify Email</div>
        <div className="my-4 h-0.5 bg-muted" />
        <div className="rounded bg-red-100 p-4">
          <p>Token is invalid</p>
          <span>
            Click{" "}
            <Button variant={"link"} size="sm" className="px-0" asChild>
              <Link href="/auth/signup">here</Link>
            </Button>{" "}
            to sign up again
          </span>
        </div>
      </div>
    </main>
  );
};
