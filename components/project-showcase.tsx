'use client';

import { projects } from '@/lib/portfolio-data';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from './ui/EmblaCarousel';

const OPTIONS: EmblaOptionsType = {
	loop: true,
	align: 'start',
	dragFree: true,
};

export function ProjectShowcase() {
	return (
		<section className="relative overflow-hidden bg-slate-950 px-4 py-20">
			<div className="mx-auto max-w-6xl">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl font-bold text-white">Featured Projects</h2>
					<p className="text-slate-400">Swipe through my full-stack development journey</p>
					<p className="text-slate-500">
						Note: Some professional projects may not include a live demo because they are deployed in private client
						environments or their configurations have changed after delivery.
					</p>
				</div>
				{/* Pass your projects data and options to EmblaCarousel */}
				<EmblaCarousel projects={projects} options={OPTIONS} />
			</div>
		</section>
	);
}
