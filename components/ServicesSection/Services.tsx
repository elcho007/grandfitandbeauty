'use client';
import React from 'react';
import { gsap, useGSAP, Draggable, SplitText } from '../../lib/gsap';
import Image from 'next/image';
import { X } from 'lucide-react';

const treninziCards = [
	{ title: 'Grupne vježbe', image: '' },
	{ title: 'Individualne vježbe', image: '' },
	{ title: 'Djeca', image: '' },
	{ title: 'Rehabilitacija', image: '' },
	{ title: 'Sportaši', image: '/images/sportasi.png' },
	{ title: 'Aq8 EMS sistem treninga', image: '' },
	{ title: 'Bodyspace sistem treninga', image: '' },
];

const beautyCards = [
	{ title: 'Masaža', image: '' },
	{ title: 'Maderoterapija', image: '' },
	{ title: 'Linfomodeling', image: '/images/linfomodeling.png' },
	{ title: 'Hydrafacial', image: '' },
	{ title: 'Tesla', image: '/images/tesla.png' },
	{ title: 'Rf tretman', image: '' },
];

const generalCards = [
	{ title: 'Bazen', image: '/images/bazen.png' },
	{ title: 'Teretana', image: '' },
];

const allCards = [...treninziCards, ...beautyCards, ...generalCards];

type Props = {};

const Services = (props: Props) => {
	const wheelRef = React.useRef<HTMLDivElement>(null);
	const draggableWheelRef = React.useRef<HTMLDivElement>(null);

	const textSpanRef = React.useRef<HTMLSpanElement>(null);
	const splitTextRef = React.useRef<any>(null);
	const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

	const { contextSafe } = useGSAP();

	const [activeCardIndex, setActiveCardIndex] = React.useState<number | null>(
		null
	);
	const [currentTopCardIndex, setCurrentTopCardIndex] =
		React.useState<number>(0);

	useGSAP(
		() => {
			if (!wheelRef.current || !draggableWheelRef.current) return;

			const cards = gsap.utils.toArray(
				wheelRef.current.querySelectorAll('.card')
			) as HTMLDivElement[];
			const radius = wheelRef.current.offsetWidth / 2;
			const center = wheelRef.current.offsetWidth / 2;
			const total = cards.length;
			const angleStep = (2 * Math.PI) / cards.length;

			// Function to animate text change with SplitText from center
			const animateTextChange = (newText: string) => {
				if (!textSpanRef.current) return;

				// If there's an existing split, revert it first
				if (splitTextRef.current) {
					splitTextRef.current.revert();
				}

				// Set the new text content
				textSpanRef.current.textContent = newText;

				// Create new SplitText instance with words and characters
				splitTextRef.current = new SplitText(textSpanRef.current, {
					type: 'lines, words,chars',
					mask: 'chars',
					wordsClass: 'word',
					charsClass: 'char',
					onSplit: (self) => {
						// Set initial state - characters invisible
						gsap.set(self.chars, {
							opacity: 0,
							yPercent: 100,
							rotationX: -90,
						});

						// Animate characters from center outwards
						gsap.to(self.chars, {
							opacity: 1,
							yPercent: 0,
							rotationX: 0,
							duration: 0.4,
							ease: 'expo.out',
							stagger: {
								each: 0.025,
							},
						});
					},
				});
			};

			function positionCards() {
				cards.forEach((card, index) => {
					const angle = index * angleStep;
					const x = center + radius * Math.sin(angle);
					const y = center - radius * Math.cos(angle);

					gsap.set(card, {
						rotation: angle + '_rad',
						xPercent: -50,
						yPercent: -50,
						x: x,
						y: y,
					});
				});
			}

			// on window resize, reposition cards
			window.addEventListener('resize', positionCards);
			positionCards();

			gsap.set(wheelRef.current, {
				transformOrigin: '50% 50%',
			});

			// Set initial text content with animation
			if (textSpanRef.current && allCards.length > 0) {
				setCurrentTopCardIndex(0); // Set initial top card
				setTimeout(() => {
					animateTextChange(allCards[0].title);
				}, 100); // Small delay to ensure DOM is ready
			}

			Draggable.create(wheelRef.current, {
				type: 'rotation',
				inertia: true,
				dragResistance: 0.3,
				//bounds: { minRotation: -360, maxRotation: 360 },
				snap: function (endValue) {
					return Math.round(endValue / (360 / total)) * (360 / total);
				},
				onDrag: function () {
					gsap.to(wheelRef.current, {
						rotation: this.rotation,
						ease: 'power1.out',
						// add inertia here
					});
				},

				onThrowComplete: function () {
					// This fires when the wheel completely stops spinning (after inertia)
					const currentRotation = ((this.rotation % 360) + 360) % 360; // Normalize to 0-360

					// Calculate which card is actually at the top (0 degrees) position
					const degreesPerCard = 360 / total;
					const topCardIndex =
						Math.round(currentRotation / degreesPerCard) % total;
					const activeCardIndex = (total - topCardIndex) % total;

					// Update current top card index
					setCurrentTopCardIndex(activeCardIndex);

					// Animate text change with SplitText
					animateTextChange(allCards[activeCardIndex].title);
				},
			});

			return () => {
				Draggable.get(draggableWheelRef.current)?.kill();
				window.removeEventListener('resize', positionCards);
				// Cleanup SplitText
				if (splitTextRef.current) {
					splitTextRef.current.revert();
				}
			};
		},
		{ scope: draggableWheelRef }
	);

	const handleShowMore = contextSafe((index: number) => {
		// Only allow showing more info for the card that's currently at the top
		if (index !== currentTopCardIndex) return;

		setActiveCardIndex(index);

		// Animate the more-about-card up to show additional info
		const cardElement =
			cardRefs.current[index]?.querySelector('.more-about-card');
		if (cardElement) {
			gsap.to(cardElement, {
				top: '0%', // Move from 91% to 0% (fully visible)
				duration: 0.6,
				ease: 'expo.out',
			});
		} else {
			console.warn('Card element not found for index:', index);
		}
	});

	const handleHideMore = contextSafe(() => {
		if (activeCardIndex === null) return;

		// Animate the more-about-card back down
		const cardElement =
			cardRefs.current[activeCardIndex]?.querySelector('.more-about-card');
		if (cardElement) {
			console.log('Hiding card:', activeCardIndex, cardElement); // Debug log
			gsap.to(cardElement, {
				top: '91%', // Move back to original position
				duration: 0.4,
				ease: 'power2.inOut',
				onComplete: () => {
					setActiveCardIndex(null);
				},
			});
		}
	});

	return (
		<div
			ref={draggableWheelRef}
			className='w-full h-[150vh] bg-[#dddddd] slider relative overflow-hidden pt-20'>
			<h2 className='pl-[5vw] text-4xl tracking-tight font-semibold max-w-[40ch] mb-8'>
				U GrandFit&Beauty nudimo vam širok spektar usluga i tretmana koji će vam
				pomoći da izgledate i osjećate se najbolje.
			</h2>
			<p className='text-base tracking-tight leading-[1.45] max-w-[75ch] pl-[5vw] mb-4'>
				Naše osoblje posjeduje savremena znanja i iskustva iz ovih oblasti, te
				vam garantujemo najviši nivo usluge i profesionalnosti.
			</p>
			<p className='text-base tracking-tight leading-[1.45] max-w-[75ch] pl-[5vw]'>
				Izaberite uslugu koja Vam najviše odgovara, a ostalo prepustite nama.
			</p>
			<div
				ref={wheelRef}
				className='wheel absolute left-[50%] top-[50%] transform -translate-x-[50%] w-[300vw] h-[300vw] max-w-[2000px] max-h-[2000px] flex items-center justify-center'>
				{allCards.map((card, index) => (
					<div
						key={index}
						ref={(el) => {
							cardRefs.current[index] = el;
						}}
						className='card overflow-hidden absolute top-0 left-0 w-[15%] max-w-[350px] aspect-[.75] bg-[#afafaf] flex flex-col items-center justify-between text-center p-2 rounded-xl'>
						<div className='relative w-full h-[85%] rounded-lg overflow-hidden'>
							<Image
								src={card.image || '/images/gfb1.jpg'}
								alt=''
								fill
								className='object-cover'
							/>
							{/* Click overlay for interaction - only visible when card is at top */}
							{currentTopCardIndex === index && (
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleShowMore(index);
									}}
									className='absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-semibold text-sm backdrop-blur-sm'>
									Detalji
								</button>
							)}
						</div>
						<div className='text-[14px] text-center font-normal tracking-tight text-gray-700 pt-1'>
							{card.title}
						</div>

						{/* More info card */}
						<div className='more-about-card text-[12px] before:content-[""] before:left-[50%] before:transform before:translate-x-[-50%] before:h-16 before:rounded-2xl before:absolute before:inset-0 before:top-0 before:w-[80%] before:z-[-1] bg-[#afafaf] absolute inset-0 top-[91%] w-full h-full text-center z-10 font-semibold tracking-tight text-gray-700 flex flex-col pb-4'>
							<div className='flex justify-center items-center p-2 gap-4'>
								<h3 className='font-bold text-sm'>{card.title}</h3>
							</div>
							<div className='text-xs p-4 text-left leading-relaxed'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
								est quis sapiente eius voluptatum dolore, eos iusto, possimus
								corporis accusamus nam! Deserunt fugiat odit necessitatibus
								repudiandae nemo fuga sequi, perferendis hic amet est eligendi
								ipsa perspiciatis soluta.
							</div>

							<button
								onClick={(e) => {
									e.stopPropagation();
									handleHideMore();
								}}
								className='text-sm mt-auto font-bold text-gray-700 hover:text-gray-800'>
								{activeCardIndex !== null &&
									activeCardIndex === index &&
									'Zatvori'}
							</button>
						</div>
					</div>
				))}
			</div>
			<div className='absolute bottom-0 left-[50%] transform -translate-x-[50%] mb-10'>
				<span
					style={{ fontFamily: 'Anton, sans-serif' }}
					ref={textSpanRef}
					className='text-[5vw] tracking-normal leading-[1.45] uppercase text-center flex justify-center text-[#939393]'></span>
			</div>
		</div>
	);
};

export default Services;
