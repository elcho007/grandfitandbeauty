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
	const isAnimating = useRef(false);
	const startAnimationRef = useRef<(() => void) | null>(null);

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

		const handleImageLoad = () => {
			updateBounds();
		};

		const imageElement = imageRef.current;

		// Add load listener for when image finishes loading
		if (imageElement) {
			imageElement.addEventListener('load', handleImageLoad);
			// If image is already loaded (cached), update bounds immediately
			if (imageElement.complete) {
				updateBounds();
			}
		}

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
					rafId.current = requestAnimationFrame(animate);
				} else {
					isAnimating.current = false;
					rafId.current = null;
				}
			}
		};

		const startAnimation = () => {
			if (!isAnimating.current) {
				isAnimating.current = true;
				animate();
			}
		};

		startAnimationRef.current = startAnimation;

		return () => {
			window.removeEventListener('resize', updateBounds);
			if (imageElement) {
				imageElement.removeEventListener('load', handleImageLoad);
			}
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
			}
		};
	}, []);

	useLenis(({ scroll }) => {
		if (!bounds.current) return;
		const relativeScroll = scroll - bounds.current.top;
		targetTranslateY.current = relativeScroll * 0.2;
		startAnimationRef.current?.();
	});

	return (
		<img
			ref={imageRef}
			src={src}
			alt={alt}
			className='absolute top-0 left-0 w-full h-full object-cover'
			style={{
				willChange: 'transform',
				transform: 'translateY(0) scale(1.25)',
			}}
		/>
	);
};

export default ParallaxImage;
