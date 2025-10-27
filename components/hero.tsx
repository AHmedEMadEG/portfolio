export function Hero() {
	return (
		<section className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-20">
			{/* Decorative elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
				<div className="absolute bottom-20 left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
			</div>

			<div className="relative z-10 mx-auto max-w-4xl text-center">
				<div className="mb-6">
					<h1 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-7xl">Ahmed Emad</h1>
					<p className="text-xl font-light text-cyan-400 md:text-2xl">Fullstack Developer | MERN Stack Specialist</p>
				</div>

				<p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-300">
					I build elegant, high-performance web applications using modern technologies. Currently at V-Verse, crafting
					seamless user experiences with Next.js and cutting-edge frontend architecture.
				</p>

				<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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

				<div className="mt-16 flex justify-center gap-8 text-sm text-slate-400">
					<div>
						<p className="text-2xl font-bold text-cyan-400">3+</p>
						<p>Years Experience</p>
					</div>
					<div>
						<p className="text-2xl font-bold text-cyan-400">10+</p>
						<p>Projects Shipped</p>
					</div>
					<div>
						<p className="text-2xl font-bold text-cyan-400">100+</p>
						<p>Students Taught</p>
					</div>
				</div>
			</div>
		</section>
	);
}
