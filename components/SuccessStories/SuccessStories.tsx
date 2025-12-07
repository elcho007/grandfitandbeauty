'use client';
import Image from 'next/image';
import React from 'react';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';
import GFBMarquee from '../GFBMarquee/GFBMarquee';

import { gsap } from 'gsap';

const stories = [
	{
		title: 'Ivanova transformacija',
		description:
			'Ivan je uspio izgubiti 15 kilograma i značajno poboljšati svoju kondiciju uz naš program.',
		image: '/images/story1.jpg',
		startWeight: 95,
		endWeight: 80,
		duration: '3 mjeseca',
		misicnaMasa: +5,
		fatLoss: -15,
	},
	{
		title: 'Anina priča',
		description:
			'Ana je ostvarila svoje fitness ciljeve i sada se osjeća bolje nego ikada prije.',
		image: '/images/story2.jpg',
		startWeight: 96,
		endWeight: 72,
		duration: '4 mjeseca',
		misicnaMasa: +3,
		fatLoss: -18,
	},
	{
		title: 'Marko Mornar',
		description:
			'Marko je pronašao novu strast za vježbanjem i postao je inspiracija drugima.',
		image: '/images/story3.jpg',
		startWeight: 145,
		endWeight: 120,
		duration: '5 mjeseci',
		misicnaMasa: +8,
		fatLoss: -20,
	},
	{
		title: 'Lina i snaga volje',
		description:
			'Lina je uspjela izgraditi mišićnu masu i poboljšati svoje zdravlje kroz naš program.',
		image: '/images/story4.jpg',
		startWeight: 88,
		endWeight: 70,
		duration: '4 mjeseca',
		misicnaMasa: +6,
		fatLoss: -14,
	},
];

type Props = {};

const SuccessStories = (props: Props) => {
	const [activeStoryIndex, setActiveStoryIndex] = React.useState(0);
	const [isTransitioning, setIsTransitioning] = React.useState(false);
	const imageContainerRef = React.useRef<HTMLDivElement>(null);
	const statsRef = React.useRef<HTMLDivElement>(null);

	// Helper to animate numbers counting up smoothly
	const animateNumber = (el: HTMLElement, endValue: number, delta = 3) => {
		const currentText = el.textContent?.replace(/[^0-9.-]/g, '') || '0';
		const current = parseFloat(currentText) || 0;
		const start = Math.max(0, endValue - delta);
		const obj = { val: start };
		gsap.to(obj, {
			val: endValue,
			duration: 0.8,
			ease: 'expo.out',
			onUpdate: () => {
				el.textContent = `${Math.round(obj.val)}`;
			},
		});
	};

	// Helper to animate rolling text effect for non-numeric strings
	const animateText = (el: HTMLElement, newText: string) => {
		const tl = gsap.timeline();
		tl.to(el, { y: 12, opacity: 0, duration: 0.25, ease: 'power2.in' });
		tl.set(el, { textContent: newText });
		tl.fromTo(
			el,
			{ y: -12, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
		);
		return tl;
	};

	const handleActiveStoryChange = (index: number) => {
		if (index === activeStoryIndex || isTransitioning) return;

		setIsTransitioning(true);

		const container = imageContainerRef.current;
		if (container) {
			const currentImg = container.querySelector(
				'.current-image'
			) as HTMLElement;
			const nextImg = container.querySelector('.next-image') as HTMLElement;

			if (currentImg && nextImg) {
				// Set next image via background-image to avoid Next/Image re-render quirks
				nextImg.style.backgroundImage = `url(${stories[index].image})`;
				nextImg.style.backgroundSize = 'cover';
				nextImg.style.backgroundPosition = 'center';

				// hint browser for better animation smoothness
				gsap.set([currentImg, nextImg], { willChange: 'clip-path' });
				gsap.set(nextImg, { force3D: true });
				// temporary debug outline to verify top layer
				gsap.set(nextImg, { outline: '2px solid #b39a67' });

				const tl = gsap.timeline({
					onComplete: () => {
						// Update the current image background to the new image
						currentImg.style.backgroundImage = `url(${stories[index].image})`;
						currentImg.style.backgroundSize = 'cover';
						currentImg.style.backgroundPosition = 'center';
						// Reset: current is full, next is collapsed on left (ready for next transition)
						gsap.set(currentImg, {
							clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
							zIndex: 20,
						});
						gsap.set(nextImg, {
							clipPath: 'polygon(0 0, 100% 0, 0 0, 0% 100%)',
							zIndex: 100,
						});
						// clear will-change hint
						gsap.set([currentImg, nextImg], { willChange: 'auto' });
						// Update state
						setActiveStoryIndex(index);
						setIsTransitioning(false);
					},
				});

				// Ensure next-image starts in specified initial clip-path and is on top
				gsap.set(currentImg, { zIndex: 20, opacity: 1 });
				gsap.set(nextImg, {
					clipPath: 'polygon(0 0, 100% 0, 0 0, 0% 100%)',
					webkitClipPath: 'polygon(0 0, 100% 0, 0 0, 0% 100%)',
					opacity: 1,
					zIndex: 100,
				});

				// Animate next-image (on top) revealing to full rectangle with smoother ease
				tl.to(
					nextImg,
					{
						clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
						webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
						duration: 1.0,
						ease: 'expo.inOut',
						zIndex: 100,
					},
					0
				);

				// Ensure current stays below during the wipe
				tl.set(currentImg, { zIndex: 90 }, 0);

				// Animate stats for the newly active story
				const statsRoot = statsRef.current;
				if (statsRoot) {
					const titleEl = statsRoot.querySelector('.stat-title') as HTMLElement;
					const startEl = statsRoot.querySelector('.stat-start') as HTMLElement;
					const endEl = statsRoot.querySelector('.stat-end') as HTMLElement;
					const durationEl = statsRoot.querySelector(
						'.stat-duration'
					) as HTMLElement;
					const muscleEl = statsRoot.querySelector(
						'.stat-muscle'
					) as HTMLElement;
					const fatEl = statsRoot.querySelector('.stat-fat') as HTMLElement;

					if (titleEl) animateText(titleEl, stories[index].title);
					if (durationEl)
						animateText(durationEl, String(stories[index].duration));
					if (startEl) animateNumber(startEl, stories[index].startWeight, 5);
					if (endEl) animateNumber(endEl, stories[index].endWeight, 5);
					if (muscleEl) animateNumber(muscleEl, stories[index].misicnaMasa, 2);
					if (fatEl) animateNumber(fatEl, Math.abs(stories[index].fatLoss), 2);
				}
			}
		}
	};

	return (
		<>
			{/* <GFBMarquee /> */}
			<div className='w-full min-h-[120vh] bg-(--black) pt-20 pb-[5vw] flex flex-col justify-center'>
				<div className='grid grid-cols-[5vw_repeat(3,minmax(0,1fr))_5vw] w-full overflow-hidden'>
					<div className='col-start-2 col-span-3 md:col-start-2 md:col-span-1 w-full flex flex-col px-[4vw] py-8 md:py-24 bg-(--gold) rounded-xl'>
						<GSAPSplitTextComponent
							ease={'expo'}
							start={'top bottom'}
							duration={1}>
							<h2
								className='text-3xl md:text-[2.5vw] mb-4 tracking-tight text-(--dark)'
								style={{ fontFamily: 'Anton, sans-serif' }}>
								Uspješne priče
							</h2>
						</GSAPSplitTextComponent>
						<p className='text-base tracking-tight mb-4 text-(--dark) max-w-xs'>
							Tijekom godina, zajedno sa našim klijentima, ispisali smo mnogo
							inspirativnih priča o transformaciji i uspjehu. Ovdje smo
							izdvojili samo neke od njih. A već sutra, i vi možete ispisati
							svoju priču i napraviti vidljive promjene u vrlo kratkom roku.
						</p>
						<button className='bg-(--black) text-(--gold) font-medium max-w-max text-base px-3 py-2 z-10 relative mb-4'>
							Ispiši svoju priču
						</button>
						<p
							className='mt-auto tracking-tighter max-w-xs text-gray-800'
							style={{ fontFamily: 'Lora, serif' }}>
							"Strength does not come from physical capacity. It comes from an
							indomitable will." – Mahatma Gandhi
						</p>
					</div>
					<div
						ref={imageContainerRef}
						className='relative w-full h-[600px] md:h-[800px] col-start-2 col-span-3 md:col-span-2 md:col-start-3 overflow-hidden rounded-xl'>
						<div
							className='current-image absolute inset-0 w-full h-full z-20'
							style={{
								clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
								backgroundImage: `url(${stories[activeStoryIndex].image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}></div>
						<div
							className='next-image absolute inset-0 w-full h-full z-30'
							style={{
								clipPath: 'polygon(0 0, 100% 0, 0 0, 0% 100%)',
								backgroundImage: `url(${stories[activeStoryIndex].image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}></div>
						<div
							ref={statsRef}
							className='story-stats absolute z-100 bottom-20 md:bottom-0 left-0 w-full mt-auto flex flex-col gap-2 p-4'>
							<div className='stat-item bg-(--black) text-(--gold) px-4 py-2 w-full flex max-w-max text-lg'>
								<span className='stat-title font-semibold tracking-tight'>
									{stories[activeStoryIndex].title}
								</span>
							</div>
							<div className='stat-item bg-(--black) text-(--gold) px-4 py-2 w-full flex gap-4 max-w-max text-sm'>
								<span>Početna kilaža: </span>
								<span className='stat-start'>
									{stories[activeStoryIndex].startWeight}
								</span>
							</div>
							<div className='stat-item bg-(--black) text-(--gold) px-4 py-2 w-full flex gap-4 max-w-max text-sm'>
								<span>Kilaža nakon programa: </span>
								<span className='stat-end'>
									{stories[activeStoryIndex].endWeight}
								</span>
							</div>
							<div className='stat-item bg-(--black) text-(--gold) px-4 py-2 w-full flex gap-4 max-w-max text-sm'>
								<span>Trajanje programa: </span>
								<span className='stat-duration'>
									{stories[activeStoryIndex].duration}
								</span>
							</div>
							<div className='stat-item bg-(--black) text-(--gold) px-4 py-2 w-full flex gap-4 max-w-max text-sm'>
								<span>Povećanje mišićne mase: </span>
								<span className='stat-muscle'>
									{stories[activeStoryIndex].misicnaMasa}
								</span>
								<span> kg</span>
							</div>
							<div className='stat-item bg-(--black) text-(--gold) px-4 py-2 w-full flex gap-4 max-w-max text-sm'>
								<span>Gubitak masnog tkiva: </span>
								<span className='stat-fat'>
									{Math.abs(stories[activeStoryIndex].fatLoss)}
								</span>
								<span> kg</span>
							</div>
						</div>
						<div className='grid w-full grid-cols-[repeat(4,1fr)] absolute bottom-4 right-0 z-100'>
							<div className='flex gap-2 col-span-full col-start-1 md:col-start-2 -col-end-2 w-full overflow-hidden'>
								<div
									onClick={() => handleActiveStoryChange(0)}
									className='w-16 md:w-48 h-16 md:h-40 bg-[#171717] rounded-lg flex relative flex-1 overflow-hidden'>
									<Image
										src={'/images/story1.jpg'}
										fill
										alt='Transformacija Tijela Ivana'
										className='object-cover'
									/>
								</div>
								<div
									onClick={() => handleActiveStoryChange(1)}
									className='w-16 md:w-48 h-16 md:h-40 bg-[#171717] rounded-lg flex relative flex-1 overflow-hidden'>
									<Image
										src={'/images/story2.jpg'}
										fill
										alt='Transformacija Tijela Ivana'
										className='object-cover'
									/>
								</div>
								<div
									onClick={() => handleActiveStoryChange(2)}
									className='w-16 md:w-48 h-16 md:h-40 bg-[#171717] rounded-lg flex relative flex-1 overflow-hidden'>
									<Image
										src={'/images/story3.jpg'}
										fill
										alt='Transformacija Tijela Ivana'
										className='object-cover'
									/>
								</div>
								<div
									onClick={() => handleActiveStoryChange(3)}
									className='w-16 md:w-48 h-16 md:h-40 bg-[#171717] rounded-lg flex relative flex-1 overflow-hidden'>
									<Image
										src={'/images/story4.jpg'}
										fill
										alt='Transformacija Tijela Ivana'
										className='object-cover'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SuccessStories;
