"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-2xl">
        <h1 className="text-2xl font-bold">AI 聊天助手</h1>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded-md min-h-[100px]"
            placeholder="输入你的问题..."
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "处理中..." : "发送"}
          </button>
        </form>

        {response && (
          <div className="w-full p-4 bg-gray-50 rounded-md">
            <h2 className="font-bold mb-2">AI 回复：</h2>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </main>
    </div>
  );
}
