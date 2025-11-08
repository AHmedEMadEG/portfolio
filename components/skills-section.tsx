const skillCategories = [
	{
		category: 'Frontend',
		skills: ['React.js', 'Next.js', 'Angular', 'TailwindCSS', 'Shadcn', 'Radix UI'],
	},
	{
		category: 'Backend',
		skills: ['Node.js', 'Express.js', 'Nest.js', 'REST APIs'],
	},
	{
		category: 'Database',
		skills: ['MongoDB', 'MySQL', 'SQLite', 'Firebase'],
	},
	{
		category: 'Tools & Languages',
		skills: ['TypeScript', 'JavaScript', 'Git', 'Java', 'C++'],
	},
];

export function SkillsSection() {
	return (
		<section className="bg-slate-900 px-4 py-20">
			<div className="mx-auto max-w-5xl">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl font-bold text-white">Skills & Expertise</h2>
					<p className="text-slate-400">Full-stack capabilities across modern web technologies</p>
				</div>

				<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
					{skillCategories.map((category) => (
						<div key={category.category}>
							<h3 className="mb-4 text-lg font-semibold text-cyan-400">{category.category}</h3>
							<ul className="space-y-2">
								{category.skills.map((skill) => (
									<li key={skill} className="flex items-center text-sm text-slate-300">
										<span className="mr-3 h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
										{skill}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
