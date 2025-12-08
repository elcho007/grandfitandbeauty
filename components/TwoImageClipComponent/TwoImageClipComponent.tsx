'use client';
import Image from 'next/image';
import React from 'react';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';
import GSAPClipPathImageRevealComponent from '../GSAPClipPathImageRevealComponent/GSAPClipPathImageRevealComponent';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { Scroll } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger, SplitText);

type Props = {};

const clipPathsCoordinates = [
	'polygon(100% 100%, 100% 0%, 100% 100%, 0% 100%)',
	'polygon(0% 0%, 0% 100%, 100% 100%, 0% 100%)',
	'polygon(0% 0%, 100% 0%, 100% 100%, 100% 0%)',
	'polygon(0% 0%, 100% 0%, 0% 0%, 0% 100%)',
];

const TwoImageClipComponent = (props: Props) => {
	useGSAP(() => {
		const sections = gsap.utils.toArray<HTMLElement>('.slideup-text');
		const clipCards = gsap.utils.toArray<HTMLElement>('.clip-card');
		if (sections.length === 0 || clipCards.length === 0) return;

		const mm = gsap.matchMedia();

		const cleanupFunctions: Array<() => void> = [];

		gsap.set(clipCards, {
			clipPath: (index) => clipPathsCoordinates[index],
		});

		clipCards.forEach((card, index) => {
			const clipPathAnimation = gsap.to(card, {
				clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
				ease: 'none',
				delay: index * 0.1,
				duration: 0.5,
				scrollTrigger: {
					trigger: card,
					start: 'top bottom',
				},
			});
			cleanupFunctions.push(() => {
				clipPathAnimation.kill();
			});
		});

		mm.add('(hover: hover) and (pointer: fine)', () => {
			sections.forEach((section) => {
				let parent = section.parentElement as HTMLElement;

				const split = new SplitText(section, {
					type: 'lines, words, chars',
					mask: 'lines',
					autoSplit: true,
					linesClass: 'lineChildren',
				});

				let timeline: gsap.core.Timeline | null = null;

				const animateIn = () => {
					if (timeline) {
						timeline.kill();
					}

					timeline = gsap.timeline();
					timeline.to(split.lines, {
						yPercent: 0,
						opacity: 1,
						stagger: 0.05,
						duration: 0.5,
						ease: 'power2',
					});
				};

				const animateOut = () => {
					if (timeline) {
						timeline.kill();
					}

					timeline = gsap.timeline({
						onComplete: () => {
							gsap.set(split.lines, { yPercent: 100, opacity: 0 });
						},
					});
					timeline.to(split.lines, {
						yPercent: 100,
						opacity: 0,
						stagger: 0.02,
						duration: 0.3,
						ease: 'power1.out',
					});
				};

				gsap.set(split.lines, { yPercent: 100, opacity: 0 });
				parent.addEventListener('mouseenter', animateIn);
				parent.addEventListener('mouseleave', animateOut);

				// Store cleanup function for this section
				cleanupFunctions.push(() => {
					if (timeline) {
						timeline.kill();
					}
					split.revert();
					parent.removeEventListener('mouseenter', animateIn);
					parent.removeEventListener('mouseleave', animateOut);
				});
			});
		});

		// Return a single cleanup function that runs all cleanups
		return () => {
			cleanupFunctions.forEach((cleanup) => cleanup());
			mm.revert();
		};
	});

	return (
		<div className='w-full h-[150vh]'>
			<div className='w-full h-full relative flex flex-col md:grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-2'>
				<div className='clip-card relative overflow-hidden h-full p-4 after:content-[""] after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-[#b39a67]/30 after:z-10 row-span-1'>
					<Image src='/images/gfb3.jpg' fill alt='' className='object-cover' />

					<div className='relative z-20 text-[#fa8603] w-full h-full flex items-center justify-center'>
						<p
							style={{ fontFamily: 'Anton, sans-serif' }}
							className='slideup-text text-2xl md:text-7xl uppercase leading-[1.3] text-center max-w-xs lg:max-w-md'>
							Tražite načine, ne isprike!
						</p>
					</div>
				</div>
				<div className='clip-card relative overflow-hidden h-full p-4 before:content-[""] before:absolute before:w-full before:z-10 before:h-full before:left-0 before:top-0 before:bg-[#b39a67]/30 row-span-1'>
					<Image src='/images/gfb4.jpg' fill alt='' className='object-cover' />

					<div className='relative z-20 text-[#fa8603] w-full h-full flex items-center justify-center'>
						<p
							style={{ fontFamily: 'Anton, sans-serif' }}
							className='slideup-text text-2xl md:text-7xl uppercase text-center leading-[1.3] max-w-xs lg:max-w-md'>
							Kada mislite da ne možete više, to je samo početak!
						</p>
					</div>
				</div>
				<div className='clip-card relative overflow-hidden h-full p-4 before:content-[""] before:absolute before:w-full before:z-10 before:h-full before:left-0 before:top-0 before:bg-[#b39a67]/30 row-span-1'>
					<Image src='/images/gfb1.jpg' fill alt='' className='object-cover' />

					<div className='relative z-20 text-[#fa8603] w-full h-full flex items-center justify-center'>
						<p
							style={{ fontFamily: 'Anton, sans-serif' }}
							className='slideup-text text-2xl md:text-7xl uppercase text-center leading-[1.3] max-w-xs lg:max-w-md'>
							Napredak, a ne savršenstvo!
						</p>
					</div>
				</div>
				<div className='clip-card relative overflow-hidden h-full p-4 before:content-[""] before:absolute before:w-full before:z-10 before:h-full before:left-0 before:top-0 before:bg-[#b39a67]/30 row-span-1'>
					<Image src='/images/gfb2.jpg' fill alt='' className='object-cover' />

					<div className='relative z-20 text-[#fa8603] w-full h-full flex items-center justify-center'>
						<p
							style={{ fontFamily: 'Anton, sans-serif' }}
							className='slideup-text text-2xl md:text-7xl uppercase text-center leading-[1.3] max-w-xs lg:max-w-md'>
							{/* new shorter quote */}
							Snaga počinje tamo gdje prestaje vaša zona komfora!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TwoImageClipComponent;
