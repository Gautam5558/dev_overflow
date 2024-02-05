import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.NEXT_OPEN_AI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a brilliant and intellectual assistant that provides quality information",
          },
          {
            role: "user",
            content: "Tell me " + question.title,
          },
        ],
      }),
    });
    const data = await res.json();
    const result = data.choices[0].message.content;
    return NextResponse.json({ result });
  } catch (err) {
    console.log(err);
  }
  console.log(question);
};
