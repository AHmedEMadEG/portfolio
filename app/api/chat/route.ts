import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { portfolioData } from "../../../lib/portfolio-data";

export const maxDuration = 30;

const systemPrompt = `You are Ahmed's AI assistant, representing his professional portfolio and experience. 
You have access to his complete professional information including projects, skills, experience, and education.

When answering questions:
1. Be conversational and friendly
2. Provide specific details from his portfolio
3. Highlight relevant projects and experience
4. If asked about specific technologies, mention relevant projects that use them
5. Keep responses concise but informative (2-3 sentences typically)

Portfolio Context:
${JSON.stringify(portfolioData, null, 2)}`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages,
    maxOutputTokens: 500,
    temperature: 0.7,
  });

  return new Response(JSON.stringify({ text }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}