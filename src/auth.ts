import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";

// Full server config (Node runtime): dipakai oleh route handler,
// Server Actions, dan Server Components. Adapter butuh Prisma,
// jadi file ini TIDAK boleh diimpor dari middleware.
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
});
