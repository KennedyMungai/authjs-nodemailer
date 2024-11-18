import { auth } from "@/auth";
import { protectServer } from "@/lib/session-hooks";
import { User } from "next-auth";
import UpdateUserInfoForm from "@/app/profile/_components/update-user-info-form";

const ProfilePage = async () => {
  await protectServer();

  const session = await auth();

  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <div className="my-4 h-0.5 bg-muted" />
        <>
          <div className="flex flex-col items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">
              User Information
            </h2>
            <UpdateUserInfoForm user={session?.user as User} />
          </div>

          <table className="mt-4 table-auto divide-y">
            <thead>
              <tr className="divide-x">
                <th className="bg-gray-50 px-6 py-3 text-start">Id</th>
                <th className="bg-gray-50 px-6 py-3 text-start">Name</th>
                <th className="bg-gray-50 px-6 py-3 text-start">Email</th>
                <th className="bg-gray-50 px-6 py-3 text-start">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x">
                <th className="px-6 py-3">{session?.user?.id}</th>
                <th className="px-6 py-3">{session?.user?.name}</th>
                <th className="px-6 py-3">{session?.user?.email}</th>
                <th className="px-6 py-3">{session?.user?.role}</th>
              </tr>
            </tbody>
          </table>
        </>
      </div>
    </main>
  );
};

export default ProfilePage;
