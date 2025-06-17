import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// 로그인 후 accessToken을 받아서 쿠키를 생성하고
export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json();
    const CSRFToken = crypto.randomBytes(32).toString("hex");

    const response = NextResponse.json({ success: true });

    response.cookies.set("access-token", accessToken, {
      httpOnly: true, // xss 공격 보호
      secure: true, // https에서만 사용
      sameSite: "none", // csrf 공격 노출
      path: "/",
<<<<<<< HEAD
      maxAge: 60 * 60 * 24 * 5,
=======
      maxAge: 60 * 30,
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
    });

    // csrf 공영 방어를 위한 백업
    response.cookies.set("csrf-token", CSRFToken, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
<<<<<<< HEAD
      maxAge: 60 * 60 * 24 * 5,
=======
      maxAge: 60 * 30,
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
    });

    return response;
  } catch (error) {
    console.error("쿠키 생성 중 오류:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류" },
      { status: 500 }
    );
  }
}
