import { protectServer } from "@/lib/session-hooks";

const ProfilePage = async () => {
  await protectServer();

  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
        <div className="my-4 h-0.5 bg-muted" />
      </div>
    </main>
  );
};

export default ProfilePage;
