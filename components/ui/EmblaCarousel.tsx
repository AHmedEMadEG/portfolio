import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';

type Project = {
	title: string;
	description: string;
	tech: string[];
	highlights: string[];
	date: string;
	fullDescription: string;
};

type PropType = {
	projects: Project[];
	options?: EmblaOptionsType;
};

const EmblaCarousel = (props: PropType) => {
	const { projects, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

	return (
		<div className="overflow-hidden">
			{/* embla container */}
			<div className="overflow-hidden" ref={emblaRef}>
				{/* embla__viewport */}
				<div className="-ml-4 flex">
					{/* embla__container - negative margin for gap */}
					{projects.map((project) => (
						<div className="w-full min-w-0 flex-none pl-4 sm:w-1/2 lg:w-1/3" key={project.title}>
							{/* embla__slide - adjust width as needed */}
							<div
								className={`flex h-full w-full flex-col justify-between rounded-xl border border-slate-700 bg-slate-800 p-6 transition-colors hover:border-cyan-500`}
							>
								<div>
									<div className="mb-4 flex items-start justify-between">
										<h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">{project.title}</h3>
										<span className="text-xs text-slate-400">{project.date}</span>
									</div>

									<p className="mb-4 text-sm text-slate-300">{project.fullDescription}</p>

									<div className="mb-4">
										<p className="mb-2 text-xs text-slate-400">Highlights:</p>
										<ul className="space-y-1">
											{project.highlights.map((highlight) => (
												<li key={highlight} className="text-xs text-cyan-400">
													• {highlight}
												</li>
											))}
										</ul>
									</div>
								</div>
								<div className="flex flex-wrap gap-2 pt-4">
									{project.tech.map((tech) => (
										<span key={tech} className="rounded bg-slate-700 px-2 py-1 text-xs text-slate-300">
											{tech}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="mt-8 flex items-center justify-between">
				<div className="flex justify-between gap-2 px-5">
					{/* embla__controls for arrows */}
					<PrevButton
						onClick={onPrevButtonClick}
						disabled={prevBtnDisabled}
						className="rounded-full bg-slate-800 p-3 text-white opacity-30 transition-all hover:bg-cyan-600 hover:opacity-100"
					/>
					<NextButton
						onClick={onNextButtonClick}
						disabled={nextBtnDisabled}
						className="rounded-full bg-slate-800 p-3 text-white opacity-30 transition-all hover:bg-cyan-600 hover:opacity-100"
					/>
				</div>
				<div className="flex justify-center gap-2">
					{/* embla__dots */}
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={`h-3 w-3 cursor-pointer rounded-full transition-all ${
								index === selectedIndex ? 'scale-125 bg-cyan-500' : 'bg-slate-600 hover:bg-slate-500'
							}`}
						/>
					))}
				</div>
			</div>
			{/* Project Counter */}
			<div className="mt-4 text-center">
				<span className="text-sm text-slate-400">
					{selectedIndex + 1} / {projects.length}
				</span>
			</div>
		</div>
	);
};

export default EmblaCarousel;
