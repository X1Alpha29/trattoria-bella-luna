import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const auth = NextAuth(authConfig).auth;

export default auth((request) => {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return;
  }

  return;
});

export const config = {
  matcher: ["/admin/:path*"],
};