'use client';
import React from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';
import FadeIn from '../FadeIn/FadeIn';

type Props = {};

const Coach = (props: Props) => {
	const coachRef = React.useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!coachRef.current) return;
		gsap.fromTo(
			coachRef.current,
			{ backgroundPosition: '50% 0%' },
			{
				backgroundPosition: '50% 100%',
				ease: 'none',
				scrollTrigger: {
					trigger: coachRef.current,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
					invalidateOnRefresh: true,
				},
			}
		);
	});
	return (
		<div
			ref={coachRef}
			className='after:content-[""] after:block after:w-full after:h-full after:bg-green-500 after:absolute after:top-0 after:left-0 after:z-10 after:opacity-10 after:mix-blend-difference relative z-10 w-full min-h-screen xl:min-h-[130svh] bg-[url(/images/elvis.webp)] bg-size-[380%] xl:bg-size-[130%] bg-no-repeat bg-center content-end text-4xl font-bold text-white grid grid-cols-[5vw_repeat(12,1fr)_5vw] pb-8'>
			{' '}
			<GSAPSplitTextComponent
				className='col-start-2 col-end-13 mb-4 relative z-20'
				ease={'power2'}
				start='top 80%'>
				<h2
					style={{ fontFamily: 'Anton, sans-serif' }}
					className='text-4xl md:text-[4.5vw] text-white/30 flex shrink-0 tracking-tight leading-[1.3] font-bold uppercase relative z-10'>
					Vaš osobni trener
				</h2>
			</GSAPSplitTextComponent>
			<GSAPSplitTextComponent
				className='col-start-2 col-end-13 mb-4 relative z-20'
				ease={'power2'}
				start='top 80%'
				delay={0.1}>
				<span className='flex justify-start text-right relative z-20'>
					Elvis Agović
				</span>
			</GSAPSplitTextComponent>
			<div className='col-start-2 col-end-13 flex relative z-20 text-sm font-normal tracking-normal w-full'>
				<FadeIn
					duration={0.5}
					stagger={0.05}
					className='flex w-full gap-2 md:h-48 flex-wrap md:flex-row h-auto'>
					<div className='flex shrink-0 items-center w-32 md:w-48 p-4 border border-white aspect-square rounded-lg'>
						<p>Kondicijski trener u VK Jug</p>
					</div>
					<div className='flex shrink-0 items-center w-32 md:w-48 p-4 border border-white aspect-square rounded-lg'>
						<p>Fitness trener u GrandFit&Beauty</p>
					</div>
					<div className='flex shrink-0 items-center w-32 md:w-48 p-4 border border-white aspect-square rounded-lg'>
						<p>Certificirani trener za sustav treninga Aq8 EMS </p>
					</div>
				</FadeIn>
			</div>
			<div className=' col-start-2 col-end-13 relative z-20 flex mt-8'>
				<GSAPSplitTextComponent ease={'power2'} start='top 90%' delay={0.25}>
					<p
						className='text-xl md:text-3xl font-semibold tracking-tighter text-left md:text-right'
						style={{ fontFamily: 'Lora, serif' }}>
						Ne odustaj od sebe. Sjeti se zašto si krenuo.
					</p>
				</GSAPSplitTextComponent>
			</div>
		</div>
	);
};

export default Coach;
