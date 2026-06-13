import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { portfolioData } from '../../../lib/portfolio-data';

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

const groq = createGroq({
	apiKey: process.env.GROQ_API_KEY!,
});

const gemini = createGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export async function POST(req: Request) {
	try {
		const { messages } = await req.json();

		// Get the last user message
		const lastMessage = messages[messages.length - 1];
		const userQuestion = lastMessage.content;

		const userPrompt = `User Question: ${userQuestion}

Please provide a helpful response about Ahmed based on the information above:`;

		let result: Awaited<ReturnType<typeof generateText>>;
		let modelUsed = 'gemini';

		// ── PRIMARY: Gemini ─────────────────────────────────────
		try {
			result = await generateText({
				model: gemini('gemini-flash-latest'),
				system: systemPrompt,
				prompt: userPrompt,
				temperature: 0.2,
			});
		} catch (geminiError) {
			console.warn('Gemini failed, falling back to Groq:', geminiError);

			modelUsed = 'groq';

			// ── FALLBACK: Groq ──────────────────────────────────
			try {
				result = await generateText({
					model: groq('llama-3.1-8b-instant'),
					system: systemPrompt,
					prompt: userPrompt,
					temperature: 0.2,
				});
			} catch (groqError) {
				console.error('Both Gemini and Groq failed:', groqError);

				return NextResponse.json(
					{
						error: `AI service temporarily unavailable: gemini error: ${geminiError}, groq error: ${groqError}`,
					},
					{ status: 500 }
				);
			}
		}

		return new Response(result.text, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'x-model-used': modelUsed,
			},
		});
	} catch (error) {
		console.error('API Error:', error);
		return new Response(
			JSON.stringify({
				error: 'Internal server error',
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
