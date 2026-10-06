import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const { valid, payload } = await verifyAdminSessionToken(token);

  if (!valid || !payload) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: "usr-admin-master",
      email: payload.email,
      fullName: "Gullu Shani Administrator",
      role: "ADMIN",
    },
  });
}
