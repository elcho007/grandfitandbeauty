'use client';
import React from 'react';
import { gsap, useGSAP, CustomEase, SplitText } from '../../lib/gsap';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';

const treninziCards = [
	{
		title: 'Grupne vježbe',
		image: '',
		text: [
			'U Grand Fit & Beauty nudimo intenzivne i motivirajuće grupne treninge u malim skupinama do 6 osoba, prilagođene i muškarcima i ženama. Naši treninzi kombiniraju snagu, izdržljivost i funkcionalne vježbe, stvarajući idealan balans za sve koji žele vidljive rezultate i podršku trenera uz prijateljsku atmosferu.',
		],
	},
	{
		title: 'Individualni trening',
		image: '',
		text: [
			'Individualni treninzi pružaju potpuno personaliziran pristup, prilagođen vašim ciljevima, mogućnostima i životnom ritmu. Rad 1 na 1 s osobnim trenerom omogućuje maksimalnu učinkovitost svakog treninga, pravilnu tehniku i kontinuiranu motivaciju.',
			'Bilo da želite izgraditi snagu, oblikovati tijelo, poboljšati kondiciju ili jednostavno uvesti zdravu rutinu, vaš trener kreira program isključivo za vas, prateći vaš napredak iz treninga u trening.',
		],
	},
	{
		title: 'Trening za djecu',
		image: '',
		text: [
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio accusamus ad adipisci praesentium at neque ea quasi, quis modi optio, error facere recusandae alias iure?',
		],
	},
	{
		title: 'Rehabilitacija',
		image: '',
		text: [
			'Rehabilitacija u Grand Fit-u osmišljena je za sve koji se oporavljaju od ozljeda, operativnih zahvata ili dugotrajnijih bolnih stanja. Naš stručni tim pristupa svakom klijentu individualno, kombinirajući ciljane vježbe, mobilizaciju i kontrolirane pokrete kako bi se povratila funkcija, snaga i stabilnost tijela.',
			'Kroz pažljivo vođen proces fokusiramo se na siguran oporavak, pravilne obrasce kretanja i postupno vraćanje u svakodnevne aktivnosti ili sport. Cilj nam je smanjiti bol, poboljšati mobilnost i spriječiti ponovne ozljede uz stalni nadzor i podršku trenera.',
		],
	},
	{
		title: 'Kondicijska priprema sportaša',
		image: '/images/sportasi.png',
		text: [
			'Kondicijska priprema namijenjena je sportašima svih razina koji žele unaprijediti svoju snagu, brzinu, eksplozivnost i izdržljivost te pritom smanjiti rizik od ozljeda. Program je u potpunosti prilagođen specifičnim zahtjevima vašeg sporta, natjecateljskom ritmu i individualnim ciljevima.',
			'Kroz stručno vođene treninge razvijamo ključne motoričke sposobnosti, pravilne obrasce kretanja i stabilnost koja čini temelj svakog vrhunskog rezultata. Pratimo napredak, analiziramo performanse i prilagođavamo intenzitet kako biste bili u najboljoj formi onda kada je najvažnije.',
		],
	},
	{
		title: 'Aq8 EMS sistem treninga',
		image: '',
		text: [
			'AQ8 EMS predstavlja najnapredniji oblik elektrostimulacijskog treninga, osmišljen za maksimalne rezultate u minimalnom vremenu. U samo 20 minuta aktivira se preko 90% mišićnih vlakana, čime se postiže intenzitet usporediv s višesatnim klasičnim treningom.',
			'Ovaj sustav omogućuje istovremeni rad na svim mišićnim skupinama, uz kontrolirane električne impulse koji pojačavaju kontrakcije i čine trening učinkovitijim, sigurnijim i savršeno prilagođenim vašim ciljevima.',
		],
	},
	{
		title: 'Bodyspace sistem treninga',
		image: '',
		text: [
			'Kombinira vakuum tehnologiju i infracrveno grijanje kako bi potaknuo ubrzano topljenje masnih naslaga, oblikovanje tijela i poboljšanje cirkulacije. Idealno za ubrzavanje metabolizma, smanjenje celulita i vidljive rezultate u kraćem vremenu.',
		],
	},
];

const beautyCards = [
	{
		title: 'GFB Masaža by Elma',
		image: '',
		text: [
			'Naša Elma razvila je posebnu tehniku masaže namijenjenu profesionalnim i rekreativnim sportašima.',
			'Ovo nije klasična masaža — riječ je o ciljanoj, funkcionalnoj terapiji koja opušta napete mišiće, vraća pokretljivost i ubrzava oporavak nakon treninga.',
			'Idealna je za sve koji žele snažniji pristup, brže rezultate i stvarno olakšanje.',
		],
	},
	{
		title: 'Maderoterapija',
		image: '',
		text: [
			'Maderoterapija je prirodna tehnika oblikovanja tijela koja drvenim valjcima potiče cirkulaciju, limfnu drenažu i smanjenje celulita. Rezultat je zategnutija, glađa i oblikovanija figura.',
			'Idealna je za poboljšanje tonusa kože, eliminaciju toksina i vidljivo smanjenje celulita — uz ugodan osjećaj opuštanja.',
		],
	},
	{
		title: 'Linfomodeling',
		image: '/images/linfomodeling.png',
		text: [
			'Linfomodeling je napredna tehnika limfne drenaže i oblikovanja tijela koja kombinira precizne, ritmične pokrete za poticanje cirkulacije i eliminaciju toksina. Tretman smanjuje otekline, zadržavanje vode i celulit, dok istovremeno definira linije tijela.',
			'Rezultat je laganije tijelo, vidljivo bolja tekstura kože i osjećaj potpune lakoće i detoksa',
		],
	},
	{
		title: 'Hydrafacial',
		image: '',
		text: [
			'Hydrafacial je luksuzni nekirurški tretman koji dubinski čisti, exfolira i hidratizira kožu u samo jednom postupku. Uz pomoć vakuumske tehnologije uklanja nečistoće i mrtve stanice, dok istovremeno infundira kožu visokokvalitetnim serumima.',
			'Rezultat je trenutno svježija, blistava i dubinski hidratizirana koža, bez iritacija i bez vremena oporavka. Idealan za sve tipove kože.',
		],
	},
	{
		title: 'Tesla',
		image: '/images/tesla.png',
		text: [
			'Funkcionira tako da elektromagnetsko polje prolazi krozcijelu kožu i masnoću područja koje se tretira, da bi se učinkovito stimulirali mišići pružajući najintenzivnije kontinuirane kontrakcije, što je idealno za rast mišića, ali i umiranje masnih stanica.',
			'Tretman je ugodan i nema nelagode. Traje 30 minuta i ne zahtijeva oporavak, a dvado tri tretmana tjedno trebaju biti dovoljna da većinaljudi postigne sjajan rezultat. Obično se preporučuješest tretmana uslijed kojih se već vide promjene naizgledu mišića.',
		],
	},
	{
		title: 'Radiofrekvencija',
		image: '',
		text: [
			'Radiofrekvencija je neinvazivni tretman koji zagrijavanjem dubljih slojeva kože potiče stvaranje kolagena, zateže kožu i smanjuje vidljivost bora. Poboljšava tonus, elastičnost i teksturu kože, uz trenutni “lifting” efekt.',
			'Rezultat je čvršća, zaglađenija i pomlađena koža — bez boli i bez vremena oporavka.',
		],
	},
];

const generalCards = [
	{
		title: 'Vodena oaza',
		image: '/images/bazen.png',
		text: [
			'Naša Vodena oaza idealno je mjesto za opuštanje i lagano vježbanje u vodi. Bazen pruža savršenu kombinaciju relaksacije, rasterećenja mišića i nježnog pokreta koji obnavlja tijelo i um.',
		],
	},
	{
		title: 'Teretana',
		image: '',
		text: [
			'Naša teretana opremljena je modernim spravama i slobodnim utezima, idealna za snagu, kondiciju i funkcionalni trening. Prostor je prilagođen početnicima i naprednima, uz fokus na kvalitetan trening u ugodnom, motivirajućem okruženju.',
		],
	},
];

const allCards = [...treninziCards, ...beautyCards, ...generalCards];

const Services = () => {
	const wheelRef = React.useRef<HTMLDivElement>(null);
	const contentRef = React.useRef<HTMLDivElement>(null);
	const draggableWheelRef = React.useRef<HTMLDivElement>(null);
	const smallImagesRef = React.useRef<HTMLDivElement>(null);

	const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
	const smallCardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
	const titleRef = React.useRef<HTMLDivElement>(null);
	const textRef = React.useRef<HTMLDivElement>(null);

	const [activeCardIndex, setActiveCardIndex] = React.useState<number>(0);
	const [prevCardIndex, setPrevCardIndex] = React.useState<number>(0);

	const [direction, setDirection] = React.useState<'next' | 'prev'>('next');

	const tl = React.useRef<gsap.core.Timeline | null>(null);

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
		if (!wheelRef.current || !smallImagesRef.current) return;

		CustomEase.create(
			'hop',
			'M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1',
		);

		const cards = wheelRef.current.querySelectorAll('.card');
		const smallCards = smallImagesRef.current.querySelectorAll('.card');

		const splitInstances: SplitText[] = [];
		const isMobile = window.innerWidth < 768;
		const ease = isMobile ? 'power2.inOut' : 'hop';
		const duration = isMobile ? 1 : 1.5;
		const offset = isMobile ? 150 : 500;

		// Animate desktop cards
		cards.forEach((card, index) => {
			if (index === activeCardIndex) {
				// Animate in the new active card with clip path reveal
				const textParagraphs = textRef.current?.querySelectorAll('p');
				const splitTexts: SplitText[] = [];

				textParagraphs?.forEach((p) => {
					const split = new SplitText(p, {
						type: 'words,chars',
						mask: 'words',
					});
					splitTexts.push(split);
					splitInstances.push(split);
				});

				const splitTitle = new SplitText(titleRef.current, {
					type: 'words,chars',
					mask: 'words',
				});

				splitInstances.push(splitTitle);
				gsap.set(card, { zIndex: 2, visibility: 'visible' });
				gsap.set(splitTitle.chars, { opacity: 0, yPercent: 100 });
				splitTexts.forEach((split) => {
					gsap.set(split.words, { opacity: 0, yPercent: 100 });
				});

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
						},
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
					},
				);

				splitTexts.forEach((split, idx) => {
					gsap.fromTo(
						split.words,
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
							delay: 0.4 + idx * 0.1,
						},
					);
				});
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
					},
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

				gsap.to(card, {
					clipPath:
						direction === 'next'
							? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
							: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
					duration: duration,
					ease: ease,
					onStart: () => {
						gsap.set(card, {
							zIndex: 1,
							visibility: 'visible',
						});
					},
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

		// Animate small images (mobile view)
		smallCards.forEach((smallCard, index) => {
			if (index === activeCardIndex) {
				gsap.set(smallCard, { zIndex: 2, visibility: 'visible' });

				const smallCardImage = smallCard.querySelector('img');
				if (smallCardImage) {
					gsap.fromTo(
						smallCardImage,
						{
							x: direction === 'next' ? 50 : -50,
						},
						{
							x: 0,
							duration: duration,
							ease: ease,
						},
					);
				}

				gsap.fromTo(
					smallCard,
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
					},
				);
			} else if (index === prevCardIndex) {
				const smallCardImage = smallCard.querySelector('img');
				if (smallCardImage) {
					gsap.to(smallCardImage, {
						x: direction === 'next' ? -50 : 50,
						duration: duration,
						ease: ease,
					});
				}

				gsap.to(smallCard, {
					clipPath:
						direction === 'next'
							? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
							: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
					duration: duration,
					ease: ease,
					onStart: () => {
						gsap.set(smallCard, {
							zIndex: 1,
							visibility: 'visible',
						});
					},
				});
			} else {
				gsap.set(smallCard, {
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

	useGSAP(() => {
		if (!contentRef.current || !wheelRef.current) return;
		tl.current = gsap.timeline({
			scrollTrigger: {
				trigger: contentRef.current,
				start: 'top 80%',
				toggleActions: 'play none none reverse',
			},
		});

		tl.current
			.fromTo(
				contentRef.current,
				{ y: 100, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.75, ease: 'power2' },
			)
			.fromTo(
				wheelRef.current,
				{ y: 100, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.75, ease: 'power2' },
				'-=0.5',
			);

		return () => {
			tl.current?.kill();
		};
	});

	return (
		<>
			<div
				ref={draggableWheelRef}
				className='w-full min-h-vh bg-(--black) slider relative grid grid-cols-12 overflow-hidden py-8 lg:py-20 px-[5vw] gap-2 items-end justify-items-start align-content-center border-b border-(--gold)/20'>
				<GSAPSplitTextComponent
					ease={'power2'}
					start={'top 90%'}
					duration={1}
					className='col-span-12'>
					<h2
						className='text-5xl xl:text-[3vw] tracking-tight leading-snug mb-2 max-h-max text-[#b59c6c] max-w-2xl row-start-1'
						style={{ fontFamily: 'Anton, sans-serif' }}>
						GrandFit&Beauty usluge
					</h2>
				</GSAPSplitTextComponent>
				<p className='col-span-12 md:col-span-5 row-auto col-start-1 text-2xl xl:text-3xl tracking-tighter font-medium max-w-[35ch] max-h-max text-[#b59c6c] mb-4'>
					U{' '}
					<span className='font-semibold'>
						{' '}
						GrandFit<span style={{ fontFamily: 'Lora, serif' }}>&Beauty </span>
					</span>
					nudimo vam širok spektar usluga i tretmana koji će vam pomoći da
					izgledate i osjećate se najbolje.
				</p>
				<p className='text-base md:text-xl col-span-12 col-start-1 tracking-tight leading-[1.45] max-w-[40ch] xl:max-w-[55ch] max-h-max text-[#b59c6c]'>
					Naše osoblje posjeduje savremena znanja i iskustva iz ovih oblasti, te
					vam garantujemo najviši nivo usluge i profesionalnosti.
				</p>
				<p className='col-span-12 md:col-span-5 text-base md:text-xl tracking-tight leading-[1.45] max-w-[40ch] xl:max-w-[55ch] max-h-max text-[#b59c6c]'>
					Izaberite uslugu koja Vam najviše odgovara, a ostalo prepustite nama.
				</p>
				<div className='col-span-12 col-start-1 mt-4 lg:mt-16 flex flex-col md:flex-row bg-transparent w-full h-vh lg:h-[90vh] justify-between overflow-hidden relative'>
					<div
						ref={contentRef}
						className='flex flex-col justify-start gap-0 xl:gap-4 min-h-[450px] lg:min-h-[650px] w-full md:w-1/2 border border-[#b59c6c] border-dashed text-[#b59c6c] rounded-xl p-6 md:p-8 relative'>
						<div className='relative w-full h-24 flex justify-start mb-0 xl:mb-4'>
							<span
								className='hidden lg:flex text-sm md:text-xl absolute text-[#b59c6c]/50 z-20 top-0 left-28 lg:left-0'
								style={{ fontFamily: 'Anton, sans-serif' }}>
								{String(activeCardIndex + 1).padStart(2, '0')}/
								{String(allCards.length).padStart(2, '0')}
							</span>
							<div
								ref={smallImagesRef}
								className='small-images-wrapper relative flex w-16 h-16 rounded lg:hidden overflow-hidden'>
								{allCards.map((card, index) => (
									<div
										key={index}
										data-active={activeCardIndex === index}
										ref={(el) => {
											smallCardRefs.current[index] = el;
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
						<h3
							ref={titleRef}
							className='text-3xl md:text-6xl tracking-tight font-medium leading-tight'
							style={{ fontFamily: 'Anton, sans-serif' }}>
							{allCards[activeCardIndex].title}
						</h3>
						{/* More info card */}
						<div className='more-about-card w-full flex flex-col pb-2'>
							<div
								ref={textRef}
								className='text-sm md:text-xl text-left leading-[1.45] font-normal text-[#b59c6c] max-w-[50ch] mb-2'>
								{allCards[activeCardIndex].text.map((paragraph, idx) => (
									<p key={idx} className='text-[13px] md:text-base mt-1 '>
										{paragraph}
									</p>
								)) || 'Trenutno nema dodatnih informacija o ovoj usluzi.'}
							</div>
						</div>
						<div className='hidden card-content absolute z-20 col-start-1 w-36 md:w-68 lg:flex text-[#b59c6c] bottom-6 md:bottom-8 justify-between items-center'>
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
									className='aspect-square border border-[#b59c6c] group lg:hover:bg-[#b59c6c] transition-all duration-300 border-dashed flex items-center justify-center'>
									<ArrowLeft
										size={32}
										className='stroke-[#b59c6c] lg:group-hover:stroke-(--black)'
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
									className='aspect-square border group border-dashed lg:hover:bg-[#b59c6c] lg:hover:text-(--black) transition-all duration-300 border-[#b59c6c] flex items-center justify-center'>
									<ArrowRight
										size={32}
										className='stroke-[#b59c6c] lg:group-hover:stroke-[#0c0c0c] '
									/>
								</button>
							</div>
						</div>
					</div>
					<div
						ref={wheelRef}
						className='wheel hidden z-10 w-full md:w-1/2 h-1/2 md:h-full lg:flex items-center justify-between relative rounded-xl overflow-hidden'>
						<div className='images-wrapper relative w-full h-full overflow-hidden'>
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
				<div className='card-content z-20 col-start-1 w-36 md:w-68 lg:hidden text-[#b59c6c] bottom-6 md:bottom-8 justify-between items-center'>
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
										(activeCardIndex - 1 + allCards.length) % allCards.length
									);
								});
							}}
							className='aspect-square border border-[#b59c6c] group lg:hover:bg-[#b59c6c] transition-all duration-300 border-dashed flex items-center justify-center'>
							<ArrowLeft
								size={32}
								className='stroke-[#b59c6c] lg:group-hover:stroke-(--black)'
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
										(activeCardIndex + 1 + allCards.length) % allCards.length
									);
								});
							}}
							className='aspect-square border group border-dashed lg:hover:bg-[#b59c6c] lg:hover:text-(--black) transition-all duration-300 border-[#b59c6c] flex items-center justify-center'>
							<ArrowRight
								size={32}
								className='stroke-[#b59c6c] lg:group-hover:stroke-[#0c0c0c] '
							/>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Services;
