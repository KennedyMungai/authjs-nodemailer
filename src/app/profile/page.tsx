import { auth } from "@/auth";
import { protectServer } from "@/lib/session-hooks";

const ProfilePage = async () => {
  await protectServer();

  const session = await auth();

  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <div className="my-4 h-0.5 bg-muted" />
        <>
          <h2 className="text-2xl font-bold tracking-tight">
            User Information
          </h2>
          <table className="mt-4 table-auto divide-y">
            <thead>
              <tr className="divide-x">
                <th className="bg-gray-50 px-6 py-3 text-start">Id</th>
                <th className="bg-gray-50 px-6 py-3 text-start">Name</th>
                <th className="bg-gray-50 px-6 py-3 text-start">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x">
                <th className="px-6 py-3">{session?.user?.id}</th>
                <th className="px-6 py-3">{session?.user?.name}</th>
                <th className="px-6 py-3">{session?.user?.email}</th>
              </tr>
            </tbody>
          </table>
        </>
      </div>
    </main>
  );
};

export default ProfilePage;
