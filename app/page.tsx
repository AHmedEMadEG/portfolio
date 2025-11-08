import { ConnectSection } from '@/components/connect-section';
import { ChatInterface } from '../components/chat-interface';
import { Hero } from '../components/hero';
import { ProjectShowcase } from '../components/project-showcase';
import { SkillsSection } from '../components/skills-section';

export default function Home() {
	return (
		<main className="bg-background min-h-screen">
			<Hero />
			<ChatInterface />
			<ProjectShowcase />
			<SkillsSection />
			<ConnectSection />
		</main>
	);
}
