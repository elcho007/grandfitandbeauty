'use client';
import React from 'react';
import { gsap, useGSAP, SplitText, ScrollTrigger } from '@/lib/gsap';

type Props = {
	children: React.ReactNode;
	duration?: number;
	stagger?: number;
	delay?: number;
	reverse?: boolean;
	onComplete?: () => void;
};

const SplitTextComponent = ({
	children,
	duration = 0.6,
	stagger = 0.05,
	delay = 0,
	reverse = false,
	onComplete,
}: Props) => {
	const splitTextRef = React.useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!splitTextRef.current) return;

		const split = new SplitText(splitTextRef.current.children, {
			type: 'words,chars',
			mask: 'chars',
			autoSplit: true,

			onSplit: (self) => {
				if (reverse) {
					// Reverse animation - animate out the way it came in
					gsap.fromTo(
						self.chars,
						{ opacity: 1, yPercent: 0 },
						{
							opacity: 0,
							yPercent: 100, // Exit down, same direction it came from
							stagger: stagger,
							duration: duration,
							delay: delay,
							ease: 'power2.in',
							onComplete: onComplete,
						}
					);
				} else {
					// Forward animation - animate in
					gsap.fromTo(
						self.chars,
						{ opacity: 0, yPercent: 100 },
						{
							opacity: 1,
							yPercent: 0,
							stagger: stagger,
							duration: duration,
							delay: delay,
							ease: 'power2.out',
							onComplete: onComplete,
						}
					);
				}
			},
		});

		return () => {
			split.revert();
		};
	}, [reverse]);

	return <div ref={splitTextRef}>{children}</div>;
};

export default SplitTextComponent;
