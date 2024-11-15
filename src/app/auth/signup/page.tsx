import SignupForm from "@/app/auth/signup/_components/signup-form";

const SignupPage = () => {
  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Sign Up</h1>
        <div className="my-4 h-0.5 bg-muted" />

        <SignupForm />
      </div>
    </main>
  );
};

export default SignupPage;
