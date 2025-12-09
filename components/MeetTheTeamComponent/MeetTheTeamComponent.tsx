'use client';
import Image from 'next/image';
import React from 'react';

import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import Link from 'next/link';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';

const teamMembers = [
	{
		id: 1,
		name: 'Elma Agović',
		role: 'Suvlasnica GF&B i Wellness stručnjakinja',
		image: '/images/elma.webp',
	},
	{
		id: 2,
		name: 'Elvis Agović',
		role: 'Suvlasnik GF&B i glavni fitness trener',
		image: '/images/elvis.webp',
	},
	{
		id: 3,
		name: 'Uroš',
		role: 'Trener u GF&B',
		image: '/images/uros.webp',
	},
	{
		id: 4,
		name: 'Dado',
		role: 'Trener u GF&B',
		image: '/images/dado.webp',
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
	useGSAP(() => {
		if (typeof window === 'undefined') return;
		const images = document.querySelectorAll('.clip-image');

		const coverImages = gsap.utils.toArray<HTMLElement>('.clip-cover');

		if (images.length === 0 || coverImages.length === 0) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.team-members',
				start: 'top 80%',
				toggleActions: 'play none none reverse',
			},
		});

		gsap.set(images, {
			rotation: 15,
			transformOrigin: 'center center',
			xPercent: 110,
		});
		const tween = gsap.fromTo(
			coverImages,
			{
				xPercent: 110,
				rotation: 15,
				opacity: 0,
			},
			{
				rotation: 0,
				xPercent: 0,
				opacity: 1,
				duration: 1.25,
				ease: 'power2',
				scrollTrigger: {
					trigger: '.team-wrapper',
					start: 'top 80%',
					toggleActions: 'play none none reverse',
				},
			}
		);

		tl.to(images, {
			rotation: 0,
			xPercent: 0,
			duration: 0.75,
			ease: 'power2',
			stagger: 0.1,
		});

		return () => {
			tl.kill();
			tween.kill();
		};
	}, []);

	const slugifyName = (name: string) => {
		return name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
	};

	return (
		<div className='team-wrapper w-full flex flex-col gap-4 px-[5vw] min-h-svh lg:grid lg:grid-cols-[5vw_repeat(12,minmax(0,1fr))_5vw] lg:grid-rows-4 xl:grid-rows-2 content-start justify-start items-start bg-(--black) text-gray-200 border-b border-(--gold)/20 lg:px-0 py-16 overflow-hidden'>
			<div className='flex flex-col justify-center gap-8 col-start-2 col-end-14 md:col-start-2 md:col-end-8 row-start-1 h-auto md:h-full row-end-2'>
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
					<p className='max-w-lg text-base font-light'>
						Grand Fit&Beauty nastao je iz jedne priče o ljubavi, strasti prema
						poslu i zajedničkom snu. Elma i Elvis upoznali su se radeći rame uz
						rame — ona kao stručnjakinja u wellnessu, a on kao trener u
						hotelskoj wellness zoni. Od prvog dana, povezala ih je ista
						energija, ista vizija i isti osjećaj da zajedno mogu više.
					</p>
					<p className='max-w-lg mt-4 text-base font-light'>
						Radili su predano, učili jedno od drugoga i otkrili da najbolje
						rezultate postižu upravo kada su zajedno. Upravo ta snaga
						partnerstva, ali i ljubavi, bila je motivacija da naprave hrabar
						korak i otvore svoj centar, mjesto koje će nositi njihov potpis,
						njihovu filozofiju i njihovu strast.
					</p>
					<p className='max-w-lg mt-4 text-base font-light'>
						Tako je nastao Grand Fit & Beauty: prostor u kojem se isprepliću
						profesionalnost, toplina i posvećenost svakom gostu. Danas, Elma i
						Elvis vode centar s istim žarom s kojim su se i upoznali, vjerujući
						da se najbolji uspjesi rađaju iz ljubavi, zajedništva i srca koje
						uvijek ide naprijed.
					</p>
				</div>
			</div>
			<div className='relative col-start-2 md:col-start-8 col-end-14 w-full h-96 row-span-full md:h-full row-start-2 row-end-4 md:row-start-1 md:row-end-3 mt-4 md:mt-0 overflow-hidden rounded-xl'>
				<Image
					fill
					alt='Elma i Elvis'
					src='/images/elvis_elma.webp'
					className='object-cover object-top clip-cover rounded-xl'
				/>
			</div>

			<div className='team-members col-start-2 col-end-14 row-start-4 md:row-start-4 row-end-5 md:row-end-4 flex flex-col w-full gap-8 mt-16'>
				<h3
					className='text-5xl tracking-tight w-full uppercase text-[#9d9d9d]'
					style={{ fontFamily: 'Anton, sans-serif' }}>
					GFB Tim
				</h3>
				<div className='flex gap-4 w-full flex-wrap md:flex-nowrap'>
					{teamMembers.map((member) => (
						<Link
							href={`/nas-tim/${slugifyName(member.name)}`}
							key={member.id}
							className='flex flex-col items-between min-w-[150px] max-w-[calc(50%-1rem)] md:max-w-none flex-1 rounded-xl overflow-hidden'>
							<div className='relative w-full h-40 md:h-96 overflow-hidden'>
								<Image
									fill
									alt={member.name}
									src={member.image || '/images/elvis.webp'}
									className='object-cover clip-image object-top rounded-xl grayscale-100'
								/>
							</div>
							<div className='flex flex-col gap-1 px-4'>
								<h3 className='mt-4 text-3xl text-center lg:text-left text-[#9d9d9d]'>
									{member.name}
								</h3>
								<p className='text-xs font-normal text-center lg:text-left w-full text-balance text-[#9d9d9d]'>
									{member.role}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default MeetTheTeamComponent;
