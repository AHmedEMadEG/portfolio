'use client';

import { useEffect, useRef } from 'react';

/**
 * A morphing, glowing wireframe orb with a drifting particle field, rendered in
 * vanilla Three.js. Sits behind the hero text, slowly spins on its own, and
 * parallaxes toward the cursor. Three.js is dynamically imported so it never
 * blocks the initial paint, and the whole scene is torn down on unmount.
 */
export function HeroCanvas() {
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

			// --- GLSL: Ashima/Gustavson 3D simplex noise (public domain) ---
			const noiseGLSL = /* glsl */ `
				vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
				vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
				vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
				vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
				float snoise(vec3 v){
					const vec2 C=vec2(1.0/6.0,1.0/3.0);
					const vec4 D=vec4(0.0,0.5,1.0,2.0);
					vec3 i=floor(v+dot(v,C.yyy));
					vec3 x0=v-i+dot(i,C.xxx);
					vec3 g=step(x0.yzx,x0.xyz);
					vec3 l=1.0-g;
					vec3 i1=min(g.xyz,l.zxy);
					vec3 i2=max(g.xyz,l.zxy);
					vec3 x1=x0-i1+C.xxx;
					vec3 x2=x0-i2+C.yyy;
					vec3 x3=x0-D.yyy;
					i=mod289(i);
					vec4 p=permute(permute(permute(
						i.z+vec4(0.0,i1.z,i2.z,1.0))
						+i.y+vec4(0.0,i1.y,i2.y,1.0))
						+i.x+vec4(0.0,i1.x,i2.x,1.0));
					float n_=0.142857142857;
					vec3 ns=n_*D.wyz-D.xzx;
					vec4 j=p-49.0*floor(p*ns.z*ns.z);
					vec4 x_=floor(j*ns.z);
					vec4 y_=floor(j-7.0*x_);
					vec4 x=x_*ns.x+ns.yyyy;
					vec4 y=y_*ns.x+ns.yyyy;
					vec4 h=1.0-abs(x)-abs(y);
					vec4 b0=vec4(x.xy,y.xy);
					vec4 b1=vec4(x.zw,y.zw);
					vec4 s0=floor(b0)*2.0+1.0;
					vec4 s1=floor(b1)*2.0+1.0;
					vec4 sh=-step(h,vec4(0.0));
					vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
					vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
					vec3 p0=vec3(a0.xy,h.x);
					vec3 p1=vec3(a0.zw,h.y);
					vec3 p2=vec3(a1.xy,h.z);
					vec3 p3=vec3(a1.zw,h.w);
					vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
					p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
					vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
					m=m*m;
					return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
				}
			`;

			const vertexShader = /* glsl */ `
				uniform float uTime;
				uniform float uDistort;
				uniform float uFrequency;
				varying float vDistort;
				varying vec3 vNormal;
				varying vec3 vViewPosition;
				${noiseGLSL}
				void main() {
					float n = snoise(position * uFrequency + vec3(0.0, 0.0, uTime * 0.28));
					n += 0.5 * snoise(position * uFrequency * 2.1 + vec3(uTime * 0.18));
					vDistort = n;
					vec3 displaced = position + normal * n * uDistort;
					vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
					vViewPosition = -mvPosition.xyz;
					vNormal = normalize(normalMatrix * normal);
					gl_Position = projectionMatrix * mvPosition;
				}
			`;

			const fillFragment = /* glsl */ `
				uniform vec3 uBase;
				uniform vec3 uGlow;
				varying float vDistort;
				varying vec3 vNormal;
				varying vec3 vViewPosition;
				void main() {
					float fresnel = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vViewPosition)), 0.0, 1.0), 2.2);
					vec3 color = mix(uBase, uGlow, fresnel);
					color += uGlow * smoothstep(0.15, 0.9, vDistort) * 0.35;
					gl_FragColor = vec4(color, 1.0);
				}
			`;

			const wireFragment = /* glsl */ `
				uniform vec3 uGlow;
				varying float vDistort;
				void main() {
					float intensity = smoothstep(-0.4, 1.0, vDistort);
					gl_FragColor = vec4(uGlow, 0.18 + intensity * 0.5);
				}
			`;

			// --- Renderer / scene / camera ---
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
			const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
			camera.position.set(0, 0, 4.4);

			const uniforms = {
				uTime: { value: 0 },
				uDistort: { value: 0.42 },
				uFrequency: { value: 1.15 },
				uBase: { value: new THREE.Color('#0a2230') },
				uGlow: { value: new THREE.Color('#22d3ee') },
			};

			// --- Orb: solid fresnel core + additive wireframe shell ---
			const group = new THREE.Group();
			scene.add(group);

			const orbGeometry = new THREE.IcosahedronGeometry(1, 24);

			const fillMaterial = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader: fillFragment });
			group.add(new THREE.Mesh(orbGeometry, fillMaterial));

			const wireMaterial = new THREE.ShaderMaterial({
				uniforms,
				vertexShader,
				fragmentShader: wireFragment,
				wireframe: true,
				transparent: true,
				blending: THREE.AdditiveBlending,
				depthWrite: false,
			});
			const wireMesh = new THREE.Mesh(orbGeometry, wireMaterial);
			wireMesh.scale.setScalar(1.03);
			group.add(wireMesh);

			// --- Responsive sizing ---
			const applyScale = () => {
				// Fit the orb (including its noise peaks) inside the panel with margin so the curves never clip.
				const w = container.clientWidth || window.innerWidth;
				const h = container.clientHeight || window.innerHeight;
				const halfH = camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
				const halfW = halfH * (w / h);
				const maxOrbRadius = 1.7; // unit sphere + max displacement + wireframe shell
				const s = (Math.min(halfH, halfW) * 0.86) / maxOrbRadius;
				group.scale.setScalar(s);
			};
			applyScale();

			const onResize = () => {
				const w = container.clientWidth || window.innerWidth;
				const h = container.clientHeight || window.innerHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer!.setSize(w, h);
				applyScale();
			};
			window.addEventListener('resize', onResize);
			cleanups.push(() => window.removeEventListener('resize', onResize));

			// --- Cursor parallax (tracked on window so the hero buttons stay clickable) ---
			const pointer = { tx: 0, ty: 0, x: 0, y: 0 };
			const onPointerMove = (e: PointerEvent) => {
				pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
				pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
			};
			if (!prefersReducedMotion) {
				window.addEventListener('pointermove', onPointerMove, { passive: true });
				cleanups.push(() => window.removeEventListener('pointermove', onPointerMove));
			}

			// --- Pause when the hero scrolls out of view ---
			let visible = true;
			const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
			io.observe(container);
			cleanups.push(() => io.disconnect());

			const clock = new THREE.Clock();
			const renderFrame = () => {
				uniforms.uTime.value = clock.getElapsedTime();
				group.rotation.y += 0.0016;
				pointer.x += (pointer.tx - pointer.x) * 0.05;
				pointer.y += (pointer.ty - pointer.y) * 0.05;
				camera.position.x = pointer.x * 0.4;
				camera.position.y = -pointer.y * 0.3;
				camera.lookAt(0, 0, 0);
				renderer!.render(scene, camera);
			};

			if (prefersReducedMotion) {
				uniforms.uTime.value = 1.6;
				renderFrame();
			} else {
				const animate = () => {
					frameId = requestAnimationFrame(animate);
					if (visible) renderFrame();
				};
				animate();
			}

			cleanups.push(() => {
				cancelAnimationFrame(frameId);
				orbGeometry.dispose();
				fillMaterial.dispose();
				wireMaterial.dispose();
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
