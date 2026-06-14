'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Variant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

const hiddenState: Record<Variant, string> = {
	up: 'translate-y-8 opacity-0',
	down: '-translate-y-8 opacity-0',
	left: 'translate-x-8 opacity-0',
	right: '-translate-x-8 opacity-0',
	scale: 'scale-95 opacity-0',
	fade: 'opacity-0',
};

/**
 * Reveals its children with a fade/slide/scale transition the first time they
 * scroll into view. Pure IntersectionObserver + CSS — no animation library.
 * Respects prefers-reduced-motion (shows instantly). Stagger lists by passing
 * an increasing `delay`.
 */
export function Reveal({
	children,
	variant = 'up',
	delay = 0,
	className = '',
	once = true,
}: {
	children: ReactNode;
	variant?: Variant;
	delay?: number;
	className?: string;
	once?: boolean;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setVisible(true);
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisible(true);
						if (once) io.unobserve(entry.target);
					} else if (!once) {
						setVisible(false);
					}
				});
			},
			{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
		);
		io.observe(el);
		return () => io.disconnect();
	}, [once]);

	return (
		<div
			ref={ref}
			style={{ transitionDelay: `${delay}ms` }}
			className={`transition-all duration-700 ease-out will-change-transform ${
				visible ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : hiddenState[variant]
			} ${className}`}
		>
			{children}
		</div>
	);
}
