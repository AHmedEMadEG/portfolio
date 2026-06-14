'use client';

import { portfolioData } from '@/lib/portfolio-data';
import { Eye, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { GlowField, GridBackdrop } from './decorations';
import { Reveal } from './reveal';
import { TiltCard } from './tilt-card';

export function ConnectSection() {
	const contactItems = [
		{
			icon: Mail,
			label: 'Email',
			value: portfolioData.email,
			href: `mailto:${portfolioData.email}`,
		},
		{
			icon: Phone,
			label: 'Phone',
			value: portfolioData.phone,
			href: `tel:${portfolioData.phone}`,
		},
		{
			icon: MapPin,
			label: 'Location',
			value: portfolioData.location,
			href: null,
		},
	];

	const socialLinks = [
		{
			icon: Github,
			label: 'GitHub',
			href: portfolioData.social.github,
		},
		{
			icon: Linkedin,
			label: 'LinkedIn',
			href: portfolioData.social.linkedin,
		},
		{
			icon: Eye,
			label: 'Preview CV',
			href: '/assets/Ahmed_Emad_CV.pdf',
		},
	];

	return (
		<section className="border-border relative overflow-hidden border-t bg-slate-950 px-4 py-20 md:px-8 lg:px-16">
			<GridBackdrop />
			<GlowField colorA="bg-cyan-500/10" colorB="bg-blue-500/10" />

			<div className="relative z-10 mx-auto max-w-6xl">
				{/* Section Header */}
				<Reveal className="mb-16 text-center">
					<h2 className="animate-gradient-text mb-4 bg-linear-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
						Get In Touch
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-slate-400">
						Let's connect! Whether you have a project in mind or just want to chat about web development, I'd love to hear
						from you.
					</p>
				</Reveal>

				{/* Contact Grid */}
				<div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
					{contactItems.map((item, i) => {
						const Icon = item.icon;
						return (
							<Reveal key={item.label} delay={i * 90} className="h-full">
								<TiltCard className="h-full">
									<div className="group relative h-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/60 hover:shadow-[0_12px_44px_-14px_rgba(34,211,238,0.4)]">
										<span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/70 to-transparent" />
										<div className="flex items-start gap-4">
											<div className="rounded-xl bg-cyan-500/10 p-3 transition-colors group-hover:bg-cyan-500/20">
												<Icon className="h-6 w-6 text-cyan-400" />
											</div>
											<div className="flex-1">
												<h3 className="mb-1 font-semibold text-white">{item.label}</h3>
												{item.href ? (
													<a
														href={item.href}
														className="break-all text-slate-400 transition-colors hover:text-cyan-400"
													>
														{item.value}
													</a>
												) : (
													<p className="text-slate-400">{item.value}</p>
												)}
											</div>
										</div>
									</div>
								</TiltCard>
							</Reveal>
						);
					})}
				</div>

				{/* Social Links & CV Download */}
				<Reveal className="flex flex-col items-center justify-center gap-4 sm:flex-row">
					{socialLinks.map((link) => {
						const Icon = link.icon;
						return (
							<a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition-all duration-300 hover:scale-105 hover:bg-cyan-400 hover:shadow-[0_10px_30px_-8px_rgba(34,211,238,0.7)]"
							>
								<span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
								<Icon className="relative h-5 w-5" />
								<span className="relative">{link.label}</span>
							</a>
						);
					})}
				</Reveal>

				{/* CTA Text */}
				<Reveal className="mt-12 text-center" delay={100}>
					<p className="text-sm text-slate-400">
						Feel free to reach out through any of these channels. I typically respond within 2 hours.
					</p>
				</Reveal>
			</div>
		</section>
	);
}
