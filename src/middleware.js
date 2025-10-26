import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("adminToken")?.value;

  const publicPaths = [
    "/admin/account/login",
    "/admin/account/register",
    "/admin/account/forgot-password",
    "/admin/account/otp-password",
  ];

  if (token && publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/admin/category", req.url));
  }

  if (!token && pathname.startsWith("/admin") && !publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/admin/account/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
