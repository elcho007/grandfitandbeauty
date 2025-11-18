'use client';
import React, { useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';

const lerp = (start: number, end: number, factor: number): number =>
	start + (end - start) * factor;

interface ParallaxImageProps {
	src: string;
	alt: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, alt }) => {
	const imageRef = useRef<HTMLImageElement>(null);
	const bounds = useRef<{ top: number; bottom: number } | null>(null);
	const currentTranslateY = useRef(0);
	const targetTranslateY = useRef(0);
	const rafId = useRef<number | null>(null);

	useEffect(() => {
		const updateBounds = () => {
			if (imageRef.current) {
				const rect = imageRef.current.getBoundingClientRect();
				bounds.current = {
					top: rect.top + window.scrollY,
					bottom: rect.bottom + window.scrollY,
				};
			}
		};

		updateBounds();
		window.addEventListener('resize', updateBounds);

		const animate = () => {
			if (imageRef.current) {
				currentTranslateY.current = lerp(
					currentTranslateY.current,
					targetTranslateY.current,
					0.1
				);

				if (
					Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01
				) {
					imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`;
				}
			}
			rafId.current = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener('resize', updateBounds);
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
			}
		};
	}, []);

	useLenis(({ scroll }) => {
		if (!bounds.current) return;
		const relativeScroll = scroll - bounds.current.top;
		targetTranslateY.current = relativeScroll * 0.2;
	});

	return (
		<img
			ref={imageRef}
			src={src}
			alt={alt}
			className='absolute top-0 left-0 w-full h-full object-cover'
			style={{
				willChange: 'transform',
				transform: 'translateY(0) scale(1)',
			}}
		/>
	);
};

export default ParallaxImage;
