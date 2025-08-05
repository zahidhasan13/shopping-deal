import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  // Admin verification
  if (type === "admin") {
    const token = req.cookies.get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ valid: false, message: "No token provided" }, { status: 401 });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== "admin") throw new Error();
      return NextResponse.json({ valid: true });
    } catch {
      return NextResponse.json({ valid: false, message: "Invalid token" }, { status: 401 });
    }
  }

  // User verification (NextAuth)
  if (type === "user") {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ valid: false, message: "User not logged in" }, { status: 401 });
    }
    return NextResponse.json({ valid: true });
  }

  return NextResponse.json({ valid: false, message: "Invalid verification type" }, { status: 400 });
}
