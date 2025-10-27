"use client"

import { useState, useRef } from 'react'

const projects = [
  {
    title: "CVRM Platform",
    description: "Multi-tenant CRM system with role-based dashboards, real-time notifications, and contract lifecycle management.",
    tech: ["React.js", "TailwindCSS", "SWR", "Laravel"],
    highlights: ["Multi-tenant architecture", "Real-time notifications", "Activity timeline"],
    date: "10/2025 – Present",
    fullDescription: "Part of the development team of a full-cycle CVRM platform from concept to deployment, designed to streamline customer and vendor interactions. Engineered a multi-tenant architecture with role-based dashboards and implemented core modules including lead/pipeline management, customer & vendor portals, contract lifecycle tracking, and an integrated ticketing system."
  },
  {
    title: "MerchApp",
    description: "Full-featured affiliate marketplace with merchant dashboards, analytics, and location-based personalization.",
    tech: ["Next.js", "Firebase", "Zustand", "TailwindCSS", "Radix UI", "ImageKit"],
    highlights: ["Merchant dashboard", "Real-time analytics", "Admin panel", "Location-based personalization"],
    date: "06/2025",
    fullDescription: "Built a full-featured affiliate marketplace with role-based access for users, merchants, and a centralized admin. Developed a merchant dashboard to manage products, monitor performance, and track product view analytics. Implemented wishlist functionality, location-based personalization, and category filtering to enhance user engagement."
  },
  {
    title: "TrendsApp",
    description: "AI-powered trend explorer with social media content generation and subscription management.",
    tech: ["Next.js", "Firebase", "Shadcn", "AI SDK", "Zustand", "Zod"],
    highlights: ["AI content generation", "PayPal integration", "Live deployment"],
    date: "05/2025",
    fullDescription: "Built a live AI-powered trend explorer enabling users to search across Google, YouTube, Reddit, and more. Integrated AI content generation for social media hooks, post captions, blog intros, hashtags, and video scripts. Implemented Firebase authentication and PayPal-based subscription flow for premium users."
  },
  {
    title: "ITI Graduates Portal",
    description: "Platform for ITI alumni engagement with admin dashboards and user management tools.",
    tech: ["MERN Stack", "TailwindCSS", "DaisyUI"],
    highlights: ["Led team of 7", "1000+ active users", "Excel export features"],
    date: "10/2024 – 11/2024",
    fullDescription: "Led a team of 7 to launch a platform for ITI alumni engagement, now used by over 1,000 active users. Designed and implemented admin dashboards and user registration management tools. Reviewed GitHub pull requests and enforced best practices for scalable code."
  },
  {
    title: "ToyzCity",
    description: "Toy exchange platform with advanced filtering and user dashboards.",
    tech: ["MERN Stack", "TailwindCSS", "DaisyUI"],
    highlights: ["Advanced filtering", "Team leadership", "Mobile-first UI"],
    date: "09/2024 – 10/2024",
    fullDescription: "Spearheaded development of a toy exchange platform with advanced filtering (region, condition, availability). Oversaw a team of 5, reviewing PRs, offering feedback, and managing sprint priorities. Delivered full-stack features including item listings, user dashboards, and mobile-first UI."
  },
  {
    title: "Social Media App",
    description: "Platform for creating posts, comments, and likes with real-time interactions.",
    tech: ["MERN Stack", "TailwindCSS", "DaisyUI"],
    highlights: ["Real-time features", "User interactions", "Following system"],
    date: "09/2024 – Present",
    fullDescription: "Developing a platform where users can create posts, comment, and like content. Planning future features including real-time notifications for interactions, implementing functionality for following other users and enabling chat."
  },
  {
    title: "SuppleMart",
    description: "E-commerce platform for health supplements with full cart and checkout functionality.",
    tech: ["MEAN Stack", "TailwindCSS", "DaisyUI"],
    highlights: ["E-commerce platform", "Team leadership", "Reusable components"],
    date: "08/2024 – 09/2024",
    fullDescription: "Directed a 5-member team to build a responsive e-commerce platform for health supplements. Built key modules including authentication, authorization, and a fully functional product cart. Designed and implemented reusable components like the app navbar and checkout logic."
  },
  {
    title: "Examination Platform",
    description: "Online exam platform with automated grading and real-time feedback.",
    tech: ["HTML", "CSS", "JavaScript"],
    highlights: ["Automated grading", "Real-time feedback", "Online testing"],
    date: "07/2024",
    fullDescription: "Built an online exam platform with automated grading and real-time feedback for users."
  },
  {
    title: "OutfitMarket",
    description: "Online marketplace with cart, Stripe checkout, and product filtering.",
    tech: ["MERN Stack", "Styled Components", "Stripe"],
    highlights: ["Stripe integration", "JWT authentication", "Product filtering"],
    date: "07/2024",
    fullDescription: "Built an online marketplace with cart, checkout using stripe, authentication using JWT, and product filtering features."
  }
]

export function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const visibleProjects = [
    projects[(currentIndex - 1 + projects.length) % projects.length],
    projects[currentIndex],
    projects[(currentIndex + 1) % projects.length]
  ]

  return (
    <section className="py-20 px-4 bg-slate-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400">Swipe through my full-stack development journey</p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-slate-800 opacity-30 sm:opacity-100 hover:bg-cyan-600 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-slate-800 opacity-30 sm:opacity-100 hover:bg-cyan-600 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Projects Slider */}
          <div ref={sliderRef} className="flex justify-center items-center gap-6 min-h-[400px]">
            {visibleProjects.map((project, index) => {
              const position = index === 0 ? -1 : index === 1 ? 0 : 1
              const isCenter = position === 0

              return (
                <div
                  key={project.title}
                  className={`
                    min-w-[340px]
                    transition-all duration-500 ease-in-out transform
                    ${isCenter 
                      ? 'scale-100 opacity-100 z-20' 
                      : 'scale-90 opacity-60 z-10'
                    }
                    ${position === -1 ? '-translate-x-20' : ''}
                    ${position === 1 ? 'translate-x-20' : ''}
                    bg-slate-800 border border-slate-700 rounded-xl p-6 
                    hover:border-cyan-500 transition-colors group
                    w-full max-w-md
                  `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-slate-400">{project.date}</span>
                  </div>

                  <p className="text-slate-300 text-sm mb-4">{project.fullDescription}</p>

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
                      <span 
                        key={tech} 
                        className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  cursor-pointer
                  w-3 h-3 rounded-full transition-all
                  ${index === currentIndex 
                    ? 'bg-cyan-500 scale-125' 
                    : 'bg-slate-600 hover:bg-slate-500'
                  }
                `}
              />
            ))}
          </div>

          {/* Project Counter */}
          <div className="text-center mt-4">
            <span className="text-slate-400 text-sm">
              {currentIndex + 1} / {projects.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}