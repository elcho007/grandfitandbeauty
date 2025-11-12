'use client';
import React from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';

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
			className='after after-content-[""] after:block after:w-full after:h-full after:bg-black after:absolute after:top-0 after:left-0 after:z-0 after:opacity-40 relative z-10 w-full min-h-[130svh] bg-[url(/images/coach.webp)] bg-size-[130%] bg-center content-end text-4xl font-bold text-white grid grid-cols-[5vw_repeat(12,1fr)_5vw] gap-4 pb-16'>
			<h2
				style={{ fontFamily: 'Anton, sans-serif' }}
				className='text-[11.35vw] text-white/30 flex shrink-0 tracking-tight font-bold uppercase col-start-2 col-end-13 relative z-10'>
				Vaš osobni trener
			</h2>
			<span className='col-start-2 col-end-13 flex justify-start text-right relative z-10'>
				Elvis Agović
			</span>

			<div className='col-start-2 col-end-13 flex gap-4 relative z-10 text-lg font-normal tracking-normal w-full'>
				<div className='flex items-center w-72 p-2 aspect-square border border-white max-w-[15ch]'>
					Kondicijski trener u VK Jug
				</div>
				<div className='flex items-center w-64 p-2 aspect-square border border-white max-w-[15ch]'>
					Fitness trener u GrandFit&Beauty
				</div>
				<div className='flex items-center w-64 p-2 aspect-square border border-white max-w-[15ch]'>
					Certificirani trener za sustav treninga Aq8 EMS{' '}
				</div>
			</div>

			<div className=' col-start-2 col-end-13 relative z-10 flex'>
				<p
					className='text-3xl font-light text-right'
					style={{ fontFamily: 'Lora, serif' }}>
					Ne odustaj od sebe. Sjeti se zašto si krenuo.
				</p>
			</div>
		</div>
	);
};

export default Coach;
