'use client';
import Image from 'next/image';
import React from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

type Props = {};

const images = [
	'/images/wellness1.webp',
	'/images/wellness2.webp',
	'/images/wellness3.webp',
	'/images/wellness4.webp',
	'/images/wellness5.webp',
];

const BeautyMarquee = (props: Props) => {
	const marqueeRef = React.useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!marqueeRef.current) return;

			const wrapper = marqueeRef.current;
			const content = wrapper.querySelector('.marquee-content') as HTMLElement;
			if (!content) return;

			// Wait for images to load before calculating dimensions
			const firstItem = content.querySelector('.marquee-item') as HTMLElement;
			if (!firstItem) return;

			// Get actual computed width including margin
			const itemStyles = window.getComputedStyle(firstItem);
			const itemWidth =
				firstItem.offsetWidth + parseInt(itemStyles.marginRight);
			const totalWidth = itemWidth * images.length;

			let xPos = 0;
			const speed = 1.5;

			const ticker = () => {
				xPos -= speed;

				// When we've scrolled one full set width, jump back by that amount
				// This keeps the middle set always visible
				while (xPos <= -totalWidth) {
					xPos += totalWidth;
				}

				gsap.set(content, { x: xPos });
			};

			gsap.ticker.add(ticker);

			return () => {
				gsap.ticker.remove(ticker);
			};
		},
		{ scope: marqueeRef, dependencies: [] },
	);

	return (
		<div
			ref={marqueeRef}
			className='w-full h-[60vh] bg-(--gold) overflow-hidden relative'>
			<div className='marquee-wrapper absolute left-0 top-0 flex h-full'>
				<div
					className='marquee-content flex h-full'
					style={{
						transform: 'translate3d(0, 0, 0)',
					}}>
					{/* Render images 3 times for truly seamless loop */}
					{[...images, ...images, ...images].map((src, index) => (
						<div
							key={index}
							className='marquee-item relative shrink-0 mr-4'
							style={{
								width: '320px',
								height: '100%',
							}}>
							<Image
								fill
								className='object-cover'
								src={src}
								alt={`Wellness ${(index % images.length) + 1}`}
								sizes='320px'
								quality={90}
								draggable={false}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BeautyMarquee;
