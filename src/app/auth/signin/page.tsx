import SigninForm from "@/app/auth/signin/_components/signin-form";

const SigninPage = () => {
  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
        <div className="my-4 h-0.5 bg-muted" />

        <SigninForm />
      </div>
    </main>
  );
};

export default SigninPage;
