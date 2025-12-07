'use client';

import React from 'react';
import { useGSAP, gsap } from '../../lib/gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';

type BeautyCard = {
	title: string;
	image?: string;
	text?: string;
};

const beautyCards: BeautyCard[] = [
	{
		title: 'Masaža',
		text: 'Dubinski relaksirajuća masaža koja potiče cirkulaciju i opušta napete mišiće.',
	},
	{
		title: 'Maderoterapija',
		text: 'Terapija drvenim valjcima koja potiče limfu i oblikuje tijelo na potpuno prirodan način.',
	},
	{
		title: 'Linfomodeling',
		image: '/images/linfomodeling.png',
		text: 'Specijalizirana tehnika za olakšanje oteklina i ubrzano izbacivanje toksina.',
	},
	{
		title: 'Hydrafacial',
		text: 'Višefazni tretman lica koji kombinira čišćenje, eksfolijaciju i dubinsku hidrataciju.',
	},
	{
		title: 'Tesla',
		image: '/images/tesla.png',
		text: 'Elektromagnetska stimulacija koja jača mišiće i oblikuje tijelo bez oporavka.',
	},
	{
		title: 'RF tretman',
		text: 'Radiofrekvencijska tehnologija za poticanje kolagena i glađu teksturu kože.',
	},
	{
		title: 'Makeup',
		text: 'Profesionalno šminkanje prilagođeno dnevnim i posebnim prigodama.',
	},
	{
		title: 'Nokti',
		text: 'Elegantne manikure i pedikure s dugotrajnim gel ili klasičnim lakovima.',
	},
];

const cardWidth = 'min-w-[clamp(140px,25vw,268px)]';

const BeautyCornerComponent: React.FC = () => {
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const trackRef = React.useRef<HTMLDivElement>(null);
	const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
	const [activeIndex, setActiveIndex] = React.useState(0);
	const isAnimatingRef = React.useRef(false);
	const [isAutoplayEnabled, setIsAutoplayEnabled] = React.useState(true);
	const [isPaused, setIsPaused] = React.useState(false);
	const autoplayTimerRef = React.useRef<NodeJS.Timeout | null>(null);

	const registerCard = React.useCallback(
		(index: number) => (element: HTMLDivElement | null) => {
			cardRefs.current[index] = element;
		},
		[]
	);

	// Compute step size (width + gap of first card)
	const getStepSize = React.useCallback(() => {
		const track = trackRef.current;
		if (!track || !track.children.length) return 0;
		const first = track.children[0] as HTMLElement;
		const styles = getComputedStyle(track);
		const gap = parseFloat(styles.columnGap || styles.gap || '12');
		return first.offsetWidth + gap;
	}, []);

	// Clear autoplay timer
	const clearAutoplayTimer = React.useCallback(() => {
		if (autoplayTimerRef.current) {
			clearTimeout(autoplayTimerRef.current);
			autoplayTimerRef.current = null;
		}
	}, []);

	// Autoplay advance function using ref to avoid circular dependency
	const autoAdvanceRef = React.useRef<() => void>(() => {});

	const scheduleNext = React.useCallback(() => {
		if (isAutoplayEnabled && !isPaused && autoAdvanceRef.current) {
			autoplayTimerRef.current = setTimeout(autoAdvanceRef.current, 4000);
		}
	}, [isAutoplayEnabled, isPaused]);

	const autoAdvance = React.useCallback(() => {
		if (isAnimatingRef.current) return;
		const track = trackRef.current;
		if (!track) return;
		const step = getStepSize();
		if (!step) return;
		const first = track.children[0] as HTMLElement;
		isAnimatingRef.current = true;

		gsap.to(track, {
			x: -step,
			duration: 0.75,
			ease: 'power2',
			onComplete: () => {
				track.appendChild(first);
				gsap.set(track, { x: 0 });
				setActiveIndex((i) => (i + 1) % beautyCards.length);
				isAnimatingRef.current = false;
				scheduleNext();
			},
		});
	}, [getStepSize, scheduleNext]);

	// Update ref when function changes
	React.useEffect(() => {
		autoAdvanceRef.current = autoAdvance;
	}, [autoAdvance]); // Start autoplay timer
	const startAutoplayTimer = React.useCallback(() => {
		if (!isAutoplayEnabled || isPaused) return;
		clearAutoplayTimer();
		autoplayTimerRef.current = setTimeout(autoAdvance, 4000);
	}, [isAutoplayEnabled, isPaused, clearAutoplayTimer, autoAdvance]);

	const goNext = React.useCallback(
		(fromUser = false) => {
			if (isAnimatingRef.current) return;
			const track = trackRef.current;
			if (!track) return;
			const step = getStepSize();
			if (!step) return;
			const first = track.children[0] as HTMLElement;
			isAnimatingRef.current = true;

			// Reset autoplay timer if user initiated
			if (fromUser) {
				clearAutoplayTimer();
			}

			gsap.to(track, {
				x: -step,
				duration: 0.75,
				ease: 'power2',
				onComplete: () => {
					track.appendChild(first);
					gsap.set(track, { x: 0 });
					setActiveIndex((i) => (i + 1) % beautyCards.length);
					isAnimatingRef.current = false;

					// Restart autoplay timer after animation
					if (isAutoplayEnabled && !isPaused) {
						startAutoplayTimer();
					}
				},
			});
		},
		[
			getStepSize,
			clearAutoplayTimer,
			startAutoplayTimer,
			isAutoplayEnabled,
			isPaused,
		]
	);

	const goPrev = React.useCallback(
		(fromUser = false) => {
			if (isAnimatingRef.current) return;
			const track = trackRef.current;
			if (!track) return;
			const step = getStepSize();
			if (!step) return;
			const last = track.children[track.children.length - 1] as HTMLElement;
			track.insertBefore(last, track.children[0]);
			gsap.set(track, { x: -step });
			isAnimatingRef.current = true;

			// Reset autoplay timer if user initiated
			if (fromUser) {
				clearAutoplayTimer();
			}

			gsap.to(track, {
				x: 0,
				duration: 0.75,
				ease: 'power2',
				onComplete: () => {
					setActiveIndex(
						(i) => (i - 1 + beautyCards.length) % beautyCards.length
					);
					isAnimatingRef.current = false;

					// Restart autoplay timer after animation
					if (isAutoplayEnabled && !isPaused) {
						startAutoplayTimer();
					}
				},
			});
		},
		[
			getStepSize,
			clearAutoplayTimer,
			startAutoplayTimer,
			isAutoplayEnabled,
			isPaused,
		]
	);

	// Autoplay effect
	React.useEffect(() => {
		if (isAutoplayEnabled && !isPaused) {
			startAutoplayTimer();
		} else {
			clearAutoplayTimer();
		}

		return clearAutoplayTimer;
	}, [isAutoplayEnabled, isPaused, startAutoplayTimer, clearAutoplayTimer]);

	// Pause/resume on hover
	const handleMouseEnter = React.useCallback(() => {
		setIsPaused(true);
	}, []);

	const handleMouseLeave = React.useCallback(() => {
		setIsPaused(false);
	}, []);

	// Reset translation on resize
	useGSAP(
		() => {
			const track = trackRef.current;
			if (!track) return;
			const observer = new ResizeObserver(() => {
				gsap.set(track, { x: 0 });
			});
			observer.observe(track);
			return () => observer.disconnect();
		},
		{ scope: wrapperRef, dependencies: [] }
	);

	return (
		<section className='bg-[#b39a67] text-(--black) w-full px-[5vw] py-16 flex flex-col gap-4 md:gap-8 items-center'>
			<header className='w-full max-w-6xl flex flex-col gap-3 items-center'>
				<p className='text-sm uppercase tracking-[0.4em] text-(--black)'>
					GrandFit&Beauty
				</p>
				<GSAPSplitTextComponent ease={'power2'}>
					<h3
						className='text-4xl md:text-5xl font-semibold tracking-tight text-(--black) leading-[1.35]'
						style={{ fontFamily: 'Lora, serif' }}>
						Beauty Corner
					</h3>
				</GSAPSplitTextComponent>
				<p className='max-w-md text-center text-base md:text-lg text-(--black)'>
					Istražite našu ponudu tretmana i pronađite idealnu kombinaciju
					wellness iskustava.
				</p>
			</header>
			<div
				ref={wrapperRef}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={`relative w-full max-w-6xl select-none overflow-hidden flex justify-start px-2`}>
				<div ref={trackRef} className='flex gap-3 py-4'>
					{beautyCards.map((card, index) => (
						<article
							key={card.title}
							ref={registerCard(index)}
							className={`beauty-card ${cardWidth} cursor-pointer aspect-square w-64 md:w-32 rounded-xs border border-dashed border-gray-800 bg-[#b39a67] px-6 py-8  transition-all duration-300 ease-out ${
								activeIndex === index
									? 'ring-2 ring-offset-3 ring-offset-gray-800 ring-gray-950'
									: ''
							}`}>
							<header className='flex items-start flex-col justify-between gap-2'>
								<span className='text-[10px] uppercase tracking-[0.3em] text-gray-700'>
									Tretman
								</span>
								<h4 className='text-2xl font-semibold tracking-tight'>
									{card.title}
								</h4>
							</header>
							{card.text && (
								<p className='mt-6 text-sm leading-relaxed text-gray-800'>
									{card.text}
								</p>
							)}
						</article>
					))}
				</div>
			</div>
			<div className='flex flex-wrap items-center justify-center gap-4 w-full max-w-6xl'>
				<div className='flex flex-col items-center gap-3'>
					<div className='flex items-center gap-2 text-sm text-(--black)'>
						<span className='inline-block h-2 w-2 rounded-full bg-(--black)' />
						<span>
							{activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1}
						</span>
						<span className='opacity-60'>
							/{' '}
							{beautyCards.length < 10
								? `0${beautyCards.length}`
								: beautyCards.length}
						</span>
					</div>

					<div className='flex gap-2'>
						<button
							type='button'
							onClick={() => goPrev(true)}
							className='w-16 md:w-20 aspect-square flex items-center justify-center border border-dashed border-(--black) px-4 py-2 text-sm font-medium text-(--black) transition hover:bg-(--black) hover:text-(--gold) duration-300'>
							<ArrowLeft size={32} />
						</button>
						<button
							type='button'
							onClick={() => goNext(true)}
							className='w-16 md:w-20 aspect-square flex items-center justify-center border border-dashed border-(--black) text-(--black) px-4 py-2 text-sm font-medium transition hover:bg-(--black) duration-300 hover:text-(--gold)'>
							<ArrowRight size={32} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BeautyCornerComponent;
