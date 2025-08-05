import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { VerifyToken } from "./lib/tokenHelper";

const protectedRoutes = {
  admin: ["/admin-dashboard"],
  client: ["/cart", "/profile", "/wishlist"],
};

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;

  if (protectedRoutes.admin.some((route) => pathname.startsWith(route))) {
    const adminToken = req.cookies.get("admin-token")?.value;

    if (!adminToken) {
      return NextResponse.redirect(
        new URL(`/admin-login?from=${encodeURIComponent(pathname)}`, origin)
      );
    }

    try {
      const decoded = await VerifyToken(adminToken);
      if (decoded.role !== "superadmin") throw new Error();
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(
        new URL(`/admin-login?error=invalid_token`, origin)
      );
    }
  }

  if (protectedRoutes.client.some((route) => pathname.startsWith(route))) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`, req.url)
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|login|admin-login).*)",
  ],
};