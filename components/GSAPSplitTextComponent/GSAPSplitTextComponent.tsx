'use client';
import { gsap, useGSAP, ScrollTrigger, SplitText } from '@/lib/gsap';
import React from 'react';

type Props = {
	children: React.ReactNode;
	stagger?: number;
	duration?: number;
	delay?: number;
	start?: string;
	ease: gsap.EaseFunction | string;
	className?: string;
	direction?: 'up' | 'down';
	rotation?: number;
};

const GSAPSplitTextComponent = ({
	children,
	stagger = 0.05,
	start = 'top bottom',
	delay = 0,
	duration = 0.5,
	ease = 'power2.in',
	className = '',
	direction = 'up',
	rotation = 10,
}: Props) => {
	const splitWrapperRef = React.useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!splitWrapperRef.current) return;

		const split = new SplitText(splitWrapperRef.current.children, {
			type: 'lines,words,chars',
			mask: 'lines',
			autoSplit: true,
			onSplit: (self) => {
				gsap.fromTo(
					self.lines,
					{
						opacity: 0,
						yPercent: direction === 'up' ? 100 : -100,
						rotation: rotation,
					},
					{
						opacity: 1,
						yPercent: 0,
						stagger: stagger,
						duration: duration,
						rotation: 0,
						delay: delay,
						ease: ease,
						scrollTrigger: {
							trigger: splitWrapperRef.current,
							start: start,
							toggleActions: 'play none none reverse',
						},
					}
				);
			},
		});

		return () => {
			split.revert();
		};
	});
	return (
		<div ref={splitWrapperRef} className={className}>
			{children}
		</div>
	);
};

export default GSAPSplitTextComponent;
