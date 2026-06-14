'use client';

import { type Project } from '@/lib/portfolio-data';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ExternalLink } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';

type PropType = {
	projects: Project[];
	options?: EmblaOptionsType;
};

const TWEEN_FACTOR_BASE = 0.46;
const AUTOPLAY_DELAY = 4800;
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const EmblaCarousel = ({ projects, options }: PropType) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options);
	const tweenNodesRef = useRef<HTMLElement[]>([]);
	const tweenFactorRef = useRef(0);
	const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

	// --- Autoplay -------------------------------------------------------------------------------
	// One interval that ALWAYS runs and is only ever RESTARTED on interaction — never stopped — so it
	// can't get stuck "paused". Restarting on each manual move also pushes the next auto-advance a
	// full delay away, so it can never collide with a click (the cause of the skipped slides).
	const resetAutoplay = useCallback(() => {
		if (autoplayRef.current) clearInterval(autoplayRef.current);
		autoplayRef.current = null;
		if (!emblaApi) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		autoplayRef.current = setInterval(() => {
			if (document.visibilityState === 'visible') emblaApi.scrollNext();
		}, AUTOPLAY_DELAY);
	}, [emblaApi]);

	const handlePrev = useCallback(() => {
		onPrevButtonClick();
		resetAutoplay();
	}, [onPrevButtonClick, resetAutoplay]);

	const handleNext = useCallback(() => {
		onNextButtonClick();
		resetAutoplay();
	}, [onNextButtonClick, resetAutoplay]);

	const handleDot = useCallback(
		(index: number) => {
			onDotButtonClick(index);
			resetAutoplay();
		},
		[onDotButtonClick, resetAutoplay]
	);

	const setTweenNodes = useCallback((api: EmblaCarouselType) => {
		tweenNodesRef.current = api.slideNodes().map((node) => node.querySelector('.embla-tween') as HTMLElement);
	}, []);

	const setTweenFactor = useCallback((api: EmblaCarouselType) => {
		tweenFactorRef.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
	}, []);

	// Coverflow: scale / fade / rotateY each slide based on its distance from the center.
	const tween = useCallback((api: EmblaCarouselType, eventName?: string) => {
		const engine = api.internalEngine();
		const scrollProgress = api.scrollProgress();
		const slidesInView = api.slidesInView();
		const isScroll = eventName === 'scroll';

		api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
			let diffToTarget = scrollSnap - scrollProgress;
			const slidesInSnap = engine.slideRegistry[snapIndex];

			slidesInSnap.forEach((slideIndex) => {
				if (isScroll && !slidesInView.includes(slideIndex)) return;

				if (engine.options.loop) {
					engine.slideLooper.loopPoints.forEach((loopItem) => {
						const target = loopItem.target();
						if (slideIndex === loopItem.index && target !== 0) {
							const sign = Math.sign(target);
							if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
							if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
						}
					});
				}

				const tweenValue = Math.abs(diffToTarget * tweenFactorRef.current);
				const scale = clamp(1 - tweenValue * 0.32, 0.8, 1);
				const opacity = clamp(1 - tweenValue * 0.95, 0.2, 1);
				const rotateY = clamp(diffToTarget * tweenFactorRef.current * 26, -42, 42);

				const node = tweenNodesRef.current[slideIndex];
				if (node) {
					node.style.transform = `scale(${scale.toFixed(3)}) rotateY(${rotateY.toFixed(2)}deg)`;
					node.style.opacity = opacity.toFixed(3);
					node.style.zIndex = String(Math.round((1 - clamp(tweenValue, 0, 1)) * 10));
				}
			});
		});
	}, []);

	useEffect(() => {
		if (!emblaApi) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		setTweenNodes(emblaApi);
		setTweenFactor(emblaApi);
		if (!reduced) tween(emblaApi);

		const onScroll = () => {
			if (!reduced) tween(emblaApi, 'scroll');
		};
		const onReInit = (api: EmblaCarouselType) => {
			setTweenNodes(api);
			setTweenFactor(api);
			if (!reduced) tween(api);
		};

		emblaApi.on('reInit', onReInit).on('scroll', onScroll).on('slideFocus', onScroll);
		return () => {
			emblaApi.off('reInit', onReInit).off('scroll', onScroll).off('slideFocus', onScroll);
		};
	}, [emblaApi, setTweenNodes, setTweenFactor, tween]);

	useEffect(() => {
		if (!emblaApi) return;
		resetAutoplay(); // start
		emblaApi.on('pointerDown', resetAutoplay); // restart the countdown when a drag begins
		return () => {
			if (autoplayRef.current) clearInterval(autoplayRef.current);
			autoplayRef.current = null;
			emblaApi.off('pointerDown', resetAutoplay);
		};
	}, [emblaApi, resetAutoplay]);

	return (
		<div className="embla">
			<div className="overflow-hidden py-4" ref={emblaRef}>
				<div className="flex perspective-[1600px]">
					{projects.map((project, index) => {
						const typeStyles =
							project.type === 'Professional'
								? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
								: 'border-violet-500/40 bg-violet-500/10 text-violet-300';

						return (
							<div
								className="min-w-0 flex-[0_0_82%] px-3 transform-3d sm:flex-[0_0_56%] lg:flex-[0_0_40%]"
								key={project.title}
							>
								<div className="embla-tween h-full transform-3d backface-hidden will-change-transform">
									<article className="group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-800/50 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-cyan-500/70">
										{/* top accent + hover glow */}
										<span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/70 to-transparent" />
										<div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(500px_circle_at_50%_-10%,rgba(34,211,238,0.1),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

										<div className="relative">
											<div className="mb-3 flex items-start justify-between gap-3">
												<span
													className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${typeStyles}`}
												>
													{project.type}
												</span>
												<span className="shrink-0 text-xs text-slate-400">{project.date}</span>
											</div>
											<h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
												{project.title}
											</h3>
											<p className="mb-4 text-sm leading-relaxed text-slate-300/90">{project.fullDescription}</p>

											<p className="mb-2 text-[11px] font-medium tracking-wider text-slate-500 uppercase">Highlights</p>
											<ul className="space-y-1.5">
												{project.highlights.map((highlight) => (
													<li key={highlight} className="flex gap-2 text-xs text-slate-300">
														<span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
														{highlight}
													</li>
												))}
											</ul>
										</div>

										<div className="relative mt-auto space-y-4 pt-5">
											<div className="flex flex-wrap gap-1.5">
												{project.tech.map((tech) => (
													<span
														key={tech}
														className="rounded-md border border-slate-700 bg-slate-900/60 px-2 py-1 text-[11px] text-slate-300 transition-colors group-hover:border-slate-600"
													>
														{tech}
													</span>
												))}
											</div>
											{project.liveLink && (
												<a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-block">
													<button className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-[0_6px_20px_-6px_rgba(34,211,238,0.7)]">
														Live demo
														<ExternalLink className="h-3.5 w-3.5" />
													</button>
												</a>
											)}
										</div>

										{/* faded index watermark */}
										<span className="pointer-events-none absolute right-4 bottom-3 font-mono text-5xl font-bold text-white/3 select-none">
											{String(index + 1).padStart(2, '0')}
										</span>
									</article>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Controls */}
			<div className="mt-10">
				<div className="mx-auto h-0.5 w-full max-w-md overflow-hidden rounded-full bg-slate-700/60">
					<div
						className="h-full rounded-full bg-linear-to-r from-cyan-400 to-blue-500 transition-[width] duration-500 ease-out"
						style={{ width: `${((selectedIndex + 1) / projects.length) * 100}%` }}
					/>
				</div>

				<div className="mt-6 flex items-center justify-between gap-4">
					<span className="font-mono text-sm tracking-wider text-slate-400">
						<span className="text-cyan-400">{String(selectedIndex + 1).padStart(2, '0')}</span>
						<span className="mx-1 text-slate-600">/</span>
						{String(projects.length).padStart(2, '0')}
					</span>

					<div className="hidden items-center gap-2 sm:flex">
						{scrollSnaps.map((_, index) => (
							<DotButton
								key={index}
								onClick={() => handleDot(index)}
								className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
									index === selectedIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-600 hover:bg-slate-500'
								}`}
							/>
						))}
					</div>

					<div className="flex gap-2">
						<PrevButton onClick={handlePrev} disabled={prevBtnDisabled} className="border border-slate-700/60" />
						<NextButton onClick={handleNext} disabled={nextBtnDisabled} className="border border-slate-700/60" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
