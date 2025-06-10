import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
  const token = request.cookies.get("token")?.value;
  if (token)
  {
    return NextResponse.next();
  }
  else
  {
    return NextResponse.redirect(new URL('/admin/account/login', request.url))
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
  ],
}