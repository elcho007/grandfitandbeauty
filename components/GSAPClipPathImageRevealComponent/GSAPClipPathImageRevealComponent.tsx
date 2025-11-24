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
			const mm = gsap.matchMedia();

			mm.add('(prefers-reduced-motion: reduce)', () => {
				gsap.set(image, { clipPath: 'inset(0% 0% 0% 0%)' });
			});

			mm.add('(max-width: 767px)', () => {
				gsap.set(image, { clipPath: 'inset(0% 0% 0% 0%)' });
			});

			mm.add(
				'(min-width: 769px) and (prefers-reduced-motion: no-preference)',
				() => {
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
				}
			);

			return () => {
				mm.revert();
			};
		},
		{ scope: clipPathRef }
	);

	return <div ref={clipPathRef}>{children}</div>;
};

export default GSAPClipPathImageRevealComponent;
