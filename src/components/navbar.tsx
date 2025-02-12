import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/actions/auth-action";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="h-14 border-b p-2">
      <div className="container mx-auto flex h-full max-w-4xl items-center justify-between">
        <h3 className="text-xl font-semibold tracking-tight">
          <Link href="/">Authy</Link>
        </h3>
        <ul className="flex items-center gap-x-4">
          {session && session.user && (
            <li>
              <Button>
                <Link href="/profile">Profile</Link>
              </Button>
            </li>
          )}
          <li>
            <Button variant={"outline"} size="sm" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </li>
          <li>
            <Button variant={"outline"} size="sm" asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </li>
          {session && session.user && (
            <li>
              <form action={signOutAction}>
                <Button>Sign Out</Button>
              </form>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
