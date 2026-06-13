export type Project = {
	title: string;
	description: string;
	tech: string[];
	highlights: string[];
	date: string;
	fullDescription: string;
	liveLink?: string;
	type: 'Professional' | 'Academic';
};

// Single source of truth for portfolio projects.
// Consumed by the project showcase carousel and the AI chat assistant.
export const projects: Project[] = [
	{
		title: 'Jezery WA Sender',
		description:
			'Chrome extension automating WhatsApp Web outreach with CSV/Excel import, contact lists, and controlled delivery.',
		tech: ['JavaScript', 'Manifest V3', 'Chrome Extension APIs', 'IndexedDB', 'DevTools Protocol'],
		highlights: ['CSV/Excel import', 'Duplicate detection', 'Reliable background execution'],
		date: '06/2026 - Present',
		fullDescription:
			'Building a Chrome extension for WhatsApp Web outreach with CSV/Excel import, reusable contact lists, duplicate detection, media messages, and controlled delivery delays. Solved background execution limitations using Chrome APIs to keep campaigns running reliably with minimal user interaction.',
		type: 'Professional',
	},
	{
		title: 'HR Spark',
		description:
			'Arabic (RTL) HR e-learning platform with role-based dashboards, e-wallet payments, and secure video streaming.',
		tech: ['Next.js', 'TypeScript', 'Firebase', 'TailwindCSS', 'Radix UI', 'React Query', 'Bunny Stream'],
		highlights: ['RTL course platform', 'E-wallet + admin approval flow', 'Tokenized video streaming', 'Per-user watermarking'],
		date: '05/2026 - Present',
		fullDescription:
			'Building an Arabic (RTL) course platform with role-based dashboards, an e-wallet payment and admin approval flow, and video progress tracking. Implementing secure tokenized video streaming with access control, concurrent-stream limits, and per-user watermarking to prevent account sharing.',
		type: 'Professional',
	},
	{
		title: 'Real Estate Distress Finder',
		description:
			'Telegram bot analyzing UAE property listings to surface high-opportunity real estate deals.',
		tech: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Firebase', 'Playwright', 'Vercel', 'Telegram Bot API'],
		highlights: ['Bayut & PropertyFinder analysis', 'Price-drop & duplicate detection', 'Two-service architecture'],
		date: '04/2026 - Present',
		fullDescription:
			'Building a Telegram bot that analyzes Bayut and PropertyFinder listings to identify high-opportunity UAE real estate deals using price drops, reposts, time on market, and duplicate listings. Designed a two-service architecture separating the user-facing bot from the background scraping service for better reliability and scalability.',
		type: 'Professional',
	},
	{
		title: 'Rebus Mentorship Platform',
		description:
			'Online mentorship platform enabling mentor discovery, session bookings, events, and real-time communication.',
		tech: ['Next.js', 'TypeScript', 'Firebase', 'TailwindCSS', 'TanStack Query'],
		highlights: ['Session booking system', 'Events management', 'Real-time chat'],
		date: '02/2026 - Present',
		fullDescription:
			'Contributing to the development of a mentorship platform connecting mentors and mentees through structured session bookings and interactive communication. Developed core features using Next.js, TypeScript, and Firebase including mentor discovery, role-based dashboards, and scalable frontend architecture. Implemented key modules such as session booking, event management, and real-time chat, along with notifications and mentor profile pages to streamline mentorship interactions.',
		liveLink: 'https://www.mentor.rebusai.com/',
		type: 'Professional',
	},
	{
		title: 'CVRM Platform',
		description:
			'Multi-tenant customer & vendor management platform with role-based dashboards and workflow automation.',
		tech: ['React.js', 'TailwindCSS', 'SWR'],
		highlights: ['Multi-tenant architecture', 'Lead & contract tracking', 'Real-time notifications', 'Ticketing system'],
		date: '10/2025 - 02/2026',
		fullDescription:
			'Contributed to a multi-tenant customer and vendor relationship management platform from concept to deployment, designed to streamline customer and vendor interactions. Engineered a multi-tenant architecture with role-based dashboards and implemented core modules including lead/pipeline management, customer & vendor portals, contract lifecycle tracking, and an integrated ticketing system with real-time notifications.',
		liveLink: 'https://seam-portal.com/',
		type: 'Professional',
	},
	{
		title: 'MerchApp',
		description:
			'Full-featured affiliate marketplace with merchant dashboards, analytics, and location-based personalization.',
		tech: ['Next.js', 'Firebase', 'Zustand', 'TailwindCSS', 'Radix UI', 'ImageKit'],
		highlights: ['Merchant dashboard', 'Real-time analytics', 'Admin panel', 'Location-based personalization'],
		date: '06/2025',
		fullDescription:
			'Built a role-based affiliate marketplace with access for users, merchants, and a centralized admin. Developed a merchant dashboard to manage products, monitor performance, and track product view analytics. Implemented authentication, wishlists, trending products, location-aware discovery, and category filtering to enhance user engagement.',
		liveLink: 'https://merch-three.vercel.app/',
		type: 'Professional',
	},
	{
		title: 'TrendsApp',
		description: 'AI-powered trend explorer with social media content generation and subscription management.',
		tech: ['Next.js', 'Firebase', 'Shadcn', 'AI SDK', 'Zustand', 'Zod'],
		highlights: ['AI content generation', 'PayPal integration', 'Live deployment'],
		date: '05/2025',
		fullDescription:
			'Built a live AI-powered trend explorer enabling users to search across Google, YouTube, Reddit, and more. Integrated AI content generation for social media hooks, post captions, blog intros, hashtags, and video scripts. Implemented Firebase authentication and PayPal-based subscription flow for premium users.',
		type: 'Professional',
	},
	{
		title: 'ITI Graduates Portal',
		description: 'Platform for ITI alumni engagement with admin dashboards and user management tools.',
		tech: ['MERN Stack', 'TailwindCSS', 'DaisyUI'],
		highlights: ['Led team of 7', '1000+ active users', 'Excel export features'],
		date: '10/2022 - 11/2022',
		fullDescription:
			'Led a team of 7 to launch a platform for ITI alumni engagement, now used by over 1,000 active users. Designed and implemented admin dashboards and user registration management tools. Reviewed GitHub pull requests and enforced best practices for scalable code.',
		type: 'Academic',
	},
	{
		title: 'ToyzCity',
		description: 'Toy exchange platform with advanced filtering and user dashboards.',
		tech: ['MERN Stack', 'TailwindCSS', 'DaisyUI'],
		highlights: ['Advanced filtering', 'Team leadership', 'Mobile-first UI'],
		date: '09/2022 - 10/2022',
		fullDescription:
			'Spearheaded development of a toy exchange platform with advanced filtering (region, condition, availability). Oversaw a team of 5, reviewing PRs, offering feedback, and managing sprint priorities. Delivered full-stack features including item listings, user dashboards, and mobile-first UI.',
		liveLink: 'https://toy-treasures-frontend-rbrk.vercel.app/',
		type: 'Academic',
	},
	{
		title: 'Social Media App',
		description: 'Platform for creating posts, comments, and likes with real-time interactions.',
		tech: ['MERN Stack', 'TailwindCSS', 'DaisyUI'],
		highlights: ['Real-time features', 'User interactions', 'Following system'],
		date: '09/2022',
		fullDescription:
			'Developed a platform where users can create posts, comment, and like content. Planning future features including real-time notifications for interactions, implementing functionality for following other users and enabling chat.',
		type: 'Academic',
	},
	{
		title: 'SuppleMart',
		description: 'E-commerce platform for health supplements with full cart and checkout functionality.',
		tech: ['MEAN Stack', 'TailwindCSS', 'DaisyUI'],
		highlights: ['E-commerce platform', 'Team leadership', 'Reusable components'],
		date: '08/2022 - 09/2022',
		fullDescription:
			'Directed a 5-member team to build a responsive e-commerce platform for health supplements. Built key modules including authentication, authorization, and a fully functional product cart. Designed and implemented reusable components like the app navbar and checkout logic.',
		type: 'Academic',
	},
	{
		title: 'Examination Platform',
		description: 'Online exam platform with automated grading and real-time feedback.',
		tech: ['HTML', 'CSS', 'JavaScript'],
		highlights: ['Automated grading', 'Real-time feedback', 'Online testing'],
		date: '07/2022',
		fullDescription: 'Built an online exam platform with automated grading and real-time feedback for users.',
		type: 'Academic',
	},
	{
		title: 'OutfitMarket',
		description: 'Online marketplace with cart, Stripe checkout, and product filtering.',
		tech: ['MERN Stack', 'Styled Components', 'Stripe'],
		highlights: ['Stripe integration', 'JWT authentication', 'Product filtering'],
		date: '04/2022',
		fullDescription:
			'Built an online marketplace with cart, checkout using stripe, authentication using JWT, and product filtering features.',
		type: 'Academic',
	},
];

export const portfolioData = {
	name: 'Ahmed Emad El-Sayed',
	title: 'Full-Stack Engineer | Next.js, React & Node.js',
	email: 'ahmed.em.elsayed@gmail.com',
	phone: '+20 103 333 4086',
	location: 'Cairo, Egypt',

	about: `I'm a full-stack engineer specializing in Next.js, React, and Node.js. I currently build AI-powered web applications at RebusAI while delivering custom solutions for multiple freelance clients — spanning SaaS platforms, AI-driven tools, e-learning platforms, and automation systems. I'm passionate about creating elegant, performant user experiences and have taught web development to 100+ trainees.`,

	experience: [
		{
			role: 'Frontend Developer | Next.js',
			company: 'RebusAI',
			location: 'USA',
			period: '12/2025 - Present',
			description:
				'Develop AI-powered web applications using Next.js, Firebase, and modern frontend technologies. Build interactive learning platforms, authentication systems, payment integrations, and AI-driven features while working directly with clients to deliver scalable solutions.',
			highlights: ['AI-powered web apps', 'Authentication systems', 'Payment integrations', 'Client delivery'],
		},
		{
			role: 'Freelance Full-Stack Developer',
			company: 'Multiple Clients',
			location: 'Remote',
			period: '05/2025 - Present',
			description:
				'Build and maintain custom web applications for 3+ active clients using Next.js, React, TypeScript, Firebase, and Node.js. Working across 5+ projects including SaaS platforms, AI-powered tools, affiliate marketplaces, e-learning platforms, and automation systems.',
			highlights: ['SaaS & AI platforms', 'Dashboards & admin panels', 'Payment flows', 'Role-based access'],
		},
		{
			role: 'Frontend Developer | Next.js',
			company: 'V-Verse',
			location: 'Dubai, UAE',
			period: '11/2024 - 12/2025',
			description:
				'Developed and maintained core product modules including V-Webinars, Contracts, and V-College, while improving the existing codebase through refactoring, debugging, and scalable frontend architecture.',
			highlights: ['Next.js development', 'Performance optimization', 'State management', 'API integration'],
		},
		{
			role: 'Technical Instructor',
			company: 'Information Technology Institute (ITI)',
			location: 'Cairo, Egypt',
			period: '11/2024 - Present',
			description:
				'Delivered 50+ technical sessions and practical workshops for 100+ web development trainees, covering core MERN stack topics such as version control, JavaScript, React, Node.js, and MongoDB.',
			highlights: ['MERN Stack training', 'Version control', 'API integration', 'Database design'],
		},
		{
			role: 'Frontend Developer | React.js',
			company: 'Plan B',
			location: 'Cairo, Egypt',
			period: '12/2023 - 11/2024',
			description:
				'Contributed to building and maintaining responsive React.js applications, creating reusable components, integrating APIs, and resolving UI/UX and performance issues to ensure smooth user experiences.',
			highlights: ['Reusable components', 'API integration', 'UI/UX fixes', 'Performance tuning'],
		},
		{
			role: 'Backend Developer | Node.js',
			company: 'A M Soft',
			location: 'Cairo, Egypt',
			period: '02/2023 - 12/2023',
			description:
				'Developed and supported RESTful APIs using Node.js, implementing business logic, handling database operations, and assisting in debugging and performance improvements to maintain reliable backend services.',
			highlights: ['RESTful APIs', 'Business logic', 'Database operations', 'Performance improvements'],
		},
		{
			role: 'Software Instructor',
			company: 'ITech for applied technology school',
			location: 'Cairo, Egypt',
			period: '11/2022 - 02/2023',
			description:
				'Taught Java, OOP, SQL, and Computer Architecture courses to 90+ students, creating 20+ interactive lessons and coding activities. Achieved an 85% student satisfaction rate based on feedback.',
			highlights: ['Java programming', 'OOP principles', 'Database design', 'Interactive lessons'],
		},
	],

	projects,

	skills: {
		frontend: ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'Radix UI', 'Zustand', 'React Query', 'SWR'],
		backend: ['Node.js', 'Express.js', 'Nest.js', 'Firebase Admin', 'REST APIs'],
		database: ['MongoDB', 'Firebase', 'SQLite'],
		tools: ['Git', 'GitHub', 'ImageKit', 'Playwright', 'Vercel', 'Chrome Extension APIs', 'Bunny Stream'],
		features: ['Authentication', 'Payments', 'AI Integrations', 'Maps', 'Dashboards', 'Role-Based Access'],
		languages: ['JavaScript', 'TypeScript', 'Java', 'C', 'C++'],
	},

	education: [
		{
			school: 'Information Technology Institute (ITI)',
			program: 'MERN Stack & Modern Web Development',
			duration: '05/2022 - 11/2022',
			details:
				'600+ hours covering MongoDB, Express.js, React, Node.js, Nest.js, Next.js, Angular.js, UI/UX design, database management, RESTful APIs, and modern frontend UI tools like TailwindCSS and Bootstrap.',
		},
		{
			school: 'Shoubra Faculty of Engineering',
			degree: 'Bachelor of Communication and Electronics Engineering',
			duration: '09/2014 - 06/2019',
			details: 'Graduation Project: Sub-System in a Cub-Satellite made by NARSS',
		},
	],

	social: {
		github: 'https://github.com/AHmedEMadEG',
		linkedin: 'https://linkedin.com/in/ahmed-omda',
		email: 'ahmed.em.elsayed@gmail.com',
	},
};
