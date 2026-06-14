'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Sparkles, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { GlowField, GridBackdrop } from './decorations';
import { Reveal } from './reveal';

interface Message {
	id: string;
	role: 'user' | 'assistant';
	content: string;
}

function Avatar({ role }: { role: Message['role'] }) {
	if (role === 'user') {
		return (
			<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-200">
				<User className="h-4 w-4" />
			</div>
		);
	}
	return (
		<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.45)]">
			<Sparkles className="h-4 w-4" />
		</div>
	);
}

function TypingIndicator() {
	return (
		<div className="animate-message flex items-end gap-2.5">
			<div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.45)]">
				<span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/30" />
				<Sparkles className="relative h-4 w-4" />
			</div>
			<div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-700/60 bg-slate-700/60 px-4 py-3 backdrop-blur-sm">
				<span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
				<span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
				<span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
			</div>
		</div>
	);
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

	const sendMessage = async (text: string) => {
		const trimmed = text.trim();
		if (!trimmed || isLoading) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			role: 'user',
			content: trimmed,
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		sendMessage(input);
	};

	const suggestedQuestions = [
		'Tell me about your experience with Next.js',
		'What was your most complex project?',
		'Show me projects with real-time features',
		"What's your tech stack?",
	];

	const lastMessage = messages[messages.length - 1];
	// Show the standalone "thinking" bubble only while waiting for the first token.
	const showThinking = isLoading && (!lastMessage || lastMessage.role === 'user');

	return (
		<section id="chat" className="relative overflow-hidden bg-slate-900 px-4 py-20">
			<GridBackdrop />
			<GlowField />

			<div className="relative z-10 mx-auto max-w-3xl">
				<Reveal className="mb-12 text-center">
					<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300">
						<Sparkles className="h-4 w-4" />
						AI Assistant
					</div>
					<h2 className="animate-gradient-text mb-4 bg-linear-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
						Ask Me Anything
					</h2>
					<p className="text-slate-400">Powered by AI — get personalized insights about my experience and projects</p>
				</Reveal>

				<Reveal variant="scale" delay={100}>
					{/* Chat container */}
					<div className="flex h-96 flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 shadow-[0_20px_60px_-20px_rgba(34,211,238,0.25)] backdrop-blur-md">
						{/* Messages */}
						<div ref={messagesContainerRef} className="flex-1 space-y-4 overflow-y-auto p-6">
							{messages.length === 0 ? (
								<div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-400">
									<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400/20 to-blue-500/20 ring-1 ring-cyan-500/30">
										<MessageSquare className="h-6 w-6 text-cyan-400" />
									</div>
									<p className="max-w-xs text-sm">Start a conversation — ask me anything about my work and experience.</p>
								</div>
							) : (
								messages.map((message, index) => {
									const isUser = message.role === 'user';
									const isStreaming = isLoading && index === messages.length - 1 && message.role === 'assistant';
									return (
										<div
											key={message.id}
											className={`animate-message flex items-end gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
										>
											<Avatar role={message.role} />
											<div
												className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
													isUser
														? 'rounded-br-md bg-cyan-500 text-slate-950'
														: 'rounded-bl-md border border-slate-700/60 bg-slate-700/60 text-slate-100 backdrop-blur-sm'
												}`}
											>
												{message.role === 'assistant' && message.content === '' ? (
													<span className="flex items-center gap-1.5 py-1">
														<span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
														<span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
														<span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
													</span>
												) : (
													<>
														{message.content}
														{isStreaming && (
															<span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-cyan-400 align-middle" />
														)}
													</>
												)}
											</div>
										</div>
									);
								})
							)}
							{showThinking && <TypingIndicator />}
							<div ref={messagesEndRef} />
						</div>

						{/* Input */}
						<div className="border-t border-slate-700/60 bg-slate-900/40 p-4">
							<form onSubmit={handleSubmit} className="flex gap-2">
								<Input
									value={input}
									onChange={(e) => setInput(e.target.value)}
									placeholder="Ask about my experience..."
									disabled={isLoading}
									className="flex-1 border-slate-600 bg-slate-700/70 text-white transition-shadow placeholder:text-slate-400 focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-500/40"
								/>
								<Button
									type="submit"
									disabled={isLoading || !input.trim()}
									className="gap-1.5 bg-cyan-500 text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-[0_6px_20px_-6px_rgba(34,211,238,0.7)]"
								>
									<Send className="h-4 w-4" />
									Send
								</Button>
							</form>
						</div>
					</div>
				</Reveal>

				{/* Suggested questions */}
				{messages.length === 0 && (
					<div className="mt-8">
						<Reveal>
							<p className="mb-4 text-sm text-slate-400">Try asking:</p>
						</Reveal>
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
							{suggestedQuestions.map((question, i) => (
								<Reveal key={question} delay={i * 80}>
									<button
										onClick={() => sendMessage(question)}
										disabled={isLoading}
										className="group flex h-full w-full items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 p-3 text-left text-sm text-slate-300 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500 hover:bg-slate-700/50 hover:shadow-[0_8px_24px_-10px_rgba(34,211,238,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
									>
										<Sparkles className="h-3.5 w-3.5 shrink-0 text-cyan-400/70 transition-colors group-hover:text-cyan-400" />
										{question}
									</button>
								</Reveal>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
