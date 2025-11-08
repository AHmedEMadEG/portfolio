'use client';

import { portfolioData } from '@/lib/portfolio-data';
import { Eye, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function ConnectSection() {
	const handlePreviewCV = () => {
		window.open('/assets/Ahmed_Emad_CV.pdf', '_blank');
	};

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
		<section className="border-border border-t bg-slate-950 px-4 py-20 md:px-8 lg:px-16">
			<div className="mx-auto max-w-6xl">
				{/* Section Header */}
				<div className="mb-16 text-center">
					<h2 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">Get In Touch</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg">
						Let's connect! Whether you have a project in mind or just want to chat about web development, I'd love to hear
						from you.
					</p>
				</div>

				{/* Contact Grid */}
				<div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
					{contactItems.map((item) => {
						const Icon = item.icon;
						return (
							<div
								key={item.label}
								className="group border-border hover:border-primary/50 rounded-lg border bg-slate-800 p-6 transition-all duration-300 hover:shadow-lg"
							>
								<div className="flex items-start gap-4">
									<div className="bg-primary/10 group-hover:bg-primary/20 rounded-lg p-3 transition-colors">
										<Icon className="text-primary h-6 w-6" />
									</div>
									<div className="flex-1">
										<h3 className="text-foreground mb-1 font-semibold">{item.label}</h3>
										{item.href ? (
											<a href={item.href} className="text-muted-foreground hover:text-primary break-all transition-colors">
												{item.value}
											</a>
										) : (
											<p className="text-muted-foreground">{item.value}</p>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Social Links & CV Download */}
				<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
					{socialLinks.map((link) => {
						const Icon = link.icon;
						return (
							<a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="bg-primary text-primary-foreground hover:bg-primary/90 flex transform items-center gap-2 rounded-lg px-6 py-3 transition-all duration-300 hover:scale-105"
							>
								<Icon className="h-5 w-5" />
								<span className="font-medium">{link.label}</span>
							</a>
						);
					})}
				</div>

				{/* CTA Text */}
				<div className="mt-12 text-center">
					<p className="text-muted-foreground text-sm">
						Feel free to reach out through any of these channels. I typically respond within 2 hours.
					</p>
				</div>
			</div>
		</section>
	);
}
