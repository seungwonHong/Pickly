// app/api/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();

  // 토큰 제거
  (await cookieStore).delete("access-token");
  (await cookieStore).delete("csrf-token");

  return NextResponse.json({ success: true });
}
