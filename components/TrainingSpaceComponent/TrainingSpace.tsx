'use client';
import Image from 'next/image';
import React from 'react';

import { gsap, useGSAP, ScrollTrigger } from '../../lib/gsap';

type Props = {};

const trainingChips = [
	'Personal Training Area',
	'Group Class Studio',
	'Functional Training Zone',
	'Cardio Theater',
	'Strength Training Section',
	'Recovery Lounge',
	'Outdoor Training Space',
];

const TrainingSpace = (props: Props) => {
	const trainingSpaceRef = React.useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!trainingSpaceRef.current) return;

		gsap.set(trainingSpaceRef.current, {
			perspective: 1000,
			transformOrigin: 'bottom center',
		});

		gsap.fromTo(
			trainingSpaceRef.current,
			{
				scale: 0.6,
				autoAlpha: 0,
			},
			{
				scale: 1,
				autoAlpha: 1,
				duration: 0.75,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: trainingSpaceRef.current,
					start: 'top bottom',
					toggleActions: 'play none none reverse',
					invalidateOnRefresh: true,
				},
			}
		);
	});

	return (
		<div className='w-full h-dvh bg-(--gold) px-4 xl:px-20 pb-10 flex items-center relative overflow-hidden'>
			<div
				ref={trainingSpaceRef}
				className='relative w-full mx-auto h-full rounded-lg overflow-hidden before:absolute before:inset-0 before:bg-linear-to-t before:from-black/80 before:via-black/20 before:to-black/0 before:z-5'>
				<Image
					src='/images/story3.jpg'
					fill
					alt='banner image'
					className='object-cover object-top'
				/>
			</div>

			<div className='absolute z-10 text-white w-[calc(100%-32px)] xl:w-[calc(100%-160px)] bottom-20 xl:bottom-30 '>
				<p className='text-lg xl:text-3xl flex xl:max-w-3xl mx-auto text-center mb-8 tracking-tighter text-balance font-normal'>
					Nudimo vam trening zonu u koju ćete željeti da se vraćate. Naš centar
					njeguje kulturu međusobnog poštovanja i podrške. Naši treneri vas
					prate na svakom koraku.
				</p>

				<div className='flex flex-wrap gap-1 xl:gap-4 w-full max-w-4xl mx-auto mt-8 justify-center '>
					{trainingChips.map((chip, index) => (
						<div
							key={index}
							className='bg-(--gold) max-w-max text-black shrink-0 px-4 py-2 rounded-full text-center text-xs md:text-base border hover:bg-(--black) hover:text-(--gold) transition-colors duration-300 cursor-pointer'>
							{chip}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TrainingSpace;
