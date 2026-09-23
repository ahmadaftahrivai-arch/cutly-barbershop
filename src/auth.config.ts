import type { Role } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe base config (no Prisma/bcrypt) shared by middleware and the
 * full auth.ts. Keeping DB-dependent providers out of this file is what
 * lets middleware run on the Edge runtime without bundling Prisma.
 *
 * The `session` callback here (mapping token -> session.user) is included
 * even though it needs no DB access, because middleware builds its own
 * NextAuth instance from just this config — if `session` were only
 * defined in auth.ts, middleware would never see `role` on `auth.user`
 * and every /admin check would fail even for real admins.
 */
export const authConfig = {
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const { pathname } = request.nextUrl;

      if (pathname.startsWith("/admin")) {
        return isLoggedIn && role === "ADMIN";
      }
      if (pathname.startsWith("/dashboard")) {
        return isLoggedIn;
      }
      return true;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      return session;
    },
  },
} satisfies NextAuthConfig;
