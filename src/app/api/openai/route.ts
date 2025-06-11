import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "Missing text in request body" }, { status: 400 });
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an assistant that extracts artist and album name from the given text.",
        },
        {
          role: "user",
          content: `다음 텍스트에서 아티스트명과 앨범명을 추출해줘:\n${text}`,
        },
      ],
    });

    const result = completion.data.choices[0].message?.content || "";

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("OpenAI API 호출 실패:", error);
    return NextResponse.json({ error: "OpenAI API 호출 실패" }, { status: 500 });
  }
}
