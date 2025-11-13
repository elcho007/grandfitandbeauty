'use client';
import React from 'react';

import { gsap, useGSAP } from '../../lib/gsap';
import { ArrowRight } from 'lucide-react';

type Props = {};

const GFBMarquee = (props: Props) => {
	const marqueeRef = React.useRef<HTMLElement>(null);
	const [isMounted, setIsMounted] = React.useState(false);

	// Handle mounting for SSR compatibility
	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	useGSAP(() => {
		if (!isMounted || !marqueeRef.current) return;

		let currentScroll = 0;
		let isScrollingDown = true;
		const arrows = marqueeRef.current.querySelectorAll('.arrow');

		// Create marquee animation
		const tween = gsap
			.to('.marquee__part', {
				xPercent: -100,
				repeat: -1,
				duration: 5,
				ease: 'linear',
			})
			.totalProgress(0.5);

		// Initialize marquee position
		//gsap.set('.marquee__inner', { xPercent: -50 });

		// Scroll handler with proper cleanup
		const handleScroll = () => {
			const pageYOffset = window.pageYOffset;

			if (pageYOffset > currentScroll) {
				isScrollingDown = true;
			} else {
				isScrollingDown = false;
			}

			gsap.to(tween, {
				timeScale: isScrollingDown ? 1 : -1,
				duration: 0.3,
				ease: 'power2.out',
			});

			arrows.forEach((arrow) => {
				if (isScrollingDown) {
					arrow.classList.remove('active');
				} else {
					arrow.classList.add('active');
				}
			});

			currentScroll = pageYOffset;
		};

		// Add scroll listener
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			// Proper cleanup
			window.removeEventListener('scroll', handleScroll);
			tween?.kill();
		};
	}, [isMounted]);

	// Create marquee items dynamically
	const marqueeItems = React.useMemo(() => {
		return Array.from({ length: 7 }, (_, index) => (
			<div key={index} className='marquee__part'>
				<div style={{ fontFamily: 'Anton, sans-serif' }}>
					GrandFit
					<span
						className='text-[46px] tracking-tighter'
						style={{ fontFamily: 'Lora, serif' }}>
						&Beauty
					</span>
				</div>
				<div className='arrow'>
					<ArrowRight size={48} />
				</div>
			</div>
		));
	}, []);

	// Prevent hydration mismatch
	if (!isMounted) {
		return (
			<section className='marquee'>
				<div className='marquee__inner'>
					<div className='marquee__part'>
						<div style={{ fontFamily: 'Anton, sans-serif' }}>
							GrandFit
							<span
								className='text-[46px] tracking-tighter'
								style={{ fontFamily: 'Lora, serif' }}>
								&Beauty
							</span>
						</div>
						<div className='arrow'>
							<ArrowRight size={48} />
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section ref={marqueeRef} className='marquee'>
			<div className='marquee__inner'>{marqueeItems}</div>
		</section>
	);
};

export default GFBMarquee;
