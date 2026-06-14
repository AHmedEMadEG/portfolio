import { portfolioData } from '@/lib/portfolio-data';
import { Code2, Database, Layout, Server, Wrench, Zap, type LucideIcon } from 'lucide-react';
import { GlowField, GridBackdrop } from './decorations';
import { Reveal } from './reveal';
import { TiltCard } from './tilt-card';

// Label + icon per skill category, keyed off portfolioData.skills (single source of truth).
const categoryConfig: Record<keyof typeof portfolioData.skills, { label: string; icon: LucideIcon }> = {
	frontend: { label: 'Frontend', icon: Layout },
	backend: { label: 'Backend', icon: Server },
	database: { label: 'Database', icon: Database },
	tools: { label: 'Tools', icon: Wrench },
	features: { label: 'Features', icon: Zap },
	languages: { label: 'Languages', icon: Code2 },
};

const skillCategories = (Object.keys(portfolioData.skills) as (keyof typeof portfolioData.skills)[]).map((key) => ({
	category: categoryConfig[key].label,
	icon: categoryConfig[key].icon,
	skills: portfolioData.skills[key],
}));

export function SkillsSection() {
	return (
		<section className="relative overflow-hidden bg-slate-900 px-4 py-20">
			<GridBackdrop />
			<GlowField colorA="bg-cyan-500/10" colorB="bg-violet-500/10" />

			<div className="relative z-10 mx-auto max-w-5xl">
				<Reveal className="mb-16 text-center">
					<h2 className="animate-gradient-text mb-4 bg-linear-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
						Skills & Expertise
					</h2>
					<p className="text-slate-400">Full-stack capabilities across modern web technologies</p>
				</Reveal>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{skillCategories.map((category, i) => {
						const Icon = category.icon;
						return (
							<Reveal key={category.category} delay={i * 80} className="h-full">
								<TiltCard className="h-full">
									<div className="group relative h-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/60 hover:shadow-[0_12px_44px_-14px_rgba(34,211,238,0.4)]">
										<span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/70 to-transparent" />

										<div className="mb-5 flex items-center gap-3">
											<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20 transition-colors duration-300 group-hover:bg-cyan-500/20">
												<Icon className="h-5 w-5" />
											</div>
											<h3 className="text-lg font-semibold text-white">{category.category}</h3>
											<span className="ml-auto text-xs font-medium text-slate-500">{category.skills.length}</span>
										</div>

										<div className="flex flex-wrap gap-2">
											{category.skills.map((skill) => (
												<span
													key={skill}
													className="rounded-lg border border-slate-700/70 bg-slate-900/50 px-2.5 py-1 text-xs font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/60 hover:bg-cyan-500/10 hover:text-cyan-300"
												>
													{skill}
												</span>
											))}
										</div>
									</div>
								</TiltCard>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
