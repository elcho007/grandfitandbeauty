'use client';
import Image from 'next/image';
import React from 'react';

import { gsap, useGSAP, SplitText } from '@/lib/gsap';

type Props = {};

type StatCard = {
	id: string;
	title: string;
	value?: string;
	unit?: string;
	subtext?: string;
	progress?: number;
	type: 'standard' | 'intensity' | 'next-workout' | 'attendance';
	theme: 'light' | 'dark' | 'darker';
	level?: number;
	date?: Date;
};

const statsCards: StatCard[] = [
	{
		id: 'steps',
		title: 'Koraka',
		value: '850',
		subtext: 'od 10000 preporučenih koraka',
		progress: 85,
		type: 'standard',
		theme: 'light',
	},
	{
		id: 'hiit',
		title: 'HIIT Trening',
		value: '788',
		unit: 'kcal',
		subtext: 'od 2200 kcal preporučenih',
		progress: 40,
		type: 'standard',
		theme: 'light',
	},
	{
		id: 'calories',
		title: 'Unos Kalorija',
		value: '1450',
		unit: 'kcal',
		subtext: 'Cilj: 2200 kcal',
		progress: 60,
		type: 'standard',
		theme: 'light',
	},
	{
		id: 'distance',
		title: 'Udaljenost',
		value: '5.2',
		unit: 'km',
		subtext: 'Trčanje + Hodanje',
		progress: 40,
		type: 'standard',
		theme: 'light',
	},
	{
		id: 'duration',
		title: 'Trajanje',
		value: '75',
		unit: 'min',
		subtext: 'Prosjek ovaj tjedan',
		progress: 75,
		type: 'standard',
		theme: 'light',
	},
	{
		id: 'intensity',
		title: 'Intenzitet',
		value: 'VISOK',
		subtext: 'Avg HR: 145 bpm',
		level: 3,
		type: 'intensity',
		theme: 'light',
	},
	{
		id: 'next-workout',
		title: 'Sljedeći Trening',
		value: '18:00',
		subtext: 'Leg Day',
		date: new Date(Date.now() + 86400000),
		type: 'next-workout',
		theme: 'dark',
	},
	{
		id: 'attendance',
		title: 'Prisustvo',
		type: 'attendance',
		theme: 'darker',
	},
];

const motivationalQuotes: string[] = [
	"It's about progress, not perfection.",
	'Success starts with self-discipline.',
	'The body achieves what the mind believes.',
	"Don't limit your challenges, challenge your limits.",
	'Sweat is just pain leaving the body.',
	// need a new one, shorter if possible
	'Believe in yourself and all that you are.',
];

const imageUrls: string[] = [
	'/images/story1.jpg',
	'/images/story2.jpg',
	'/images/story3.jpg',
	'/images/story4.jpg',
];

const StatCardComponent = ({
	card,
	index,
}: {
	card: StatCard;
	index: number;
}) => {
	const cardRef = React.useRef<HTMLDivElement>(null);
	const valueRef = React.useRef<HTMLSpanElement>(null);
	const progressRef = React.useRef<HTMLSpanElement>(null);

	useGSAP(() => {
		if (!cardRef.current) return;

		// Card entry animation
		gsap.fromTo(
			cardRef.current,
			{ opacity: 0, y: 20 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				delay: index * 0.1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: cardRef.current,
					start: 'top 90%',
				},
			}
		);

		// Number count-up animation for standard cards
		if (card.type === 'standard' && card.value && valueRef.current) {
			const numericValue = parseFloat(card.value);
			if (!isNaN(numericValue)) {
				const isFloat = card.value.includes('.');
				const decimalPlaces = isFloat ? card.value.split('.')[1].length : 0;

				const proxy = { val: 0 };

				gsap.to(proxy, {
					val: numericValue,
					duration: 2,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: cardRef.current,
						start: 'top 85%',
					},
					onUpdate: function () {
						if (valueRef.current) {
							valueRef.current.textContent =
								this.targets()[0].val.toFixed(decimalPlaces);
						}
					},
				});
			}
		}

		// Progress bar animation
		if (card.progress && progressRef.current) {
			gsap.fromTo(
				progressRef.current,
				{ width: '0%' },
				{
					width: `${card.progress}%`,
					duration: 1.5,
					ease: 'power2.out',
					delay: 0.2,
					scrollTrigger: {
						trigger: cardRef.current,
						start: 'top 85%',
					},
				}
			);
		}
	}, []);

	const getCardStyles = (card: StatCard) => {
		const baseStyles =
			'w-[calc(50%-0.5rem)] h-48 flex justify-between rounded-sm p-4';
		switch (card.theme) {
			case 'light':
				return `${baseStyles} bg-gray-300 flex-col`;
			case 'dark':
				return `${baseStyles} bg-[#cebd92] text-(--black) flex-col`;
			case 'darker':
				return `${baseStyles} bg-[#cebd92] text-(--black) items-start flex-col gap-4`;
			default:
				return baseStyles;
		}
	};

	const renderContent = () => {
		switch (card.type) {
			case 'standard':
				return (
					<>
						<div>
							<span className='text-gray-950 tracking-tight font-semibold'>
								{card.title}
							</span>
							<div className='relative bg-gray-400 h-2 rounded-lg p-0.5 w-[50%] overflow-hidden mt-2'>
								<span
									ref={progressRef}
									className='absolute bg-gray-600 rounded-lg h-1'
									style={{ width: '0%' }} // Set initial width to 0 for animation
								/>
							</div>
						</div>
						<div className='flex flex-col'>
							<span
								style={{ fontFamily: 'Anton, sans-serif' }}
								className='text-4xl md:text-5xl tracking-tight'>
								<span ref={valueRef}>{0}</span>{' '}
								{/* Initial value 0 for animation */}
								{card.unit && (
									<span className='text-base font-sans font-normal'>
										{card.unit}
									</span>
								)}
							</span>
							<span className='text-xs text-gray-600'>{card.subtext}</span>
						</div>
					</>
				);
			case 'intensity':
				return (
					<>
						<div>
							<span className='text-gray-950 tracking-tight font-semibold'>
								{card.title}
							</span>
							<div className='flex gap-1 mt-2'>
								{[...Array(4)].map((_, i) => (
									<div
										key={i}
										className={`h-2 w-2 rounded-full ${
											i < (card.level || 0) ? 'bg-gray-600' : 'bg-gray-400'
										}`}></div>
								))}
							</div>
						</div>
						<div className='flex flex-col'>
							<span
								style={{ fontFamily: 'Anton, sans-serif' }}
								className='text-4xl tracking-tight'>
								{card.value}
							</span>
							<span className='text-xs text-gray-600'>{card.subtext}</span>
						</div>
					</>
				);
			case 'next-workout':
				return (
					<>
						<div className='flex flex-col h-full'>
							<span className='text-(--black) tracking-tight font-semibold'>
								{card.title}
							</span>
							<p className='text-xs text-gray-800'>
								{card.date?.toLocaleDateString('hr-HR', {
									weekday: 'long',
									day: 'numeric',
									month: 'long',
								})}
							</p>
						</div>
						<div className='flex flex-col'>
							<span
								style={{ fontFamily: 'Anton, sans-serif' }}
								className='text-5xl tracking-tight'>
								{card.value}
							</span>
							<span className='text-xs text-gray-800'>{card.subtext}</span>
						</div>
					</>
				);
			case 'attendance':
				return (
					<>
						<div className='flex justify-between w-full'>
							<span className='text-(--black) tracking-tight font-semibold flex flex-col leading-none'>
								{card.title}
								<span className='text-[10px] tracking-widest uppercase text-(--black) font-medium relative top-1'>
									{new Date().toLocaleDateString('hr-HR', { month: 'long' })}
								</span>
								<span className='bg-(--black) p-1 text-[12px] text-[#cebd92] rounded-full flex justify-center items-center h-fit px-2 mt-2'>
									Odlično!
								</span>
							</span>
						</div>

						<div className='grid grid-cols-7 gap-1 w-full'>
							{Array.from({ length: 30 }).map((_, i) => {
								const isMissed = [4, 11, 22].includes(i);
								const isFuture = i > 23;

								return (
									<div key={i} className='flex justify-center items-center'>
										<div
											className={`w-3 h-3 rounded-xs ${
												isFuture
													? 'bg-gray-600'
													: isMissed
													? 'bg-(--navyBlue)'
													: 'bg-gray-300'
											}`}
											title={`Day ${i + 1}`}
										/>
									</div>
								);
							})}
						</div>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div ref={cardRef} className={getCardStyles(card)}>
			{renderContent()}
		</div>
	);
};

const PowerQuotes = (props: Props) => {
	const headingRef = React.useRef<HTMLHeadingElement>(null);
	const imageRef = React.useRef<HTMLImageElement>(null);
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const titleRef = React.useRef<HTMLDivElement>(null);
	const quoteRef = React.useRef<HTMLDivElement>(null);
	const statCardsRef = React.useRef<HTMLDivElement>(null);
	const tl = React.useRef<gsap.core.Timeline | null>(null);

	useGSAP(() => {
		if (!headingRef.current || !imageRef.current) return;

		const split = new SplitText(headingRef.current, {
			type: 'lines, words,chars',
			mask: 'lines',
			autoSplit: true,
		});

		const tl = gsap.timeline({
			onComplete: () => {
				split.revert();
				setCurrentIndex((prev) => (prev + 1) % motivationalQuotes.length);
			},
		});

		tl.fromTo(
			imageRef.current,
			{ opacity: 0, scale: 1.2 },
			{ opacity: 1, scale: 1, duration: 1.5, ease: 'power2' },
			0
		);

		tl.from(
			split.lines,
			{
				opacity: 0,
				yPercent: 100,
				duration: 1,
				stagger: 0.05,
				ease: 'power2',
			},
			0.2
		);

		tl.to(
			split.lines,
			{
				opacity: 0,
				yPercent: 0,
				duration: 0.5,
				stagger: 0.02,
				ease: 'power2.in',
			},
			'+=5'
		);

		tl.to(
			imageRef.current,
			{
				opacity: 0,
				scale: 1.1,
				duration: 0.5,
				ease: 'power2.in',
			},
			'<'
		);

		return () => {
			split.revert();
		};
	}, [currentIndex]);

	useGSAP(() => {
		if (
			!containerRef.current ||
			!titleRef.current ||
			!quoteRef.current ||
			!statCardsRef.current
		)
			return;
		tl.current = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top 80%',
				toggleActions: 'play none none reverse',
			},
		});

		tl.current
			.fromTo(
				titleRef.current,
				{ y: 100, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' }
			)
			.fromTo(
				quoteRef.current,
				{ y: 100, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' },
				'-=0.5'
			)
			.fromTo(
				statCardsRef.current,
				{ y: 100, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' },
				'-=0.5'
			);

		return () => {
			tl.current?.kill();
		};
	});

	return (
		<div
			ref={containerRef}
			className='w-full min-h-[150svh] md:min-h-[140vh] px-4 md:px-8 py-8 flex flex-col justify-center gap-2 bg-(--black)'>
			<div className='w-full h-full flex flex-col md:flex-row gap-2'>
				<div
					ref={titleRef}
					className='flex flex-col w-full gap-4 md:w-1/4 bg-[#cebd92] lg:h-[90vh] p-4 rounded-xl text-(--black)'>
					<h2
						className=' text-3xl xl:text-[2vw] tracking-tight max-h-max max-w-sm'
						style={{ fontFamily: 'Anton, sans-serif' }}>
						Mi ćemo se pobrinuti da vaši dani budu ispunjeni napretkom.
					</h2>
					<button className='bg-(--black) text-[#cebd92] px-3 py-1.5 max-w-max'>
						Rezervišite svoj termin
					</button>
				</div>
				<div
					ref={quoteRef}
					className='flex flex-col w-full md:w-2/4 flex-1 items-center justify-between border border-[#cebd92] rounded-xl p-4 h-96 lg:h-[90vh]'>
					<div className='h-1/3 w-full flex justify-center items-center'>
						<h1
							ref={headingRef}
							className='text-xl md:text-4xl lg:text-5xl text-[#cebd92] text-center leading-tight tracking-tight max-w-[18ch] md:max-w-[22ch]'
							style={{ fontFamily: 'Anton, sans-serif' }}>
							{motivationalQuotes[currentIndex]}
						</h1>
					</div>
					<div className='relative w-full h-48 md:h-2/3 rounded-xl overflow-hidden'>
						<Image
							ref={imageRef}
							src={imageUrls[currentIndex % imageUrls.length]}
							alt='Motivational'
							fill
							className='object-cover'
						/>
					</div>
				</div>
				<div
					ref={statCardsRef}
					className='flex w-full md:w-1/4 items-center content-center border border-dashed border-[#cebd92]x-2 py-2 lg:py-0 rounded-xl justify-between flex-wrap gap-2 bg-gray-950 lg:h-[90vh]'>
					{statsCards.map((card, index) => (
						<StatCardComponent key={card.id} card={card} index={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default PowerQuotes;
