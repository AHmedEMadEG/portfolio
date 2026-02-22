'use client';

import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from './ui/EmblaCarousel';

const projects = [
	{
		title: 'CVRM Platform',
		description:
			'Multi-tenant CRM system with role-based dashboards, real-time notifications, and contract lifecycle management.',
		tech: ['React.js', 'TailwindCSS', 'SWR'],
		highlights: ['Multi-tenant architecture', 'Real-time notifications', 'Activity timeline'],
		date: '10/2025 - 02/2026',
		fullDescription:
			'Part of the development team of a full-cycle CVRM platform from concept to deployment, designed to streamline customer and vendor interactions. Engineered a multi-tenant architecture with role-based dashboards and implemented core modules including lead/pipeline management, customer & vendor portals, contract lifecycle tracking, and an integrated ticketing system.',
	},
	{
		title: 'MerchApp',
		description:
			'Full-featured affiliate marketplace with merchant dashboards, analytics, and location-based personalization.',
		tech: ['Next.js', 'Firebase', 'Zustand', 'TailwindCSS', 'Radix UI', 'ImageKit'],
		highlights: ['Merchant dashboard', 'Real-time analytics', 'Admin panel', 'Location-based personalization'],
		date: '06/2025',
		fullDescription:
			'Built a full-featured affiliate marketplace with role-based access for users, merchants, and a centralized admin. Developed a merchant dashboard to manage products, monitor performance, and track product view analytics. Implemented wishlist functionality, location-based personalization, and category filtering to enhance user engagement.',
	},
	{
		title: 'TrendsApp',
		description: 'AI-powered trend explorer with social media content generation and subscription management.',
		tech: ['Next.js', 'Firebase', 'Shadcn', 'AI SDK', 'Zustand', 'Zod'],
		highlights: ['AI content generation', 'PayPal integration', 'Live deployment'],
		date: '05/2025',
		fullDescription:
			'Built a live AI-powered trend explorer enabling users to search across Google, YouTube, Reddit, and more. Integrated AI content generation for social media hooks, post captions, blog intros, hashtags, and video scripts. Implemented Firebase authentication and PayPal-based subscription flow for premium users.',
	},
	{
		title: 'ITI Graduates Portal',
		description: 'Platform for ITI alumni engagement with admin dashboards and user management tools.',
		tech: ['MERN Stack', 'TailwindCSS', 'DaisyUI'],
		highlights: ['Led team of 7', '1000+ active users', 'Excel export features'],
		date: '10/2022 - 11/2022',
		fullDescription:
			'Led a team of 7 to launch a platform for ITI alumni engagement, now used by over 1,000 active users. Designed and implemented admin dashboards and user registration management tools. Reviewed GitHub pull requests and enforced best practices for scalable code.',
	},
	{
		title: 'ToyzCity',
		description: 'Toy exchange platform with advanced filtering and user dashboards.',
		tech: ['MERN Stack', 'TailwindCSS', 'DaisyUI'],
		highlights: ['Advanced filtering', 'Team leadership', 'Mobile-first UI'],
		date: '09/2022 - 10/2022',
		fullDescription:
			'Spearheaded development of a toy exchange platform with advanced filtering (region, condition, availability). Oversaw a team of 5, reviewing PRs, offering feedback, and managing sprint priorities. Delivered full-stack features including item listings, user dashboards, and mobile-first UI.',
	},
	{
		title: 'Social Media App',
		description: 'Platform for creating posts, comments, and likes with real-time interactions.',
		tech: ['MERN Stack', 'TailwindCSS', 'DaisyUI'],
		highlights: ['Real-time features', 'User interactions', 'Following system'],
		date: '09/2022',
		fullDescription:
			'Developing a platform where users can create posts, comment, and like content. Planning future features including real-time notifications for interactions, implementing functionality for following other users and enabling chat.',
	},
	{
		title: 'SuppleMart',
		description: 'E-commerce platform for health supplements with full cart and checkout functionality.',
		tech: ['MEAN Stack', 'TailwindCSS', 'DaisyUI'],
		highlights: ['E-commerce platform', 'Team leadership', 'Reusable components'],
		date: '08/2022 - 09/2022',
		fullDescription:
			'Directed a 5-member team to build a responsive e-commerce platform for health supplements. Built key modules including authentication, authorization, and a fully functional product cart. Designed and implemented reusable components like the app navbar and checkout logic.',
	},
	{
		title: 'Examination Platform',
		description: 'Online exam platform with automated grading and real-time feedback.',
		tech: ['HTML', 'CSS', 'JavaScript'],
		highlights: ['Automated grading', 'Real-time feedback', 'Online testing'],
		date: '07/2022',
		fullDescription: 'Built an online exam platform with automated grading and real-time feedback for users.',
	},
	{
		title: 'OutfitMarket',
		description: 'Online marketplace with cart, Stripe checkout, and product filtering.',
		tech: ['MERN Stack', 'Styled Components', 'Stripe'],
		highlights: ['Stripe integration', 'JWT authentication', 'Product filtering'],
		date: '04/2022',
		fullDescription:
			'Built an online marketplace with cart, checkout using stripe, authentication using JWT, and product filtering features.',
	},
];

const OPTIONS: EmblaOptionsType = {
	loop: true,
	align: 'start',
	dragFree: true,
};

export function ProjectShowcase() {
	return (
		<section className="relative overflow-hidden bg-slate-950 px-4 py-20">
			<div className="mx-auto max-w-6xl">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl font-bold text-white">Featured Projects</h2>
					<p className="text-slate-400">Swipe through my full-stack development journey</p>
				</div>
				{/* Pass your projects data and options to EmblaCarousel */}
				<EmblaCarousel projects={projects} options={OPTIONS} />
			</div>
		</section>
	);
}
