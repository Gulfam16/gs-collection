import { NextRequest, NextResponse } from "next/server";
import {
  createAdminSessionToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const expectedEmail = (
      process.env.ADMIN_EMAIL || "admin@gscollection.pk"
    ).toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD || "GSadmin@2026!";

    const inputEmail = email.trim().toLowerCase();
    const inputPassword = password.trim();

    // Verify credentials
    const isValid =
      inputEmail === expectedEmail && inputPassword === expectedPassword;

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid administrator email or password" },
        { status: 401 }
      );
    }

    // Generate signed HMAC session token
    const token = await createAdminSessionToken(inputEmail);

    const response = NextResponse.json({
      success: true,
      user: {
        id: "usr-admin-master",
        email: inputEmail,
        fullName: "Gullu Shani Administrator",
        role: "ADMIN",
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during authentication" },
      { status: 500 }
    );
  }
}
