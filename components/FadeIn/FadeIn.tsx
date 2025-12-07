'use client';
import React from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';

type Props = {
	children: React.ReactNode;
	direction?: 'top' | 'bottom' | 'left' | 'right';
	start?: string;
	stagger?: number;
	duration?: number;
	delay?: number;
	ease?: gsap.EaseFunction | string;
	rotation?: number;
	className?: string;
};

const FadeIn = ({
	children,
	direction = 'bottom',
	ease = 'power2.out',
	start = 'top 80%',
	stagger = 0.2,
	duration = 1,
	delay = 0,
	rotation = 0,
	className,
}: Props) => {
	const fadeInRef = React.useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const elements = fadeInRef.current?.children;
			if (!elements) return;

			gsap.set(elements, { autoAlpha: 0, transformOrigin: 'right bottom' });

			const tween = gsap.fromTo(
				elements,
				{ autoAlpha: 0, yPercent: 10, rotation: rotation },
				{
					autoAlpha: 1,
					yPercent:
						direction === 'bottom'
							? 0
							: direction === 'top'
							? 0
							: direction === 'left'
							? 0
							: 0,
					duration: duration,
					ease: ease,
					stagger: stagger,
					rotation: 0,
					delay: delay,
					scrollTrigger: {
						trigger: fadeInRef.current,
						start: start,
						toggleActions: 'play none none reverse',
					},
				}
			);

			return () => {
				tween.kill();
			};
		},
		{ scope: fadeInRef }
	);

	return (
		<div ref={fadeInRef} className={className}>
			{children}
		</div>
	);
};

export default FadeIn;
