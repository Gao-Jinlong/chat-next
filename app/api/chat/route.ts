import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

// Mock responses for development
const MOCK_RESPONSES = [
  "我明白您的问题。让我为您详细解答...",
  "这是一个很好的问题。根据我的理解...",
  "关于这个问题，有几个重要的点需要注意...",
  "我来为您分析一下这个问题...",
  "这个问题比较复杂，让我从以下几个方面来解释...",
];

const MOCK_DELAY = 1000; // 模拟网络延迟（毫秒）

// 是否使用 mock 数据
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

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

// Mock response generator
function getMockResponse(message: string) {
  const randomIndex = Math.floor(Math.random() * MOCK_RESPONSES.length);
  const prefix = MOCK_RESPONSES[randomIndex];
  return `${prefix}\n\n您问的是：${message}\n\n这是一个模拟的回答，仅用于开发测试。实际部署时，这里会返回真实的 AI 响应。`;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // 使用 mock 数据
    if (USE_MOCK) {
      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
      const mockResponse = getMockResponse(message);
      return NextResponse.json({
        response: {
          kwargs: {
            content: mockResponse,
          },
        },
      });
    }

    // 使用真实 API
    const response = await llm.invoke(message);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "处理请求时发生错误" }, { status: 500 });
  }
}
