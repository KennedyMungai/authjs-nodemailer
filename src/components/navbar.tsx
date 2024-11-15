import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="h-14 border-b p-2">
      <div className="container flex h-full items-center justify-between">
        <h3 className="text-xl font-semibold tracking-tight">
          <Link href="/">Authy</Link>
        </h3>
        <ul className="flex items-center gap-x-4">
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
