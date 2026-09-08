import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Edge-safe middleware: hanya verifikasi JWT, tanpa Prisma/bcrypt.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const loggedIn = !!req.auth;

  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/tasks") ||
    pathname.startsWith("/profile");

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isProtected && !loggedIn) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(loginUrl);
  }

  if (isAuthPage && loggedIn) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    dashboardUrl.search = "";
    return Response.redirect(dashboardUrl);
  }

  return undefined;
});

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*", "/profile/:path*", "/login", "/register"],
};
