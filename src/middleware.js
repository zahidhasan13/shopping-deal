import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { VerifyToken } from "./lib/tokenHelper";

const protectedRoutes = {
  admin: ["/admin-dashboard"],
  client: ["/cart", "/profile", "/wishlist"],
  public: ["/login", "/admin-login", "/register"]
};

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;

  // Skip middleware for public routes
  if (protectedRoutes.public.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Admin routes protection
  if (protectedRoutes.admin.some(route => pathname.startsWith(route))) {
    const adminToken = req.cookies.get("admin-token")?.value;

    if (!adminToken) {
      return NextResponse.redirect(
        new URL(`/admin-login?from=${encodeURIComponent(pathname)}`, origin)
      );
    }

    try {
      const decoded = await VerifyToken(adminToken);
      if (decoded.role !== "superadmin") throw new Error("Unauthorized");
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(
        new URL(`/admin-login?error=unauthorized`, origin)
      );
    }
  }

  // Client routes protection
  if (protectedRoutes.client.some(route => pathname.startsWith(route))) {
    const session = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!session) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, origin)
      );
    }

    // Optional: Add additional client role verification if needed
    // if (session.user.role !== "client") {
    //   return NextResponse.redirect(new URL("/unauthorized", origin));
    // }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};