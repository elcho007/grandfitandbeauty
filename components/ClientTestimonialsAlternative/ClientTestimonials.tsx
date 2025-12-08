'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../../lib/gsap';

type Props = {};

const testimonials = [
	{
		name: 'Ana Kovač',
		feedback: 'Izvrsna usluga i profesionalan pristup! Preporučujem svima.',
		image: '/images/testimonial1.jpg',
		date: '01.10.2025',
	},
	{
		name: 'Marko Horvat',
		feedback:
			'Samo najbolji mogu reći! Rezultati su vidljivi odmah. Trener je vrlo stručan i motivirajući.',
		image: '/images/testimonial2.jpg',
		date: '02.09.2025',
	},
	{
		name: 'Ivana Marić',
		feedback:
			'Izvrsna usluga i profesionalan pristup! Posebno mi se svidio individualni plan treninga.',
		image: '/images/testimonial3.jpg',
		date: '12.08.2025',
	},
	{
		name: 'Lucia Babić',
		feedback: 'Izvrsna usluga i profesionalan pristup! Preporučujem svima.',
		image: '/images/testimonial1.jpg',
		date: '12.12.2024',
	},
	{
		name: 'Ivano Lakić',
		feedback: 'Izvrsna usluga i profesionalan pristup! Preporučujem svima.',
		image: '/images/testimonial2.jpg',
		date: '05.11.2024',
	},
	{
		name: 'Marina Novak',
		feedback: 'Izvrsna usluga i profesionalan pristup! Preporučujem svima.',
		image: '/images/testimonial3.jpg',
		date: '15.10.2024',
	},
	{
		name: 'Petar Jurić',
		feedback: 'Izvrsna usluga i profesionalan pristup! Preporučujem svima.',
		image: '/images/testimonial1.jpg',
		date: '20.09.2024',
	},
	{
		name: 'Katarina Radić',
		feedback: 'Izvrsna usluga i profesionalan pristup! Preporučujem svima.',
		image: '/images/testimonial2.jpg',
		date: '10.08.2024',
	},
	{
		name: 'Luka Šarić',
		feedback: 'Izvrsna usluga i profesionalan pristup! Preporučujem svima.',
		image: '/images/testimonial3.jpg',
		date: '01.07.2024',
	},
	{
		name: 'Maja Kralj',
		feedback: 'Izvrsna usluga i profesionalan pristup! Preporučujem svima.',
		image: '/images/testimonial1.jpg',
		date: '25.06.2024',
	},
];

const ClientTestimonials = (props: Props) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [isAnimating, setIsAnimating] = React.useState(false);
	const testimonialsRef = React.useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!containerRef.current) return;

		gsap.set(containerRef.current, {
			perspective: 1000,
			transformOrigin: 'bottom center',
		});

		gsap.fromTo(
			testimonialsRef.current,
			{
				scale: 0.6,
				autoAlpha: 0,
			},
			{
				scale: 1,
				autoAlpha: 1,
				duration: 0.5,
				ease: 'linear',
				scrollTrigger: {
					trigger: testimonialsRef.current,
					start: 'top bottom',
					end: 'top 70%',
					scrub: 1,
					invalidateOnRefresh: true,
				},
			}
		);
	});

	const animateSlide = React.useCallback(
		(direction: 'next' | 'prev') => {
			if (isAnimating || !containerRef.current) return;

			setIsAnimating(true);

			const currentCard = containerRef.current.querySelector(
				`[data-index="${currentIndex}"]`
			) as HTMLElement;

			const nextIndex =
				direction === 'next'
					? (currentIndex + 1) % testimonials.length
					: (currentIndex - 1 + testimonials.length) % testimonials.length;

			const nextCard = containerRef.current.querySelector(
				`[data-index="${nextIndex}"]`
			) as HTMLElement;

			if (!currentCard || !nextCard) return;

			const tl = gsap.timeline({
				onComplete: () => {
					setIsAnimating(false);
					setCurrentIndex(nextIndex);
				},
			});

			// Set initial position for incoming card
			gsap.set(nextCard, {
				opacity: 0,
				x: direction === 'next' ? 50 : -50,
				zIndex: 10,
			});

			// Animate out current card and in next card
			tl.to(currentCard, {
				opacity: 0,
				x: direction === 'next' ? -50 : 50,
				duration: 0.5,
				ease: 'power2.inOut',
			});

			tl.to(
				nextCard,
				{
					opacity: 1,
					x: 0,
					duration: 0.5,
					ease: 'power2.inOut',
				},
				'<'
			);
		},
		[currentIndex, isAnimating]
	);

	const handleNext = React.useCallback(() => {
		animateSlide('next');
	}, [animateSlide]);

	const handlePrev = React.useCallback(() => {
		animateSlide('prev');
	}, [animateSlide]);

	return (
		<div
			ref={testimonialsRef}
			className=' w-full min-h-[30vh] text-(--black) lg:text-[#9d9d9d] flex flex-col bg-[#9d9d9d] lg:bg-(--black) items-start md:items-center gap-2 md:gap-8 px-[5vw] py-16 relative overflow-hidden'>
			<div className='flex flex-col items-center justify-center gap-4 w-full'>
				<div className='flex flex-col items-center gap-4 max-w-max'>
					<h3
						style={{ fontFamily: 'Anton, sans-serif' }}
						className='text-xl md:text-3xl tracking-normal max-w-sm leading-[1.3] text-center'>
						Pročitajte šta kažu naši klijenti
					</h3>
					{/* <div className='hidden lg:flex items-center gap-2 md:gap-4'>
						<button
							onClick={handlePrev}
							className='border aspect-square w-16 md:w-20 flex items-center justify-center border-dashed border-[#9d9d9d] text-[#9d9d9d] p-2 font-semibold md:hover:bg-[#9d9d9d] md:hover:text-(--black) transition-colors duration-300'>
							<ArrowLeft size={32} />
						</button>

						<button
							onClick={handleNext}
							className='border aspect-square w-16 md:w-20 flex items-center justify-center border-dashed border-[#9d9d9d] text-[#9d9d9d] p-2 font-semibold md:hover:bg-[#9d9d9d] md:hover:text-(--black) transition-colors duration-300'>
							<ArrowRight size={32} />
						</button>
					</div> */}
				</div>
				<div className='flex flex-col justify-center w-full max-w-2xl overflow-hidden mx-auto relative'>
					<div ref={containerRef} className='relative w-full h-96 md:h-[350px]'>
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								data-index={index}
								className='testimonial-card absolute inset-0 w-full h-124 p-4 flex flex-col items-center justify-start rounded-md'
								style={{
									opacity: index === 0 ? 1 : 0,
									zIndex: index === 0 ? 1 : 0,
								}}>
								<p
									className='text-2xl max-w-sm text-center'
									style={{ fontFamily: 'Lora, serif' }}>
									{testimonial.feedback}
								</p>
								<div className='flex flex-col items-center gap-4 mt-8'>
									<div className='relative w-16 h-16 rounded-full overflow-hidden'>
										<Image
											fill
											className='grayscale-100'
											src={testimonial.image}
											alt={`Slika klijenta ${testimonial.name}`}
										/>
									</div>
									<div className='flex flex-col justify-between items-center mt-8'>
										<span className='text-(--black) lg:text-[#9d9d9d]'>
											{testimonial.name}
										</span>
										<span className='bg-gray-500/30 p-2 text-[10px] flex max-w-max rounded-xs'>
											{testimonial.date}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='flex w-full justify-center items-center gap-2 md:gap-4 relative z-10'>
						<button
							onClick={handlePrev}
							onTouchEnd={(e) => {
								e.preventDefault();
								handlePrev();
							}}
							className='border aspect-square w-16 md:w-20 flex lg:hover:bg-[#9d9d9d] lg:hover:text-(--black) items-center justify-center border-dashed border-(--black) lg:border-[#9d9d9d] text-(--black) lg:text-[#9d9d9d] p-2 font-semibold transition-colors duration-300 touch-manipulation'>
							<ArrowLeft size={32} />
						</button>

						<button
							onClick={handleNext}
							onTouchEnd={(e) => {
								e.preventDefault();
								handleNext();
							}}
							className='border aspect-square w-16 md:w-20 flex items-center lg:hover:bg-[#9d9d9d] lg:hover:text-(--black) justify-center border-dashed border-(--black) lg:border-[#9d9d9d] text-(--black) lg:text-[#9d9d9d] p-2 font-semibold transition-colors duration-300 touch-manipulation'>
							<ArrowRight size={32} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClientTestimonials;
