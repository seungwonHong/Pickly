import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(" MONGODB_URI 환경변수가 설정되지 않았습니다.");
}

let isConnected = false;

export async function connectToDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
  } catch (error) {
    console.error(" MongoDB 연결 실패:", error);
    throw error;
  }
}
