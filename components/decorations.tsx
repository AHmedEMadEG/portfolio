/**
 * Lightweight, CSS-only background decorations shared across sections so the
 * whole page reads as one visual system. No WebGL — keeps non-hero sections cheap.
 */

/** Animated, radially-masked tech grid. */
export function GridBackdrop({ className = '' }: { className?: string }) {
	return <div aria-hidden className={`tech-grid pointer-events-none absolute inset-0 ${className}`} />;
}

/** Two slowly drifting blurred color blobs for ambient depth. */
export function GlowField({
	className = '',
	colorA = 'bg-cyan-500/10',
	colorB = 'bg-blue-500/10',
}: {
	className?: string;
	colorA?: string;
	colorB?: string;
}) {
	return (
		<div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
			<div className={`animate-float-slow absolute -top-24 left-[15%] h-72 w-72 rounded-full ${colorA} blur-3xl`} />
			<div className={`animate-float-medium absolute -bottom-24 right-[15%] h-80 w-80 rounded-full ${colorB} blur-3xl`} />
		</div>
	);
}
