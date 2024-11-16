import { users } from "@/db/schema";
import { type User as DefaultUser } from "next-auth";
import { type JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: (typeof users.$inferSelect)["role"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: (typeof users.$inferInsert)["id"];
  }
}
