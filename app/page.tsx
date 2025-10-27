import { ChatInterface } from "../components/chat-interface"
import { ProjectShowcase } from "../components/project-showcase"
import { SkillsSection } from "../components/skills-section"
import { Hero } from "../components/hero"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <ChatInterface />
      <ProjectShowcase />
      <SkillsSection />
    </main>
  )
}
