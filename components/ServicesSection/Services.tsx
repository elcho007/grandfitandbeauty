'use client';
import React from 'react';
import { gsap, useGSAP, CustomEase, SplitText } from '../../lib/gsap';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';

const treninziCards = [
	{ title: 'Grupne vježbe', image: '', text: '' },
	{ title: 'Individualne vježbe', image: '', text: '' },
	{ title: 'Djeca', image: '', text: '' },
	{ title: 'Rehabilitacija', image: '', text: '' },
	{ title: 'Sportaši', image: '/images/sportasi.png', text: '' },
	{ title: 'Aq8 EMS sistem treninga', image: '', text: '' },
	{
		title: 'Bodyspace sistem treninga',
		image: '',
		text: 'Kombinira vakuum tehnologiju i infracrveno grijanje kako bi potaknuo ubrzano topljenje masnih naslaga, oblikovanje tijela i poboljšanje cirkulacije.Idealno za ubrzavanje metabolizma, smanjenje celulita i vidljive rezultate u kraćem vremenu.',
	},
];

const beautyCards = [
	{ title: 'Masaža', image: '', text: '' },
	{ title: 'Maderoterapija', image: '', text: '' },
	{ title: 'Linfomodeling', image: '/images/linfomodeling.png', text: '' },
	{ title: 'Hydrafacial', image: '', text: '' },
	{
		title: 'Tesla',
		image: '/images/tesla.png',
		text: 'Funkcionira tako da elektromagnetsko polje prolazi kroz cijelu kožu i masnoću područja koje se tretira, da bi se učinkovito stimulirali mišići pružajući najintenzivnije kontinuirane kontrakcije, što je idealno za rast mišića, ali i umiranje masnih stanica.Tretman je ugodan i nema nelagode. Traje 30 minuta i ne zahtijeva oporavak, a dva do tri tretmana tjedno trebaju biti dovoljna da većina ljudi postigne sjajan rezultat. Obično se preporučuje šest tretmana uslijed kojih se već vide promjene na izgledu mišića.',
	},
	{ title: 'Rf tretman', image: '', text: '' },
];

const generalCards = [
	{ title: 'Bazen', image: '/images/bazen.png', text: '' },
	{ title: 'Teretana', image: '', text: '' },
];

const allCards = [...treninziCards, ...beautyCards, ...generalCards];

const Services = () => {
	const wheelRef = React.useRef<HTMLDivElement>(null);
	const draggableWheelRef = React.useRef<HTMLDivElement>(null);

	const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
	const titleRef = React.useRef<HTMLDivElement>(null);
	const textRef = React.useRef<HTMLDivElement>(null);

	const [activeCardIndex, setActiveCardIndex] = React.useState<number>(0);
	const [prevCardIndex, setPrevCardIndex] = React.useState<number>(0);

	const [direction, setDirection] = React.useState<'next' | 'prev'>('next');

	/* useGSAP(
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
					const newTopCardIndex = (total - topCardIndex) % total;

					// If there's a currently open card and the top card changed, close it
					if (
						activeCardIndex !== null &&
						currentTopCardIndex !== newTopCardIndex
					) {
						const previousCardElement =
							cardRefs.current[activeCardIndex]?.querySelector(
								'.more-about-card'
							);
						if (previousCardElement) {
							gsap.to(previousCardElement, {
								top: '91%',
								duration: 0.4,
								ease: 'power2.inOut',
							});
						}
						setActiveCardIndex(null);
					}

					// Update current top card index
					setCurrentTopCardIndex(newTopCardIndex);

					// Animate text change with SplitText
					animateTextChange(allCards[newTopCardIndex].title);
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

		// If there's already an active card and it's different, close it first
		if (activeCardIndex !== null && activeCardIndex !== index) {
			const previousCardElement =
				cardRefs.current[activeCardIndex]?.querySelector('.more-about-card');
			if (previousCardElement) {
				gsap.to(previousCardElement, {
					top: '91%',
					duration: 0.3,
					ease: 'power2.inOut',
				});
			}
		}

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
	}); */

	useGSAP(() => {
		if (!wheelRef.current) return;

		CustomEase.create(
			'hop',
			'M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1'
		);

		const cards = wheelRef.current.querySelectorAll('.card');

		const splitInstances: SplitText[] = [];
		const isMobile = window.innerWidth < 768;
		const ease = isMobile ? 'power2.inOut' : 'hop';
		const duration = isMobile ? 1 : 1.5;
		const offset = isMobile ? 150 : 500;

		cards.forEach((card, index) => {
			if (index === activeCardIndex) {
				// Animate in the new active card with clip path reveal
				const splitText = new SplitText(textRef.current, {
					type: 'words,chars',
					mask: 'words',
				});
				const splitTitle = new SplitText(titleRef.current, {
					type: 'words,chars',
					mask: 'words',
				});

				splitInstances.push(splitText, splitTitle);
				gsap.set(card, { zIndex: 2, visibility: 'visible' });
				gsap.set(splitTitle.chars, { opacity: 0, yPercent: 100 });
				gsap.set(splitText.words, { opacity: 0, yPercent: 100 });

				// Clip path animation - reveal from appropriate direction
				const cardImage = card.querySelector('img');
				if (cardImage) {
					gsap.fromTo(
						cardImage,
						{
							x: direction === 'next' ? offset : -offset,
						},
						{
							x: 0,
							duration: duration,
							ease: ease,
						}
					);
				}

				gsap.fromTo(
					card,
					{
						clipPath:
							direction === 'next'
								? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
								: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
					},
					{
						clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
						duration: duration,
						ease: ease,
					}
				);

				gsap.fromTo(
					splitText.words,
					{
						yPercent: 100,
						opacity: 0,
					},
					{
						opacity: 1,
						yPercent: 0,
						duration: 0.35,
						stagger: { amount: 0.25 },
						ease: ease,
						delay: 0.4,
					}
				);
				gsap.fromTo(
					splitTitle.chars,
					{
						yPercent: 100,
						opacity: 0,
					},
					{
						opacity: 1,
						yPercent: 0,
						duration: 0.5,
						stagger: { amount: 0.15 },
						ease: ease,
						delay: 0.3,
					}
				);
			} else if (index === prevCardIndex) {
				// Animate out the previous active card with clip path
				const cardImage = card.querySelector('img');
				if (cardImage) {
					gsap.to(cardImage, {
						x: direction === 'next' ? -offset : offset,
						duration: duration,
						ease: ease,
					});
				}

				gsap.set(card, {
					zIndex: 1,
					visibility: 'visible',
					clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
				});
			} else {
				// Keep other cards completely hidden
				gsap.set(card, {
					clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
					zIndex: 0,
					visibility: 'hidden',
				});
			}
		});
		return () => {
			splitInstances.forEach((split) => split.revert());
		};
	}, [activeCardIndex, direction, prevCardIndex]);

	return (
		<>
			<div
				ref={draggableWheelRef}
				className='w-full min-h-[110vh] bg-(--black) slider relative grid grid-cols-12 overflow-hidden py-10 px-[5vw] gap-2 items-end justify-items-start align-content-center text-[#b39a67]'>
				<GSAPSplitTextComponent
					ease={'expo'}
					start={'top 90%'}
					duration={1}
					className='col-span-12'>
					<h2
						className=' text-3xl xl:text-[5vw] tracking-tight mb-4 max-h-max text-[#b39a67]'
						style={{ fontFamily: 'Anton, sans-serif' }}>
						GrandFit&Beauty usluge
					</h2>
				</GSAPSplitTextComponent>
				<h3 className='col-span-12 md:col-span-5 row-auto col-start-1 text-2xl xl:text-3xl tracking-tighter font-medium max-w-[35ch] max-h-max'>
					U{' '}
					<span className='font-semibold'>
						{' '}
						GrandFit<span style={{ fontFamily: 'Lora, serif' }}>&Beauty </span>
					</span>
					nudimo vam širok spektar usluga i tretmana koji će vam pomoći da
					izgledate i osjećate se najbolje.
				</h3>
				<p className='text-base md:text-xl col-span-12 col-start-1 tracking-tight leading-[1.45] max-w-[40ch] xl:max-w-[55ch] max-h-max'>
					Naše osoblje posjeduje savremena znanja i iskustva iz ovih oblasti, te
					vam garantujemo najviši nivo usluge i profesionalnosti.
				</p>
				<p className='col-span-12 md:col-span-5 text-base md:text-xl tracking-tight leading-[1.45] max-w-[40ch] xl:max-w-[55ch] max-h-max'>
					Izaberite uslugu koja Vam najviše odgovara, a ostalo prepustite nama.
				</p>
				<div className='col-span-12 col-start-1 mt-16 flex flex-col md:flex-row bg-gray-300 w-full h-[650px] justify-between overflow-hidden relative rounded-xl'>
					<span
						className='text-sm md:text-xl absolute top-4 left-4 md:left-8 text-gray-950/50'
						style={{ fontFamily: 'Anton, sans-serif' }}>
						{activeCardIndex + 1}/{allCards.length}
					</span>
					<div className='flex flex-col justify-center gap-4 p-4 md:p-8 pt-16 md:pt-0 w-full md:w-1/2 '>
						<h3
							ref={titleRef}
							className='text-3xl md:text-7xl tracking-tight font-medium leading-tight'
							style={{ fontFamily: 'Anton, sans-serif' }}>
							{allCards[activeCardIndex].title}
						</h3>
						{/* More info card */}
						<div className='more-about-card w-full flex flex-col pb-4'>
							<div
								ref={textRef}
								className='text-sm md:text-xl text-left leading-[1.45] font-normal text-gray-950 max-w-[60ch]'>
								{allCards[activeCardIndex].text ||
									'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum est quis sapiente eius voluptatum dolore, eos iusto, possimus corporis accusamus nam! Deserunt fugiat odit necessitatibus repudiandae nemo fuga sequi, perferendis hic amet est eligendi ipsa perspiciatis soluta.'}
							</div>
						</div>
						<div className='card-content absolute left-4 md:left-8 z-20 col-start-1 w-36 md:w-68 flex bottom-4 md:bottom-8 text-black'>
							<div className='flex gap-2 md:gap-2 h-16 md:h-20 max-w-max'>
								<button
									aria-label='Previous service'
									onClick={(e) => {
										e.preventDefault();
										setPrevCardIndex(activeCardIndex);
										setDirection('prev');
										setActiveCardIndex(() => {
											// using modulo make it loop around
											return (
												(activeCardIndex - 1 + allCards.length) %
												allCards.length
											);
										});
									}}
									className='aspect-square border border-white hover:bg-gray-400 transition-all duration-300 md:border-black border-dashed flex items-center justify-center'>
									<ArrowLeft
										size={32}
										className='stroke-white md:stroke-black'
									/>
								</button>
								<button
									aria-label='Next service'
									onClick={(e) => {
										e.preventDefault();
										setPrevCardIndex(activeCardIndex);
										setDirection('next');
										setActiveCardIndex(() => {
											return (
												(activeCardIndex + 1 + allCards.length) %
												allCards.length
											);
										});
									}}
									className='aspect-square border border-dashed hover:bg-gray-400 transition-all duration-300 border-white md:border-black flex items-center justify-center'>
									<ArrowRight
										size={32}
										className='stroke-white md:stroke-black'
									/>
								</button>
							</div>
						</div>
					</div>
					<div
						ref={wheelRef}
						className='wheel z-10 w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-between gap-4 relative'>
						<div className='images-wrapper relative flex w-full h-full overflow-hidden'>
							{allCards.map((card, index) => (
								<div
									key={index}
									data-active={activeCardIndex === index}
									ref={(el) => {
										cardRefs.current[index] = el;
									}}
									className='card absolute w-full h-full overflow-hidden flex flex-col items-center justify-between text-center'>
									<div className='relative w-full h-full overflow-hidden'>
										<Image
											src={card.image || '/images/gfb1.jpg'}
											alt={card.title || 'Service image'}
											fill
											className='object-cover'
										/>
									</div>{' '}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Services;
