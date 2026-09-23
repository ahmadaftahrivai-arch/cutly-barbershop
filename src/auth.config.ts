import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe base config (no Prisma/bcrypt) shared by middleware and the
 * full auth.ts. Keeping DB-dependent providers out of this file is what
 * lets middleware run on the Edge runtime without bundling Prisma.
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
  },
} satisfies NextAuthConfig;
