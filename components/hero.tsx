import { HeroCanvas } from './hero-canvas';
import { HeroParticles } from './hero-particles';

export function Hero() {
	return (
		<section className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
			{/* Drifting particle field across the whole section */}
			<HeroParticles />

			{/* Ambient color blobs */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="animate-float-slow absolute top-20 right-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
				<div className="animate-float-medium absolute bottom-20 left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
			</div>

			<div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-6 px-4 py-20 lg:grid-cols-2 lg:gap-12">
				{/* Left: text */}
				<div className="text-center lg:text-left">
					<div className="mb-6">
						<h1 className="mb-4 text-5xl font-bold tracking-tight text-white transition-all duration-500 hover:text-cyan-400 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] md:text-7xl">
							Ahmed Emad
						</h1>
						<p className="text-xl font-light text-cyan-400 md:text-2xl">Full-Stack Engineer | Next.js, React & Node.js</p>
					</div>

					<p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-300 lg:mx-0">
						I build elegant, high-performance web applications with Next.js, React, and Node.js — currently developing
						AI-powered products at RebusAI and delivering custom solutions for clients worldwide.
					</p>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
						<a
							href="#chat"
							className="rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
						>
							Ask Me Anything
						</a>
						<a
							href="https://github.com/AHmedEMadEG"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-lg border border-cyan-500 px-8 py-3 font-semibold text-cyan-400 transition-colors hover:bg-cyan-500/10"
						>
							View GitHub
						</a>
					</div>

					<div className="mt-16 flex justify-center gap-8 text-sm text-slate-400 lg:justify-start">
						<div>
							<p className="text-2xl font-bold text-cyan-400">3+</p>
							<p>Years Experience</p>
						</div>
						<div>
							<p className="text-2xl font-bold text-cyan-400">15+</p>
							<p>Projects Shipped</p>
						</div>
						<div>
							<p className="text-2xl font-bold text-cyan-400">190+</p>
							<p>Students Taught</p>
						</div>
					</div>
				</div>

				{/* Right: 3D animated orb */}
				<div className="relative order-first h-[40vh] min-h-[300px] w-full overflow-hidden lg:order-0 lg:h-[80vh]">
					<HeroCanvas />
				</div>
			</div>
		</section>
	);
}
