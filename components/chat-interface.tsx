'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';

interface Message {
	id: string;
	role: 'user' | 'assistant';
	content: string;
}

export function ChatInterface() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		const container = messagesContainerRef.current;
		if (container) {
			container.scrollTop = container.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			role: 'user',
			content: input,
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput('');
		setIsLoading(true);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: [...messages, userMessage],
				}),
			});

			if (!response.ok) throw new Error('Failed to get response');

			const reader = response.body?.getReader();
			if (!reader) throw new Error('No response body');

			const decoder = new TextDecoder();
			let assistantMessage = '';

			const assistantId = (Date.now() + 1).toString();
			setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value);
				assistantMessage += chunk;

				setMessages((prev) => {
					const updated = [...prev];
					const lastMsg = updated[updated.length - 1];
					if (lastMsg.id === assistantId) {
						lastMsg.content = assistantMessage;
					}
					return updated;
				});
			}
		} catch (error) {
			console.error('Chat error:', error);
			setMessages((prev) => [
				...prev,
				{
					id: (Date.now() + 2).toString(),
					role: 'assistant',
					content: 'Sorry, I encountered an error. Please try again.',
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	const suggestedQuestions = [
		'Tell me about your experience with Next.js',
		'What was your most complex project?',
		'Show me projects with real-time features',
		"What's your tech stack?",
	];

	return (
		<section id="chat" className="bg-slate-900 px-4 py-20">
			<div className="mx-auto max-w-3xl">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-4xl font-bold text-white">Ask Me Anything</h2>
					<p className="text-slate-400">Powered by AI, get personalized insights about my experience and projects</p>
				</div>

				{/* Chat container */}
				<div className="flex h-96 flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
					{/* Messages */}
					<div ref={messagesContainerRef} className="flex-1 space-y-4 overflow-y-auto p-6">
						{messages.length === 0 ? (
							<div className="flex h-full items-center justify-center text-slate-400">
								<p>Start a conversation by asking a question...</p>
							</div>
						) : (
							messages.map((message) => (
								<div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
									<div
										className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
											message.role === 'user' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-700 text-slate-100'
										}`}
									>
										{message.content}
									</div>
								</div>
							))
						)}
						{isLoading && (
							<div className="flex justify-start">
								<div className="rounded-lg bg-slate-700 px-4 py-2 text-slate-100">
									<div className="flex gap-2">
										<div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></div>
										<div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 delay-100"></div>
										<div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 delay-200"></div>
									</div>
								</div>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<div className="border-t border-slate-700 p-4">
						<form onSubmit={handleSubmit} className="flex gap-2">
							<Input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Ask about my experience..."
								disabled={isLoading}
								className="flex-1 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400"
							/>
							<Button
								type="submit"
								disabled={isLoading || !input.trim()}
								className="bg-cyan-500 text-slate-950 hover:bg-cyan-400"
							>
								Send
							</Button>
						</form>
					</div>
				</div>

				{/* Suggested questions */}
				{messages.length === 0 && (
					<div className="mt-8">
						<p className="mb-4 text-sm text-slate-400">Try asking:</p>
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
							{suggestedQuestions.map((question) => (
								<button
									key={question}
									onClick={() => {
										setInput(question);
									}}
									className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-left text-sm text-slate-300 transition-colors hover:border-cyan-500 hover:bg-slate-700/50"
								>
									{question}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
