const projects = [
  {
    title: "CVRM Platform",
    description:
      "Multi-tenant CRM system with role-based dashboards, real-time notifications, and contract lifecycle management.",
    tech: ["React.js", "TailwindCSS", "SWR", "Laravel"],
    highlights: ["Multi-tenant architecture", "Real-time notifications", "Activity timeline"],
    date: "2025",
  },
  {
    title: "MerchApp",
    description:
      "Full-featured affiliate marketplace with merchant dashboards, analytics, and location-based personalization.",
    tech: ["Next.js", "Firebase", "Zustand", "Radix UI"],
    highlights: ["Merchant dashboard", "Real-time analytics", "Admin panel"],
    date: "2025",
  },
  {
    title: "TrendsApp",
    description: "AI-powered trend explorer with social media content generation and subscription management.",
    tech: ["Next.js", "Firebase", "AI SDK", "Shadcn"],
    highlights: ["AI content generation", "PayPal integration", "Live deployment"],
    date: "2025",
  },
]

export function ProjectShowcase() {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400">A selection of recent work showcasing full-stack capabilities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-500 transition-colors group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs text-slate-400">{project.date}</span>
              </div>

              <p className="text-slate-300 text-sm mb-4">{project.description}</p>

              <div className="mb-4">
                <p className="text-xs text-slate-400 mb-2">Highlights:</p>
                <ul className="space-y-1">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="text-xs text-cyan-400">
                      • {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
