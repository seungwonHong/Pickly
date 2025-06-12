import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json(
        { error: "Missing text in request body" },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",

          content:
            'You are an assistant that extracts artist and album names. Respond with a JSON object like {"artist":"...","album":"..."}. If unsure, provide the best guess or an empty string.',
        },
        {
          role: "user",
          content: `다음 텍스트에서 아티스트명과 앨범명을 대략적으로 추출해줘. 가장 가능성이 높은 아티스트와 앨범 정보를 찾아주면 좋겠어. 결과는 JSON 형식({"artist":"아티스트명", "album":"앨범명"})으로 알려줘.\n\n텍스트: ${text}`,
        },
      ],
    });

    const result = completion.choices[0].message?.content || "";

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("OpenAI API 호출 실패:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause,
    });
    return NextResponse.json(
      { error: "OpenAI API 호출 실패", detail: error.message },
      { status: 500 }
    );
  }
}
