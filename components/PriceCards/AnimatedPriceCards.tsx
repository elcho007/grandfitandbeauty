'use client';
import React from 'react';
import FadeIn from '../FadeIn/FadeIn';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { useGSAP, gsap } from '@/lib/gsap';

type Props = {
	activeIndex: number;
};

const beautyPriceCards = [
	{
		title: 'Osnovni Beauty Paket',
		price: '€90',
		features: [
			'Konzultacija',
			'Osnovni tretman lica',
			'Savjeti za njegu kože kod kuće',
		],
	},
	{
		title: 'Beauty Queen Paket',
		price: '€120',
		features: [
			'Konzultacija',
			'Dubinsko čišćenje lica',
			'Hidratantni tretman',
			'Personalizirani plan njege kože',
		],
	},
	{
		title: 'Premium Paket',
		price: '€150',
		features: [
			'Konzultacija',
			'Tretman mikrodermoabrazije',
			'Anti-age tretman',
		],
	},
];

const fitnessPriceCards = [
	{
		title: 'Osnovni Paket',
		subTitle: 'Za početnike koji žele započeti svoju fitness avanturu',
		price: '€55',
		features: [
			'Pristup teretani',
			'4 termina tjedno',
			'Osnovne prehrambene smjernice',
		],
	},
	{
		title: 'Pro Paket',
		subTitle:
			'Za ozbiljne entuzijaste koji traže smjernice i dosljedan pristup vježbanju',
		price: '€85',
		features: [
			'Konzultacija s trenerom (2x mjesečno)',
			'Neograničen pristup teretani',
			'Individualni plan vježbanja za svaki mjesec',
			'Pristup grupnim treninzima',
			'Praćenje napretka',
		],
	},
	{
		title: 'Zlatni Paket',
		subTitle: 'Za one koji žele maksimalne rezultate',
		price: '€120',
		features: [
			'Svi benefiti Pro Paketa',
			'Tjedne konzultacije s trenerom',
			'Savjeti i smjernice za oporavak',
			'Prioritet kod rezervacije termina',
			'Ekskluzivni pristup radionicama i događajima',
		],
	},
];

const CardContent = ({
	card,
	index,
	activeIndex,
}: {
	card: any;
	index: number;
	activeIndex: number;
}) => (
	<>
		<div
			className={`flex flex-col gap-2 border-b ${
				index === 1 ? 'border-gray-50/50' : 'border-green-900/50'
			}`}>
			<h3
				className={`${
					index === 1 && activeIndex === 0
						? 'text-pink-200/50'
						: 'text-green-950/50'
				} relative z-10 text-lg font-semibold tracking-tight uppercase`}>
				{card.title}
			</h3>
			{'subTitle' in card && (
				<p className='tracking-tight leading-[1.2] mb-4'>
					{(card as any).subTitle}
				</p>
			)}

			<p
				className={`${
					index === 1 && activeIndex === 0 ? 'text-pink-200' : 'text-green-950'
				} relative z-10 font-bold mb-2 flex text-5xl tracking-tighter items-end gap-1`}>
				{card.price}
				<span className='font-normal text-lg tracking-normal'>/mjesečno</span>
			</p>
		</div>

		<ul className='list-disc list-outside relative z-10 mb-4 mt-4 tracking-tight'>
			{card.features.map((feature: string, featureIndex: number) => (
				<li
					key={featureIndex}
					className='mb-2 list-none flex items-start gap-2'>
					<span
						className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
							index === 1 && activeIndex === 0
								? 'bg-pink-900'
								: `${activeIndex === 0 ? 'bg-gray-700' : 'bg-green-950'}`
						}`}>
						<Check
							size={12}
							className={
								index === 1 && activeIndex === 0
									? `${activeIndex === 0 ? 'text-pink-200' : 'text-green-100'}`
									: 'text-gray-200'
							}
						/>
					</span>
					<span
						className={`${
							index === 1 && activeIndex === 0
								? 'text-pink-200'
								: 'text-green-950'
						} leading-[1.45] relative -top-0.5`}>
						{feature}
					</span>
				</li>
			))}
		</ul>
	</>
);

const AnimatedPriceCards = ({ activeIndex }: Props) => {
	const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);
	const mobileCardsRef = React.useRef<(HTMLDivElement | null)[]>([]);
	const previousCardsRef = React.useRef<any[]>([]);
	const previousMobileActiveIndexRef = React.useRef(1);
	const [mobileActiveIndex, setMobileActiveIndex] = React.useState(1);
	const [touchStart, setTouchStart] = React.useState<number | null>(null);
	const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

	// Choose which price cards to show based on activeIndex
	const currentCards = activeIndex === 0 ? beautyPriceCards : fitnessPriceCards;

	// Mobile Swipe Logic
	const minSwipeDistance = 50;

	const onTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e: React.TouchEvent) =>
		setTouchEnd(e.targetTouches[0].clientX);

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;
		if (isLeftSwipe) {
			handleNext();
		}
		if (isRightSwipe) {
			handlePrev();
		}
	};

	const handleNext = () => {
		setMobileActiveIndex((prev) =>
			prev === currentCards.length - 1 ? 0 : prev + 1
		);
	};

	const handlePrev = () => {
		setMobileActiveIndex((prev) =>
			prev === 0 ? currentCards.length - 1 : prev - 1
		);
	};

	useGSAP(
		() => {
			if (typeof window !== 'undefined' && window.innerWidth >= 768) return;

			const isCategorySwitch = previousCardsRef.current !== currentCards;
			const prevIndex = previousMobileActiveIndexRef.current;

			currentCards.forEach((_, index) => {
				const card = mobileCardsRef.current[index];
				if (!card) return;

				const N = currentCards.length;
				let diff = (index - mobileActiveIndex + N) % N;
				if (diff > N / 2) {
					diff -= N;
				}

				// Calculate old diff to detect wrapping
				let oldDiff = (index - prevIndex + N) % N;
				if (oldDiff > N / 2) oldDiff -= N;

				const absDiff = Math.abs(diff);
				const x = 30 * diff;
				const scale = 1 - 0.1 * absDiff;
				const zIndex = 20 - absDiff;
				const opacity = 1 - 0.2 * absDiff;
				const rotate = 3 * diff;

				// Ensure the furthest card is always behind
				if (absDiff > 1) {
					gsap.set(card, { zIndex: 0, opacity: 0 });
				} else {
					if (isCategorySwitch) {
						gsap.set(card, {
							x: x,
							scale: scale,
							zIndex: zIndex,
							rotation: rotate,
							opacity: 0,
						});
						gsap.to(card, {
							opacity: opacity,
							duration: 0.5,
							ease: 'power2.out',
						});
					} else {
						const isWrapping = Math.abs(diff - oldDiff) > 1;

						if (isWrapping) {
							gsap.set(card, { zIndex: 0 });
							gsap.to(card, {
								x: x,
								scale: scale,
								opacity: opacity,
								rotation: rotate,
								duration: 0.5,
								ease: 'power2.out',
								onComplete: () => {
									gsap.set(card, { zIndex: zIndex });
								},
							});
						} else {
							gsap.set(card, { zIndex: zIndex });
							gsap.to(card, {
								x: x,
								scale: scale,
								opacity: opacity,
								rotation: rotate,
								duration: 0.5,
								ease: 'power2.out',
							});
						}
					}
				}
			});
			previousCardsRef.current = currentCards;
			previousMobileActiveIndexRef.current = mobileActiveIndex;
		},
		{ dependencies: [mobileActiveIndex, currentCards] }
	);

	return (
		<>
			{/* Desktop View */}
			<FadeIn
				key={`desktop-${activeIndex}`}
				className='hidden md:flex gap-4 items-center justify-center w-full'
				duration={0.5}
				stagger={0.15}>
				{currentCards.map((card, index) => (
					<div
						key={card.title}
						ref={(el) => {
							cardsRef.current[index] = el!;
						}}
						className={`relative price-card p-8 pb-2 mb-4 aspect-[.70] w-84 flex flex-col ${
							index === 1
								? `w-92 aspect-[.65] z-10 ${
										activeIndex === 0 ? 'bg-pink-600' : 'bg-(--green)'
								  } text-green-950`
								: 'bg-gray-50  text-gray-700'
						} rounded-xl`}>
						<CardContent card={card} index={index} activeIndex={activeIndex} />
					</div>
				))}
			</FadeIn>

			{/* Mobile View */}
			<div
				className='md:hidden relative w-full h-[600px] flex items-center justify-center mt-4'
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}>
				{currentCards.map((card, index) => (
					<div
						key={`mobile-${card.title}`}
						ref={(el) => {
							mobileCardsRef.current[index] = el!;
						}}
						className={`absolute p-8 pb-2 w-[90%] h-[480px] flex flex-col shadow-xl ${
							index === 1
								? `${
										activeIndex === 0 ? 'bg-pink-600' : 'bg-(--green)'
								  } text-(--darkGreen)`
								: 'bg-gray-50 text-gray-700'
						} rounded-xl transition-colors duration-300`}
						style={{
							transformOrigin: 'center bottom',
							top: '5%',
						}}>
						<CardContent card={card} index={index} activeIndex={activeIndex} />
					</div>
				))}

				{/* Mobile Controls */}
				<div className='absolute -bottom-1 flex gap-2 md:gap-8 z-30'>
					<button
						onClick={handlePrev}
						className={`p-3 bg-white/10 border aspect-square w-16 flex items-center justify-center border-dashed border-white text-white transition-all active:scale-95`}>
						<ArrowLeft size={24} />
					</button>
					<button
						onClick={handleNext}
						className={`p-3 aspect-square w-16 bg-white/10 border border-dashed flex items-center justify-center border-white text-white transition-all active:scale-95`}>
						<ArrowRight size={24} />
					</button>
				</div>
			</div>
		</>
	);
};

export default AnimatedPriceCards;
