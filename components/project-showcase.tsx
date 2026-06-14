'use client';

import { projects } from '@/lib/portfolio-data';
import { EmblaOptionsType } from 'embla-carousel';
import { GlowField, GridBackdrop } from './decorations';
import { Reveal } from './reveal';
import EmblaCarousel from './ui/EmblaCarousel';

const OPTIONS: EmblaOptionsType = {
	loop: true,
	align: 'center',
};

export function ProjectShowcase() {
	return (
		<section className="relative overflow-hidden bg-slate-950 px-4 py-20">
			<GridBackdrop />
			<GlowField colorA="bg-cyan-500/10" colorB="bg-violet-500/10" />

			<div className="relative z-10 mx-auto max-w-6xl">
				<Reveal className="mb-14 text-center">
					<h2 className="animate-gradient-text mb-4 bg-linear-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
						Featured Projects
					</h2>
					<p className="text-slate-400">Swipe through my full-stack development journey</p>
					<p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
						Note: Some professional projects may not include a live demo because they are deployed in private client
						environments or their configurations have changed after delivery.
					</p>
				</Reveal>

				<Reveal variant="fade" delay={100}>
					<EmblaCarousel projects={projects} options={OPTIONS} />
				</Reveal>
			</div>
		</section>
	);
}
