import { EmblaCarouselType } from 'embla-carousel';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

// Hook to manage the state and functions for previous and next buttons
export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
	}, [emblaApi]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

// Base button component with common styling
type ButtonProps = PropsWithChildren<
	React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

const EmblaButton: React.FC<ButtonProps> = ({ children, className, ...rest }) => (
	<button
		className={`flex cursor-pointer items-center justify-center rounded-full bg-slate-900 p-3 text-white shadow-lg transition-all hover:scale-110 hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none ${className}`}
		type="button"
		{...rest}
	>
		{children}
	</button>
);

// Specific PrevButton component
export const PrevButton: React.FC<ButtonProps> = (props) => (
	<EmblaButton {...props}>
		<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
		</svg>
	</EmblaButton>
);

// Specific NextButton component
export const NextButton: React.FC<ButtonProps> = (props) => (
	<EmblaButton {...props}>
		<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
		</svg>
	</EmblaButton>
);
