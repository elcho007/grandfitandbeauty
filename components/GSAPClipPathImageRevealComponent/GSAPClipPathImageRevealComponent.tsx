'use client';
import React from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../../lib/gsap';

type Props = {
	children: React.ReactNode;
	direction?: 'top' | 'bottom' | 'left' | 'right';
};

const GSAPClipPathImageRevealComponent = ({
	children,
	direction = 'bottom',
}: Props) => {
	const clipPathRef = React.useRef<HTMLDivElement>(null);
	useGSAP(
		() => {
			if (!clipPathRef.current) return;
			const image = clipPathRef.current.children;

			const tween = gsap.fromTo(
				image,
				{
					clipPath: `inset(${direction === 'top' ? '100%' : '0%'} ${
						direction === 'right' ? '100%' : '0%'
					} ${direction === 'bottom' ? '100%' : '0%'} ${
						direction === 'left' ? '100%' : '0%'
					})`,
				},
				{
					clipPath: 'inset(0% 0% 0% 0%)',
					ease: 'none',
					stagger: 0.3,
					scrollTrigger: {
						trigger: clipPathRef.current,
						start: 'top 80%',
						end: 'bottom 20%',
						scrub: true,
					},
				}
			);

			return () => {
				tween.scrollTrigger?.kill();
				tween.kill();
			};
		},
		{ scope: clipPathRef }
	);

	return <div ref={clipPathRef}>{children}</div>;
};

export default GSAPClipPathImageRevealComponent;
