import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

// 代码生成/数学解题   	0.0
// 数据抽取/分析	1.0
// 通用对话	1.3
// 翻译	1.3
// 创意类写作/诗歌创作	1.5

// 初始化
const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 1.5,
  model: "deepseek-chat",
  configuration: {
    baseURL: "https://api.deepseek.com",
  },
  azureOpenAIBasePath: "https://api.deepseek.com",
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await llm.invoke(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "处理请求时发生错误" }, { status: 500 });
  }
}
