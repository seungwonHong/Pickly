import { OpenAI } from "openai";

interface OpenAIError {
  status?: number;
  message?: string;
  response?: {
    data?: unknown;
  };
}

export async function createChatWithRetry(
  openai: OpenAI,
  payload: OpenAI.Chat.ChatCompletionCreateParams,
  maxRetries = 3
) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const completion = await openai.chat.completions.create(payload);
      return completion;
    } catch (err) {
      const error = err as OpenAIError;
      if (error.status === 429 && i < maxRetries - 1) {
        console.warn(`429 에러 발생 – ${i + 1}회차 재시도 중...`);
        await new Promise((resolve) => setTimeout(resolve, 1500 * (i + 1))); // 1.5초 → 3초 → 4.5초 백오프
        continue;
      }
      throw err;
    }
  }
  throw new Error("OpenAI 호출 3회 실패 (429)");
}
