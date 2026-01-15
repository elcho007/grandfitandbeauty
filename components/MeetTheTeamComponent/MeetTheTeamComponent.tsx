'use client';
import Image from 'next/image';
import React from 'react';

import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import Link from 'next/link';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';
import { FolderClosedIcon, X } from 'lucide-react';

const teamMembers = [
	{
		id: 1,
		name: 'Elma Agović',
		role: 'Suvlasnica GF&B i Wellness stručnjakinja',
		image: '/images/elma.webp',
		bio: [
			'Elma je stručnjakinja u wellness području s dugogodišnjim iskustvom u radu sa klijentima. Njena strast je pomoći svakom pojedincu da postigne najbolju verziju sebe.',
			'Specijalizirana je za personalizirane wellness programe koji kombinuju nutrition, trening i mentalno zdravlje.',
		],
	},
	{
		id: 2,
		name: 'Elvis Agović',
		role: 'Suvlasnik GF&B i glavni fitness trener',
		image: '/images/elvis.webp',
		bio: [
			'Elvis je certificirani fitness trener sa strašću prema transformaciji života kroz fizičku aktivnost. Njegov pristup je holistički, fokusirajući se na dugoročne rezultate.',
			'Specijaliziran je za strength training, bodybuilding i funkcionalni trening. Njegov cilj je inspirisati i motivirati svaki dan.',
		],
	},
	{
		id: 3,
		name: 'Uroš',
		role: 'Trener u GF&B',
		image: '/images/uros.webp',
		bio: [
			'Uroš je mladi i energični trener koji donosi svježinu i inovativnost u GFB tim. Njegov entuzijazam je zarazan i motiviše klijente da daju maksimum.',
			'Fokusiran je na funkcionalni trening i rad sa mladim sportistima koji žele poboljšati svoje performanse.',
		],
	},
	{
		id: 4,
		name: 'Dado',
		role: 'Trener u GF&B',
		image: '/images/dado.webp',
		bio: [
			'Dado je iskusni trener koji kombinuje tradicionalne metode sa modernim pristupima. Njegova posvećenost klijentima je nepokolebljiva.',
			'Specijaliziran je za rehabilitaciju, rad sa starijim klijentima i postizanje dugoročnih zdravstvenih ciljeva.',
		],
	},
];

const clipPathsCoordinates = [
	'polygon(100% 100%, 100% 0%, 100% 100%, 0% 100%)',
	'polygon(0% 0%, 0% 100%, 100% 100%, 0% 100%)',
	'polygon(0% 0%, 100% 0%, 100% 100%, 100% 0%)',
	'polygon(0% 0%, 100% 0%, 0% 0%, 0% 100%)',
];

type Props = {};

const MeetTheTeamComponent = (props: Props) => {
	const ownersBannerRef = React.useRef<HTMLDivElement>(null);
	const modalRef = React.useRef<HTMLDivElement>(null);
	const modalImageRef = React.useRef<HTMLImageElement>(null);
	const closeButtonRef = React.useRef<HTMLButtonElement>(null);
	const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
	const [selectedMember, setSelectedMember] = React.useState<
		(typeof teamMembers)[0] | null
	>(null);
	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);
		if (typeof window === 'undefined') return;
		const images = document.querySelectorAll('.clip-image');

		if (images.length === 0) return;

		gsap.fromTo(
			ownersBannerRef.current,
			{
				y: 75,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.75,
				ease: 'power2',
				scrollTrigger: {
					trigger: ownersBannerRef.current,
					start: 'top 90%',
					toggleActions: 'play none none reverse',
				},
			}
		);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.team-members',
				start: 'top 90%',
				toggleActions: 'play none none reverse',
			},
		});

		gsap.set(images, {
			rotation: 15,
			transformOrigin: 'center center',
			xPercent: 110,
		});

		tl.to(images, {
			rotation: 0,
			xPercent: 0,
			duration: 0.75,
			ease: 'power2',
			stagger: 0.1,
		});

		return () => {
			tl.kill();
		};
	}, []);

	// Handle escape key press to close modal
	React.useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && selectedMember) {
				handleCloseModal();
			}
		};

		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, [selectedMember]);

	const slugifyName = (name: string) => {
		return (
			name
				.toLowerCase()
				// remove bosnian diacritics BEFORE removing non-alphanumeric chars
				.replace(/č/g, 'c')
				.replace(/ć/g, 'c')
				.replace(/đ/g, 'd')
				.replace(/š/g, 's')
				.replace(/ž/g, 'z')
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-+|-+$/g, '')
		);
	};

	const handleOpenModal = (memberId: number) => {
		const member = teamMembers.find((m) => m.id === memberId);
		if (!member) return;

		// Clear any pending timeout from previous close action
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}

		// Set the selected member state
		setSelectedMember(member);

		// Prevent scrolling on body
		document.body.style.overflow = 'hidden';

		// translate modal into view from right hand side
		if (modalRef.current) {
			modalRef.current.style.transform = 'translateX(-100%)';
		}

		// Focus close button after modal animation
		setTimeout(() => {
			closeButtonRef.current?.focus();
		}, 1000);
	};

	const handleCloseModal = () => {
		if (!modalRef.current) return;
		// translate modal out of view to right hand side
		modalRef.current.style.transform = 'translateX(100%)';
		// Re-enable scrolling on body
		document.body.style.overflow = '';
		// Clear selected member after animation and store timeout ID
		closeTimeoutRef.current = setTimeout(() => {
			setSelectedMember(null);
			closeTimeoutRef.current = null;
		}, 1000);
	};

	return (
		<div className='team-wrapper relative w-full flex flex-col gap-4 px-[5vw] min-h-svh lg:grid lg:grid-cols-[5vw_repeat(12,minmax(0,1fr))_5vw] lg:grid-rows-3 xl:grid-rows-2 grid-rows-[repeat(3,50vh)] justify-center bg-(--black) text-gray-200 border-b border-(--gold)/20 lg:px-0 pt-16 overflow-hidden items-center pb-10'>
			<div className='col-start-2 col-end-14 flex flex-col lg:flex-row'>
				<div className='flex flex-col justify-center gap-8 min-h-svh md:h-svh border border-dashed w-full lg:w-1/2 border-gray-200 p-6 rounded-xl'>
					<div className='flex'>
						<GSAPSplitTextComponent
							direction='up'
							duration={0.75}
							ease={'power2'}
							start='top 90%'>
							<h2
								className='text-3xl xl:text-[3vw] tracking-tight text-[#9d9d9d] max-w-2xl '
								style={{ fontFamily: 'Anton, sans-serif' }}>
								Upoznajte Elmu i Elvisa, vlasnike Grand Fit&Beauty
							</h2>
						</GSAPSplitTextComponent>
					</div>
					<div className='flex flex-col'>
						<p className='max-w-lg text-sm lg:text-base font-light'>
							Grand Fit&Beauty nastao je iz jedne priče o ljubavi, strasti prema
							poslu i zajedničkom snu. Elma i Elvis upoznali su se radeći rame
							uz rame — ona kao stručnjakinja u wellnessu, a on kao trener u
							hotelskoj wellness zoni. Od prvog dana, povezala ih je ista
							energija, ista vizija i isti osjećaj da zajedno mogu više.
						</p>
						<p className='max-w-lg mt-4 text-sm lg:text-base font-light'>
							Radili su predano, učili jedno od drugoga i otkrili da najbolje
							rezultate postižu upravo kada su zajedno. Upravo ta snaga
							partnerstva, ali i ljubavi, bila je motivacija da naprave hrabar
							korak i otvore svoj centar, mjesto koje će nositi njihov potpis,
							njihovu filozofiju i njihovu strast.
						</p>
						<p className='max-w-lg mt-4 text-sm lg:text-base font-light'>
							Tako je nastao Grand Fit & Beauty: prostor u kojem se isprepliću
							profesionalnost, toplina i posvećenost svakom gostu. Danas, Elma i
							Elvis vode centar s istim žarom s kojim su se i upoznali,
							vjerujući da se najbolji uspjesi rađaju iz ljubavi, zajedništva i
							srca koje uvijek ide naprijed.
						</p>
					</div>
				</div>
				<div
					ref={ownersBannerRef}
					className='relative w-full lg:w-1/2 h-svh overflow-hidden rounded-lg group'>
					<Image
						fill
						alt='Elma i Elvis'
						src='/images/elvis_elma.webp'
						className='object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-500 ease-in-out'
					/>
				</div>
			</div>

			<div className='team-members min-h-[35vh] col-start-2 col-end-14 row-start-4 md:row-start-2 row-end-5 md:row-end-3 flex flex-col w-full gap-4'>
				<h3
					className='text-5xl tracking-tight w-full uppercase text-[#9d9d9d]'
					style={{ fontFamily: 'Anton, sans-serif' }}>
					GFB Tim
				</h3>
				<div className='flex gap-2 gap-y-8 w-full flex-wrap md:flex-nowrap'>
					{teamMembers.map((member) => (
						<button
							key={member.id}
							onClick={() => handleOpenModal(member.id)}
							className='group flex flex-col items-between min-w-[150px] max-w-[calc(50%-1rem)] md:max-w-none flex-1 rounded-lg overflow-hidden'>
							<div className='relative w-full h-40 md:h-96 overflow-hidden'>
								<Image
									fill
									alt={member.name}
									src={member.image || '/images/elvis.webp'}
									className='object-cover clip-image object-top rounded-lg grayscale-100 group-hover:grayscale-0'
								/>
							</div>
							<div className='flex flex-col gap-1 px-4'>
								<h3 className='mt-4 text-3xl text-center lg:text-left text-[#9d9d9d]'>
									{member.name}
								</h3>
								<p className='text-xs xl:text-sm font-normal text-center lg:text-left w-full text-balance text-[#9d9d9d]'>
									{member.role}
								</p>
							</div>
						</button>
					))}
				</div>
			</div>

			<div
				ref={modalRef}
				className='team-modal fixed top-0 right-0 transform transition duration-1000 ease-out translate-x-full w-full h-full overscroll-y-auto bg-(--black) z-20 flex items-center'>
				{/* Modal content goes here */}
				{selectedMember && (
					<div className='max-w-full w-full xl:w-6xl mx-auto flex flex-col xl:flex-row justify-start gap-6 xl:gap-0 overflow-y-auto xl:justify-between h-svh pt-20 xl:pt-20'>
						<button
							ref={closeButtonRef}
							onClick={handleCloseModal}
							className='absolute top-10 xl:top-20 right-4 xl:right-60 text-(--black) text-2xl p-2 h-8 w-8 xl:w-16 xl:h-16 flex items-center justify-center rounded-full bg-(--gold) z-20'>
							<X />
						</button>
						{/* Team member details */}
						<div className='relative w-full px-4 xl:px-0 xl:w-1/2 shrink-0 xl:h-full flex flex-col gap-4'>
							{/* profile image */}
							<div className='relative w-full xl:w-100 h-80 xl:h-140 rounded overflow-hidden'>
								<Image
									src={selectedMember.image}
									alt={selectedMember.name}
									fill
									className='object-cover object-top'
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<h3 className='mt-4 text-3xl lg:text-left text-(--gold)'>
									{selectedMember.name}
								</h3>
								<p className='text-sm font-normal lg:text-left w-full text-balance text-[#9d9d9d]'>
									{selectedMember.role}
								</p>
							</div>
						</div>
						<div className='flex w-full px-4 xl:px-0 xl:w-1/2 flex-col gap-4 pb-6 xl:pb-0'>
							{/* bio */}
							{selectedMember.bio.map((paragraph, index) => (
								<p key={index} className='max-w-sm'>
									{paragraph}
								</p>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MeetTheTeamComponent;
