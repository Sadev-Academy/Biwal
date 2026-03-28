import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as any)?.role;
  const { nextUrl } = req;

  // Protect admin routes
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl));
    }
    if (userRole !== "ADMIN") {
      return Response.redirect(new URL("/", nextUrl));
    }
  }

  // Protect account and orders pages
  if (nextUrl.pathname.startsWith("/account") && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return; // Continue to the next middleware or page
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
