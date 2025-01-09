import { OpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

// 初始化 OpenAI 客户端
const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
  model: "deepseek-chat",
  configuration: {
    baseURL: "https://api.deepseek.com/",
  },
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // 调用 OpenAI API
    const response = await llm.invoke(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "处理请求时发生错误" }, { status: 500 });
  }
}
