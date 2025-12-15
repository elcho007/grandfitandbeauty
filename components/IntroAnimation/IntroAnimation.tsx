'use client';
import Image from 'next/image';
import React from 'react';
import { useGSAP, gsap, Flip, SplitText } from '@/lib/gsap';

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
			ending: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
		},
		{
			starting: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			ending: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
		},
	];

	useGSAP(
		() => {
			if (
				!introAnimRef.current ||
				!leftHalfRef.current ||
				!rightHalfRef.current ||
				!logoRef.current ||
				!leftSpanRef.current ||
				!rightSpanRef.current
			)
				return;

			const tl = gsap.timeline({
				onComplete: () => {
					gsap.set(introAnimRef.current, {
						autoAlpha: 0,
						pointerEvents: 'none',
					});
				},
			});

			// Split text into characters
			const leftSplit = new SplitText(leftSpanRef.current, {
				type: 'chars',
				mask: 'chars',
			});
			const rightSplit = new SplitText(rightSpanRef.current, {
				type: 'chars',
				mask: 'chars',
			});

			gsap.set([rightSpanRef.current, leftSpanRef.current], {
				xPercent: 100,
			});

			// Initial state - left chars start off-screen to the LEFT
			gsap.set(leftSplit.chars, {
				xPercent: -120,
			});
			// Right chars also start off-screen to the LEFT (same direction)
			gsap.set(rightSplit.chars, {
				xPercent: -120,
			});

			// Step 1: Slide in left chars FROM LEFT with stagger
			tl.fromTo(
				leftSplit.chars,
				{
					xPercent: -120,
				},
				{
					xPercent: 0,
					duration: 0.8,
					stagger: 0.15,
					ease: 'expo',
				},
				'+=0.5'
			);

			// Count left side from 00 to 49
			const leftCounter = { val: 0 };
			tl.to(
				leftCounter,
				{
					val: 49,
					duration: 1.8,
					ease: 'power1.inOut',
					onUpdate: () => {
						const numStr = Math.round(leftCounter.val)
							.toString()
							.padStart(2, '0');
						if (leftSplit.chars[0]) leftSplit.chars[0].textContent = numStr[0];
						if (leftSplit.chars[1]) leftSplit.chars[1].textContent = numStr[1];
					},
				},
				'+=0.3' //
			);

			// Step 2: Slide out left chars TO THE RIGHT
			tl.to(
				leftSplit.chars,
				{
					xPercent: 120,
					duration: 0.8,
					ease: 'expo',
					stagger: 0.1,
				},
				'+=0.2'
			);

			// Step 3: Simultaneously slide in right chars FROM RIGHT with stagger
			tl.fromTo(
				rightSplit.chars,
				{
					xPercent: -120,
				},
				{
					xPercent: 0,
					duration: 0.8,
					ease: 'expo',
					stagger: 0.15,
				},
				'<'
			);

			// Count right side from 50 to 100
			const rightCounter = { val: 50 };
			tl.to(
				rightCounter,
				{
					val: 100,
					duration: 1.8,
					ease: 'power1.inOut',
					onUpdate: () => {
						const numStr = Math.round(rightCounter.val)
							.toString()
							.padStart(2, '0');
						if (rightSplit.chars[0]) {
							// For 100, show "1" + "00" across two chars
							if (numStr.length === 3) {
								rightSplit.chars[0].textContent = numStr[0];
								if (rightSplit.chars[1])
									rightSplit.chars[1].textContent = numStr.slice(1);
							} else {
								rightSplit.chars[0].textContent = numStr[0];
								if (rightSplit.chars[1])
									rightSplit.chars[1].textContent = numStr[1];
							}
						}
					},
				},
				'+=0.2'
			);

			// Step 4: Slide out right chars TO THE RIGHT
			tl.to(
				rightSplit.chars,
				{
					xPercent: 120,
					duration: 0.8,
					ease: 'expo',
					stagger: 0.1,
				},
				'+=0.3'
			);

			tl.to(
				leftHalfRef.current,
				{
					clipPath: clipPathsCoordinates[0].ending,
					duration: 1,
					ease: 'expo',
				},
				'-=0.5'
			).to(
				rightHalfRef.current,
				{
					clipPath: clipPathsCoordinates[1].ending,
					duration: 1,
					ease: 'expo',
				},
				'-=.85' //
			);

			return () => {
				leftSplit.revert();
				rightSplit.revert();
				tl.kill();
			};
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
				className='text-(--gold) flex items-center justify-center w-full h-full bg-(--black) '>
				<div className='w-1/2 xl:w-80 h-60 flex items-center justify-center overflow-hidden'>
					<span
						ref={leftSpanRef}
						style={{ fontFamily: 'Anton, sans-serif' }}
						className='text-6xl xl:text-[10vw] w-full h-full items-center justify-center flex transform -translate-x-full'>
						00
					</span>
				</div>
			</div>
			<div
				ref={rightHalfRef}
				style={{ clipPath: clipPathsCoordinates[1].starting }}
				className='text-(--gold) flex items-center justify-center w-full h-full bg-(--black)'>
				<div className='w-1/2 xl:w-80 h-60 flex items-center justify-center overflow-hidden'>
					<span
						ref={rightSpanRef}
						style={{ fontFamily: 'Anton, sans-serif' }}
						className='text-6xl xl:text-[10vw] flex w-full h-full items-center justify-center transform -translate-x-full'>
						50
					</span>
				</div>
			</div>
			<div
				ref={logoRef}
				className='absolute left-[50%] top-[50%] w-24 h-24'
				style={{ transform: 'translate(-50%, -50%)', opacity: 0 }}>
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
