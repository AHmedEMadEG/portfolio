const skillCategories = [
  {
    category: "Frontend",
    skills: ["React.js", "Next.js", "Angular", "TailwindCSS", "Shadcn", "Radix UI"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "Nest.js", "REST APIs"],
  },
  {
    category: "Database",
    skills: ["MongoDB", "MySQL", "SQLite", "Firebase"],
  },
  {
    category: "Tools & Languages",
    skills: ["TypeScript", "JavaScript", "Git", "Java", "C++"],
  },
]

export function SkillsSection() {
  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
          <p className="text-slate-400">Full-stack capabilities across modern web technologies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category) => (
            <div key={category.category}>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">{category.category}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-slate-300 text-sm flex items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
