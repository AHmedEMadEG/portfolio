export const portfolioData = {
	name: 'Ahmed Emad El-Sayed',
	title: 'Fullstack Developer | MERN Stack',
	email: 'ahmed.em.elsayed@gmail.com',
	phone: '+20 103 333 4086',
	location: 'Cairo, Egypt',

	about: `I'm a fullstack developer with expertise in the MERN stack and modern web technologies. 
  Currently working at V-Verse as a Frontend Developer, building complex web applications with Next.js. 
  I'm passionate about creating elegant, performant user experiences and have experience teaching web development to 100+ students.`,

	experience: [
		{
			role: 'Frontend Developer | Next.js',
			company: 'V-Verse',
			location: 'Dubai, UAE',
			period: '11/2024 - present',
			description:
				'Developed and launched full-featured sections including V-Webinars, contracts management, and V-College. Implemented complex frontend logic and performance optimizations.',
			highlights: ['Next.js development', 'Performance optimization', 'State management', 'API integration'],
		},
		{
			role: 'Technical Instructor',
			company: 'Information Technology Institute (ITI)',
			location: 'Cairo, Egypt',
			period: '11/2024 - present',
			description: 'Delivered 50+ technical sessions covering MERN stack topics to 100+ trainees.',
			highlights: ['MERN Stack training', 'Version control', 'API integration', 'Database design'],
		},
		{
			role: 'Software Instructor',
			company: 'ITech for applied technology school',
			location: 'Cairo, Egypt',
			period: '10/2022 - 02/2023',
			description: 'Taught Java, OOP, SQL, and Computer Architecture to 90+ students with 85% satisfaction rate.',
			highlights: ['Java programming', 'OOP principles', 'Database design', 'Interactive lessons'],
		},
	],

	projects: [
		{
			title: 'CVRM Platform',
			description:
				'Multi-tenant CRM system with role-based dashboards, real-time notifications, and contract lifecycle management.',
			tech: ['React.js', 'TailwindCSS', 'SWR', 'Laravel'],
			highlights: ['Multi-tenant architecture', 'Real-time notifications', 'Activity timeline'],
			date: '10/2025 - Present',
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
			date: '10/2024 - 11/2024',
			fullDescription:
				'Led a team of 7 to launch a platform for ITI alumni engagement, now used by over 1,000 active users. Designed and implemented admin dashboards and user registration management tools. Reviewed GitHub pull requests and enforced best practices for scalable code.',
		},
		{
			title: 'ToyzCity',
			description: 'Toy exchange platform with advanced filtering and user dashboards.',
			tech: ['MERN Stack', 'TailwindCSS', 'DaisyUI'],
			highlights: ['Advanced filtering', 'Team leadership', 'Mobile-first UI'],
			date: '09/2024 - 10/2024',
			fullDescription:
				'Spearheaded development of a toy exchange platform with advanced filtering (region, condition, availability). Oversaw a team of 5, reviewing PRs, offering feedback, and managing sprint priorities. Delivered full-stack features including item listings, user dashboards, and mobile-first UI.',
		},
		{
			title: 'Social Media App',
			description: 'Platform for creating posts, comments, and likes with real-time interactions.',
			tech: ['MERN Stack', 'TailwindCSS', 'DaisyUI'],
			highlights: ['Real-time features', 'User interactions', 'Following system'],
			date: '09/2024 - Present',
			fullDescription:
				'Developing a platform where users can create posts, comment, and like content. Planning future features including real-time notifications for interactions, implementing functionality for following other users and enabling chat.',
		},
		{
			title: 'SuppleMart',
			description: 'E-commerce platform for health supplements with full cart and checkout functionality.',
			tech: ['MEAN Stack', 'TailwindCSS', 'DaisyUI'],
			highlights: ['E-commerce platform', 'Team leadership', 'Reusable components'],
			date: '08/2024 - 09/2024',
			fullDescription:
				'Directed a 5-member team to build a responsive e-commerce platform for health supplements. Built key modules including authentication, authorization, and a fully functional product cart. Designed and implemented reusable components like the app navbar and checkout logic.',
		},
		{
			title: 'Examination Platform',
			description: 'Online exam platform with automated grading and real-time feedback.',
			tech: ['HTML', 'CSS', 'JavaScript'],
			highlights: ['Automated grading', 'Real-time feedback', 'Online testing'],
			date: '07/2024',
			fullDescription: 'Built an online exam platform with automated grading and real-time feedback for users.',
		},
		{
			title: 'OutfitMarket',
			description: 'Online marketplace with cart, Stripe checkout, and product filtering.',
			tech: ['MERN Stack', 'Styled Components', 'Stripe'],
			highlights: ['Stripe integration', 'JWT authentication', 'Product filtering'],
			date: '07/2024',
			fullDescription:
				'Built an online marketplace with cart, checkout using stripe, authentication using JWT, and product filtering features.',
		},
	],

	skills: {
		frontend: [
			'React.js',
			'Next.js',
			'Angular',
			'Bootstrap',
			'jQuery',
			'Material UI',
			'TailwindCSS',
			'Shadcn',
			'Radix UI',
		],
		backend: ['Node.js', 'Express.js', 'Nest.js'],
		database: ['MongoDB', 'MySQL', 'SQLite'],
		languages: ['JavaScript', 'TypeScript', 'Java', 'Assembly', 'C', 'C++'],
		tools: ['Git', 'GitHub', 'REST APIs', 'UI/UX design'],
	},

	education: [
		{
			school: 'Information Technology Institute (ITI)',
			program: 'MERN Stack & Modern Web Development',
			duration: '05/2024 - 11/2024',
			details: '600+ hours covering MongoDB, Express, React, Node, Nest, Next, Angular, UI/UX, TailwindCSS, Bootstrap',
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
