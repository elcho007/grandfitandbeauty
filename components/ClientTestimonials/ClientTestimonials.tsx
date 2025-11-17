'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { gsap, useGSAP, Draggable } from '../../lib/gsap';

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
	const testimonialsWrapperRef = React.useRef<HTMLDivElement>(null);
	const progressBarWrapperRef = React.useRef<HTMLSpanElement>(null);
	const progressBarRef = React.useRef<HTMLSpanElement>(null);
	const prevBtnRef = React.useRef<HTMLButtonElement>(null);
	const nextBtnRef = React.useRef<HTMLButtonElement>(null);

	const [currentPosition, setCurrentPosition] = React.useState(0);
	const [cardWidth, setCardWidth] = React.useState(0);
	const [containerWidth, setContainerWidth] = React.useState(0);
	const [maxPosition, setMaxPosition] = React.useState(0);
	const [isDragging, setIsDragging] = React.useState(false);

	// Calculate dimensions and positions
	React.useEffect(() => {
		if (!testimonialsWrapperRef.current) return;

		const updateDimensions = () => {
			const wrapper = testimonialsWrapperRef.current;
			if (!wrapper) return;

			const firstCard = wrapper.querySelector(
				'.testimonial-card'
			) as HTMLElement;
			if (firstCard) {
				const cardRect = firstCard.getBoundingClientRect();
				const gap = 8; // 0.5rem = 8px (gap-2)
				const cardWidthWithGap = cardRect.width + gap;

				setCardWidth(cardWidthWithGap);
				setContainerWidth(wrapper.clientWidth);

				// Calculate max position (total scrollable distance)
				// Account for 5vw margin from right edge
				const viewportWidth = window.innerWidth;
				const rightMargin = viewportWidth * 0.05; // 5vw
				const totalWidth = testimonials.length * cardWidthWithGap - gap;
				const maxPos = Math.max(0, totalWidth - (viewportWidth - rightMargin));
				setMaxPosition(maxPos);
			}
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	// Update progress bar based on current position
	const updateProgressBar = React.useCallback(
		(position: number) => {
			if (!progressBarRef.current || !progressBarWrapperRef.current) return;

			// Progress based on position relative to maxPosition
			// When position = maxPosition, progress = 100%
			const progress = maxPosition > 0 ? position / maxPosition : 0;

			const progressBarWidth =
				progressBarWrapperRef.current.clientWidth * progress;

			gsap.to(progressBarRef.current, {
				width: progressBarWidth,
				duration: 0.3,
				ease: 'power2.out',
			});
		},
		[maxPosition]
	);

	// Initialize progress bar when dimensions are ready
	React.useEffect(() => {
		if (cardWidth > 0 && containerWidth > 0) {
			updateProgressBar(0);
		}
	}, [cardWidth, containerWidth, updateProgressBar]);

	// Move testimonials to position
	const moveToPosition = React.useCallback(
		(newPosition: number) => {
			if (!testimonialsWrapperRef.current) return;

			const clampedPosition = Math.max(0, Math.min(maxPosition, newPosition));
			setCurrentPosition(clampedPosition);

			gsap.to(testimonialsWrapperRef.current, {
				x: -clampedPosition,
				duration: 0.6,
				ease: 'power2.out',
				onUpdate: () => {
					updateProgressBar(clampedPosition);
				},
			});
		},
		[maxPosition, updateProgressBar]
	);

	// Handle next button
	const handleNext = React.useCallback(() => {
		if (isDragging) return; // Don't interfere with dragging
		const newPosition = currentPosition + cardWidth;
		moveToPosition(newPosition);
	}, [currentPosition, cardWidth, moveToPosition, isDragging]);

	// Handle previous button
	const handlePrev = React.useCallback(() => {
		if (isDragging) return; // Don't interfere with dragging
		const newPosition = currentPosition - cardWidth;
		moveToPosition(newPosition);
	}, [currentPosition, cardWidth, moveToPosition, isDragging]);

	// Initialize draggable functionality
	useGSAP(() => {
		if (!testimonialsWrapperRef.current) return;

		const draggable = Draggable.create(testimonialsWrapperRef.current, {
			type: 'x',
			bounds: {
				minX: -maxPosition,
				maxX: 0,
			},
			inertia: true,
			dragResistance: 0.3,
			throwResistance: 1000,
			maxDuration: 0.8,
			minDuration: 0.3,
			overshootTolerance: 0,
			onDragStart: function () {
				setIsDragging(true);
			},
			onDrag: function () {
				const currentX = Math.abs(this.x);
				setCurrentPosition(currentX);
				updateProgressBar(currentX);
			},
			onThrowUpdate: function () {
				const currentX = Math.abs(this.x);
				setCurrentPosition(currentX);
				updateProgressBar(currentX);
			},
			onDragEnd: function () {
				setIsDragging(false);
			},
			onThrowComplete: function () {
				// Ensure final position is snapped and state is updated
				setIsDragging(false);
				const finalX = Math.abs(this.x);
				const cardIndex = Math.round(finalX / cardWidth);
				const snappedPosition = Math.min(cardIndex * cardWidth, maxPosition);
				setCurrentPosition(snappedPosition);
				updateProgressBar(snappedPosition);
			},
			snap: {
				x: function (endValue) {
					// Improved snap logic with better thresholds
					const absEndValue = Math.abs(endValue);
					const cardIndex = Math.round(absEndValue / cardWidth);
					const snappedValue = -Math.min(cardIndex * cardWidth, maxPosition);
					return snappedValue;
				},
			},
		});

		return () => {
			if (draggable[0]) {
				draggable[0].kill();
			}
		};
	}, [maxPosition, cardWidth, updateProgressBar]);

	return (
		<div className='bg-[#f3bb20] w-full min-h-[60vh] flex flex-col justify-center items-center gap-8 text-gray-950 py-8 overflow-hidden'>
			<h4 className='text-2xl tracking-tighter font-semibold max-w-[40ch]'>
				Pročitajte šta kažu naši klijenti
			</h4>
			<div className='flex flex-col justify-center max-w-6xl overflow-hidden mx-auto'>
				<div ref={testimonialsWrapperRef} className='flex w-full gap-2'>
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className='testimonial-card shrink-0 w-56 aspect-3/4 p-4 bg-[#e9b012] rounded-lg flex flex-col'>
							<div className='flex items-end gap-4 mb-8'>
								<div className='relative w-16 h-16 rounded-full overflow-hidden'>
									<Image
										fill
										src={testimonial.image}
										alt={`Slika klijenta ${testimonial.name}`}
									/>
								</div>
								<span>{testimonial.name}</span>
							</div>
							<p className='text-sm '>{testimonial.feedback}</p>

							<span className='bg-[#fccb41] p-2 text-[10px] text-gray-800 mt-auto flex max-w-max rounded-xs'>
								{testimonial.date}
							</span>
						</div>
					))}
				</div>
			</div>
			<div className='flex items-center gap-2'>
				<button
					onClick={handlePrev}
					className='border border-[#ca980c] text-gray-950 p-2 rounded-full font-semibold hover:bg-[#e6b52e] transition-colors duration-300'>
					<ArrowLeft />
				</button>

				<span
					ref={progressBarWrapperRef}
					className='w-40 h-2 bg-[#e4ae1b] rounded-full relative flex items-center'>
					<span
						ref={progressBarRef}
						className='w-12 h-1 bg-[#fccb41] rounded-full mx-1'></span>
				</span>

				<button
					onClick={handleNext}
					className='border border-[#ca980c] text-gray-950 p-2 rounded-full font-semibold hover:bg-[#e6b52e] transition-colors duration-300'>
					<ArrowRight />
				</button>
			</div>
		</div>
	);
};

export default ClientTestimonials;
