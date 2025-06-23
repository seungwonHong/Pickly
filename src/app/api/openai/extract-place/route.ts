import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an assistant that extracts only the most representative place name (such as a restaurant, landmark, or hotel) from user input, including the city or region if mentioned. 
If the input contains a specific location (like Cheonan, Chungcheongnam-do), include it in the place name.
Respond only with {"place": "장소명"}.

Examples:
Input: "천안 중앙분식 좋아요 중앙분식은 충청남도 천안시 동남구 충절로, 중앙고등학교 근처에 위치한 오랜 역사를 가진 분식집..."
Output: {"place": "천안 중앙분식"}

Input: "이곳은 싱가폴에 있는 마리나베이 호텔입니다. 엄청 멋져요"
Output: {"place": "마리나 베이 샌즈 호텔"}

Input: "{text}"`,
        },
        {
          role: "user",
          content: `예시:
입력: "이곳은 싱가폴에 있는 마리나베이 호텔입니다. 엄청 멋져요"
출력: {"place": "마리나 베이 샌즈 호텔"}

입력: "${text}"`,
        },
      ],
    });

    const result = completion.choices[0].message?.content || "";
    return NextResponse.json({ result });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: "OpenAI API 호출 실패", detail: err.message },
      { status: 500 }
    );
  }
}
