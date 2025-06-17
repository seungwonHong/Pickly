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
          content: `You are an assistant that extracts place names (like landmarks or hotel names) from user input. 
            You may use your knowledge and external information to infer the correct names.
            Respond only with {"place": "장소명"}.`,
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
