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
};

const GSAPSplitTextComponent = ({
	children,
	stagger = 0.05,
	start = 'top bottom',
	delay = 0,
	duration = 0.5,
	ease = 'power2.in',
}: Props) => {
	const splitWrapperRef = React.useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!splitWrapperRef.current) return;

		const split = new SplitText(splitWrapperRef.current.children, {
			type: 'words,chars',
			mask: 'chars',
			autoSplit: true,
			onSplit: (self) => {
				gsap.fromTo(
					self.chars,
					{ opacity: 0, yPercent: 100 },
					{
						opacity: 1,
						yPercent: 0,
						stagger: stagger,
						duration: duration,
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
	return <div ref={splitWrapperRef}>{children}</div>;
};

export default GSAPSplitTextComponent;
