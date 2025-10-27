export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">Ahmed Emad</h1>
          <p className="text-xl md:text-2xl text-cyan-400 font-light">Fullstack Developer | MERN Stack Specialist</p>
        </div>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          I build elegant, high-performance web applications using modern technologies. Currently at V-Verse, crafting
          seamless user experiences with Next.js and cutting-edge frontend architecture.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#chat"
            className="px-8 py-3 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Ask Me Anything
          </a>
          <a
            href="https://github.com/AHmedEMadEG"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-colors"
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
  )
}
