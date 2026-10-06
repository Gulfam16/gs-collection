import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/adminAuth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      // If already authenticated as admin, redirect from login to /admin
      const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
      const { valid } = await verifyAdminSessionToken(token);
      if (valid) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }

    // For any protected admin route: verify session cookie
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const { valid } = await verifyAdminSessionToken(token);

    if (!valid) {
      const loginUrl = new URL("/admin/login", req.url);
      if (pathname !== "/admin") {
        loginUrl.searchParams.set("redirect", pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
