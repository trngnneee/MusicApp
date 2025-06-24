import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const userToken = request.cookies.get("userToken")?.value;
  if (pathName.startsWith("/admin")) {
    if (token) {
      return NextResponse.next();
    }
    else {
      return NextResponse.redirect(new URL('/admin/account/login', request.url))
    }
  }
  else {
    if (userToken) {
      return NextResponse.next();
    }
    else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: [
    '/admin/account/reset-password',
    '/admin/category/:path*',
    '/admin/setting/:path*',
    '/admin/singer/:path*',
    '/admin/song/:path*',
    '/admin/user/:path*',
    '/wishlist',
    '/reset-password'
  ],
}