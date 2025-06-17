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
          content: `You are an assistant that extracts movie or drama titles from user input. 
Respond only in the format: {"trailer": "작품명 official trailer"}.
Use your knowledge to identify the most likely correct title.
Only include the title, not the year or other metadata.`,
        },
        {
          role: "user",
          content: `예시:
입력: "어제 오펜하이머를 봤는데 정말 대단했어"
출력: {"trailer": "Oppenheimer official trailer"}

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
