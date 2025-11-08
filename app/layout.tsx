import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type React from 'react';
import './globals.css';

const geistSans = Geist({
	subsets: ['latin'],
	variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono',
});

export const metadata: Metadata = {
	title: 'Ahmed Emad - Fullstack Developer',
	description: 'AI-powered portfolio showcasing fullstack development expertise with MERN stack',
	openGraph: {
		title: 'Ahmed Emad - Fullstack Developer',
		description: 'Interactive AI-powered portfolio',
		type: 'website',
	},
	icons: {
		icon: '/my-pic.jpg',
		shortcut: '/my-pic.jpg',
		apple: '/my-pic.jpg',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
			<body>{children}</body>
		</html>
	);
}
