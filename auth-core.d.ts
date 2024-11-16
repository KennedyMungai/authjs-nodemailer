import { users } from "@/db/schema";
import { type AdapterUser as DefaultAdapterUser } from "@auth/core/adapters";

declare module "@auth/core/adapters" {
  interface AdapterUser extends DefaultAdapterUser {
    role: (typeof users.$inferSelect)["role"];
  }
}
