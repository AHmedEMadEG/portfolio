'use client';

import { useEffect, useRef } from 'react';

/**
 * A full-section drifting particle field rendered in vanilla Three.js. Sits as an
 * ambient background layer behind the entire hero (text included), with dots
 * slowly flowing upward and a subtle cursor parallax. Three.js is dynamically
 * imported so it never blocks first paint, the loop pauses when offscreen, and
 * the whole scene is disposed on unmount. Respects prefers-reduced-motion.
 */
export function HeroParticles() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let renderer: import('three').WebGLRenderer | undefined;
		let frameId = 0;
		let disposed = false;
		const cleanups: Array<() => void> = [];

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		void (async () => {
			const THREE = await import('three');
			if (disposed) return;

			const width = container.clientWidth || window.innerWidth;
			const height = container.clientHeight || window.innerHeight;

			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(width, height);
			const canvas = renderer.domElement;
			canvas.style.width = '100%';
			canvas.style.height = '100%';
			canvas.style.display = 'block';
			container.appendChild(canvas);

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
			camera.position.set(0, 0, 7);

			// --- Particle field spread across the whole section ---
			const SPREAD_X = 9;
			const SPREAD_Y = 6;
			const Z_NEAR = 1;
			const Z_FAR = -3;
			const particleCount = 420;

			const positions = new Float32Array(particleCount * 3);
			const velocities = new Float32Array(particleCount); // upward drift speed per particle
			for (let i = 0; i < particleCount; i++) {
				positions[i * 3] = (Math.random() * 2 - 1) * SPREAD_X;
				positions[i * 3 + 1] = (Math.random() * 2 - 1) * SPREAD_Y;
				positions[i * 3 + 2] = Z_FAR + Math.random() * (Z_NEAR - Z_FAR);
				velocities[i] = 0.0006 + Math.random() * 0.0016;
			}
			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

			const makeCircleTexture = () => {
				const size = 64;
				const c = document.createElement('canvas');
				c.width = c.height = size;
				const ctx = c.getContext('2d')!;
				const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
				g.addColorStop(0, 'rgba(255,255,255,1)');
				g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
				g.addColorStop(1, 'rgba(255,255,255,0)');
				ctx.fillStyle = g;
				ctx.fillRect(0, 0, size, size);
				const tex = new THREE.Texture(c);
				tex.needsUpdate = true;
				return tex;
			};
			const sprite = makeCircleTexture();
			const material = new THREE.PointsMaterial({
				size: 0.05,
				map: sprite,
				color: new THREE.Color('#67e8f9'),
				transparent: true,
				opacity: 0.85,
				blending: THREE.AdditiveBlending,
				depthWrite: false,
				sizeAttenuation: true,
			});
			const points = new THREE.Points(geometry, material);
			scene.add(points);

			const onResize = () => {
				const w = container.clientWidth || window.innerWidth;
				const h = container.clientHeight || window.innerHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer!.setSize(w, h);
			};
			window.addEventListener('resize', onResize);
			cleanups.push(() => window.removeEventListener('resize', onResize));

			// --- Cursor parallax (tracked on window so the hero content stays clickable) ---
			const pointer = { tx: 0, ty: 0, x: 0, y: 0 };
			const onPointerMove = (e: PointerEvent) => {
				pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
				pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
			};
			if (!prefersReducedMotion) {
				window.addEventListener('pointermove', onPointerMove, { passive: true });
				cleanups.push(() => window.removeEventListener('pointermove', onPointerMove));
			}

			let visible = true;
			const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
			io.observe(container);
			cleanups.push(() => io.disconnect());

			const posAttr = geometry.getAttribute('position') as import('three').BufferAttribute;
			const arr = posAttr.array as Float32Array;
			const clock = new THREE.Clock();

			const renderFrame = () => {
				const dt = Math.min(clock.getDelta(), 0.033) * 60; // normalize toward ~60fps steps
				for (let i = 0; i < particleCount; i++) {
					let y = arr[i * 3 + 1] + velocities[i] * dt;
					if (y > SPREAD_Y) {
						y = -SPREAD_Y;
						arr[i * 3] = (Math.random() * 2 - 1) * SPREAD_X; // re-scatter on wrap
					}
					arr[i * 3 + 1] = y;
				}
				posAttr.needsUpdate = true;

				pointer.x += (pointer.tx - pointer.x) * 0.05;
				pointer.y += (pointer.ty - pointer.y) * 0.05;
				camera.position.x = pointer.x * 0.5;
				camera.position.y = -pointer.y * 0.4;
				camera.lookAt(0, 0, 0);
				renderer!.render(scene, camera);
			};

			if (prefersReducedMotion) {
				renderer.render(scene, camera);
			} else {
				const animate = () => {
					frameId = requestAnimationFrame(animate);
					if (visible) renderFrame();
				};
				animate();
			}

			cleanups.push(() => {
				cancelAnimationFrame(frameId);
				geometry.dispose();
				material.dispose();
				sprite.dispose();
				renderer!.dispose();
				canvas.parentNode?.removeChild(canvas);
			});
		})();

		return () => {
			disposed = true;
			cleanups.forEach((fn) => fn());
		};
	}, []);

	return <div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />;
}
