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
			className='after:content-[""] after:block after:w-full after:h-full after:bg-(--gold) after:absolute after:top-0 after:left-0 after:z-10 after:opacity-30 after:mix-blend-overlay relative z-10 w-full min-h-screen xl:min-h-[130svh] bg-[url(/images/elvis.webp)] bg-size-[380%] xl:bg-size-[130%] bg-no-repeat bg-center content-end text-4xl font-bold grid grid-cols-[5vw_repeat(12,1fr)_5vw] pb-8'>
			<div className=' z-20 flex absolute top-8 left-0 w-full h-20 items-center px-[5vw]'>
				<GSAPSplitTextComponent ease={'power2'} start='top 90%' delay={0.25}>
					<p
						className='text-xl md:text-3xl font-normal tracking-tighter text-left text-white max-w-md leading-[1.3]'
						style={{ fontFamily: 'Lora, serif' }}>
						Ne odustaj od sebe. <br />
						Sjeti se zašto si krenuo.
					</p>
				</GSAPSplitTextComponent>
			</div>
			<GSAPSplitTextComponent
				className='col-start-2 col-end-13 relative z-20'
				ease={'power2'}
				start='top 90%'>
				<h2
					style={{ fontFamily: 'Anton, sans-serif' }}
					className='text-xl md:text-[1.5vw] text-(--white) flex shrink-0 tracking-[0.01em] leading-[1.3] font-bold uppercase relative z-10'>
					Vaš osobni trener
				</h2>
			</GSAPSplitTextComponent>

			<GSAPSplitTextComponent
				className='col-start-2 col-end-14 mb-4 relative z-20'
				ease={'power2'}
				duration={0.75}
				start='top 90%'
				delay={0.1}>
				<span
					style={{ fontFamily: 'Anton, sans-serif' }}
					className='flex justify-start relative z-20 text-7xl md:text-[4.5vw] w-full leading-[1.3] text-(--white) font-bold uppercase'>
					Elvis Agović
				</span>
			</GSAPSplitTextComponent>
			<div className='col-start-2 col-end-14 flex relative z-20 text-sm font-normal tracking-normal w-full'>
				<FadeIn
					duration={0.5}
					stagger={0.05}
					start='top bottom'
					className='flex w-full gap-2 md:h-48 flex-col max-h-max'>
					<div className='flex shrink-0 items-center max-w-max h-max px-3 py-1.5 bg-(--black) text-(--gold)'>
						<p>Kondicijski trener u VK Jug</p>
					</div>
					<div className='flex shrink-0 items-center max-w-max h-max px-3 py-1.5 bg-(--black) text-(--gold)'>
						<p>Fitness trener u GrandFit&Beauty</p>
					</div>
					<div className='flex shrink-0 items-center max-w-max h-max px-3 py-1.5 bg-(--black) text-(--gold)'>
						<p>Certificirani trener za sustav treninga Aq8 EMS </p>
					</div>
				</FadeIn>
			</div>
		</div>
	);
};

export default Coach;
