import { GoogleGenAI } from '@google/genai';
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

export async function POST(req: Request) {
	try {
		const { messages } = await req.json();

		// Get the last user message
		const lastMessage = messages[messages.length - 1];
		const userQuestion = lastMessage.content;

		const text = await generateContentFromMLDev(userQuestion);

		return new Response(text, {
			headers: {
				'Content-Type': 'application/json',
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

const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

async function generateContentFromMLDev(userQuestion: string) {
	const ai = new GoogleGenAI({
		vertexai: false,
		apiKey: GEMINI_API_KEY,
	});

	const prompt = `${systemPrompt}

User Question: ${userQuestion}

Please provide a helpful response about Ahmed based on the information above:`;

	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: prompt,
		config: {
			maxOutputTokens: 500,
			temperature: 0.7,
		},
	});

	return response.text;
}
