'use client';
import Image from 'next/image';
import React from 'react';
import { useGSAP, gsap, Flip } from '@/lib/gsap';

const Logo = '/images/gfblogo.svg';

type Props = {};

const IntroAnimation = (props: Props) => {
	const introAnimRef = React.useRef<HTMLDivElement>(null);
	const leftHalfRef = React.useRef<HTMLDivElement>(null);
	const rightHalfRef = React.useRef<HTMLDivElement>(null);
	const logoRef = React.useRef<HTMLDivElement>(null);
	const leftSpanRef = React.useRef<HTMLSpanElement>(null);
	const rightSpanRef = React.useRef<HTMLSpanElement>(null);

	const clipPathsCoordinates = [
		{
			starting: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			ending: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
		},
		{
			starting: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			ending: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
		},
	];

	useGSAP(
		() => {
			if (
				!introAnimRef.current ||
				!leftHalfRef.current ||
				!rightHalfRef.current ||
				!logoRef.current
			)
				return;

			const tl = gsap.timeline({
				onComplete: () => {
					// Hide intro animation container
					/* gsap.set(introAnimRef.current, {
						autoAlpha: 0,
						pointerEvents: 'none',
					}); */
				},
			});

			// Step 1: Count left side from 00 to 49
			const leftCounter = { val: 0 };
			tl.to(leftCounter, {
				val: 49,
				duration: 1.8,
				ease: 'expo.out',
				onUpdate: () => {
					if (leftSpanRef.current) {
						leftSpanRef.current.textContent = Math.round(leftCounter.val)
							.toString()
							.padStart(2, '0');
					}
				},
			});

			// Start logo scaling from the beginning (continues through both counters)
			tl.to(
				logoRef.current,
				{
					width: 128,
					height: 128,
					duration: 1.2,
					ease: 'none',
				},
				0
			);

			// Step 2: Hide left span and show right span at the same time
			tl.set(leftSpanRef.current, {
				opacity: 0,
			});

			tl.set(
				rightSpanRef.current,
				{
					opacity: 1,
				},
				'<'
			);

			// Count from 51 to 100
			const rightCounter = { val: 51 };
			tl.to(
				rightCounter,
				{
					val: 100,
					duration: 1.8,
					ease: 'expo.out',
					onUpdate: () => {
						if (rightSpanRef.current) {
							rightSpanRef.current.textContent = Math.round(
								rightCounter.val
							).toString();
						}
					},
				},
				'<'
			);

			// Continue scaling logo during right counter
			tl.to(
				logoRef.current,
				{
					width: 256,
					height: 256,
					duration: 1.4,
					ease: 'none',
				},
				'<'
			);

			// Step 3: Hide right number
			tl.set(
				rightSpanRef.current,
				{
					opacity: 0,
				},
				'+=0.3'
			);

			// Step 4: Hide logo
			tl.set(
				logoRef.current,
				{
					opacity: 0,
				},
				'+=0.1'
			);

			// Step 6: Animate clip paths on both halves to reveal content beneath
			tl.to(
				leftHalfRef.current,
				{
					clipPath: clipPathsCoordinates[0].ending,
					duration: 1.2,
					ease: 'expo.inOut',
				},
				'-=0.4'
			);

			tl.to(
				rightHalfRef.current,
				{
					clipPath: clipPathsCoordinates[1].ending,
					duration: 1.2,
					ease: 'expo.inOut',
				},
				'<'
			);

			// Step 7: Hide intro container
			tl.set(introAnimRef.current, {
				display: 'none',
			});
		},
		{ scope: introAnimRef }
	);

	return (
		<div
			ref={introAnimRef}
			className='fixed inset-0 w-full h-screen flex justify-center items-center overflow-hidden z-50'>
			<div
				ref={leftHalfRef}
				style={{ clipPath: clipPathsCoordinates[0].starting }}
				className='text-(--gold) flex items-center justify-center w-full h-full bg-(--black)'>
				<span ref={leftSpanRef} className='text-6xl font-bold tracking-tighter'>
					00
				</span>
			</div>
			<div
				ref={rightHalfRef}
				style={{ clipPath: clipPathsCoordinates[1].starting }}
				className='text-(--gold) flex items-center justify-center w-full h-full bg-(--black)'>
				<span
					ref={rightSpanRef}
					className='text-6xl font-bold tracking-tighter opacity-0'>
					51
				</span>
			</div>
			<div
				ref={logoRef}
				className='absolute top-[50%] left-[50%] w-24 h-24'
				style={{ transform: 'translate(-50%, -50%)' }}>
				<Image
					src={Logo}
					alt='GrandFit & Beauty Logo'
					fill
					className='object-contain'
				/>
			</div>
		</div>
	);
};

export default IntroAnimation;
