'use client';

import { useRef, type ReactNode } from 'react';

/**
 * Wraps content in a subtle 3D tilt that follows the cursor. Mouse-only (skips
 * touch/pen) and disabled under prefers-reduced-motion. Mutates the element's
 * transform directly to avoid re-renders.
 */
export function TiltCard({ children, className = '', max = 7 }: { children: ReactNode; className?: string; max?: number }) {
	const ref = useRef<HTMLDivElement>(null);

	const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
		const el = ref.current;
		if (!el || e.pointerType !== 'mouse') return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const r = el.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width;
		const py = (e.clientY - r.top) / r.height;
		const rx = (0.5 - py) * max * 2;
		const ry = (px - 0.5) * max * 2;
		el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
	};

	const reset = () => {
		const el = ref.current;
		if (el) el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
	};

	return (
		<div
			ref={ref}
			onPointerMove={onMove}
			onPointerLeave={reset}
			className={`transition-transform duration-300 ease-out transform-3d ${className}`}
		>
			{children}
		</div>
	);
}
