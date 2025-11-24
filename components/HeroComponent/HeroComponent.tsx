'use client';

import React from 'react';

type Props = {};
import { gsap, SplitText, CustomEase, useGSAP } from '@/lib/gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const carouselSlides = [
	{
		title:
			'Nudimo personalizirane i grupne treninge, masaže i tretmane uz aparate najnovije tehnologije.',
		image: '/images/gfb1.jpg',
	},
	{
		title:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, ut. Iusto dolores facilis dolorem accusamus repudiandae magnam quas rerum numquam eius. Beatae, officia. Repellat, quisquam.',
		image: '/images/gfb2.jpg',
	},
	{
		title:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste accusamus voluptate sequi eum repellendus exercitationem magni? Nobis, possimus.',
		image: '/images/gfb3.jpg',
	},
	{
		title:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ullam temporibus, tempore saepe eum adipisci aut delectus expedita aspernatur. Laudantium, dolore consequatur.',
		image: '/images/gfb4.jpg',
	},
];

const HeroComponent = (props: Props) => {
	const carouselRef = React.useRef<HTMLDivElement>(null);
	const carouselImagesRef = React.useRef<HTMLDivElement>(null);
	const prevBtnRef = React.useRef<HTMLButtonElement>(null);
	const nextBtnRef = React.useRef<HTMLButtonElement>(null);
	const titleRefs = React.useRef<(HTMLDivElement | null)[]>([]);
	const mainTitleRefs = React.useRef<(HTMLHeadingElement | null)[]>([]);
	const subTitleRefs = React.useRef<(HTMLHeadingElement | null)[]>([]);

	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [isAnimating, setIsAnimating] = React.useState(false);
	const [slideOffset, setSlideOffsetState] = React.useState(500);
	const [isMounted, setIsMounted] = React.useState(false);

	const splitTextInstances = React.useRef<any[]>([]);
	const carouselTextElements = React.useRef<
		{ container: HTMLDivElement; words: Element[] }[]
	>([]);

	// Initialize custom ease once
	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			CustomEase.create(
				'hop',
				'M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1'
			);
			setIsMounted(true);
		}
	}, []);

	// Handle window resize
	React.useEffect(() => {
		if (!isMounted) return;

		const updateSlideOffset = () => {
			setSlideOffsetState(window.innerWidth < 1000 ? 100 : 500);
		};

		updateSlideOffset();
		window.addEventListener('resize', updateSlideOffset);

		return () => {
			window.removeEventListener('resize', updateSlideOffset);
		};
	}, [isMounted]);

	// Initialize carousel after mount
	useGSAP(() => {
		if (!isMounted || !carouselRef.current || !carouselImagesRef.current)
			return;

		// Create initial slide
		const initialSlideImgContainer = document.createElement('div');
		initialSlideImgContainer.classList.add('img');

		const initialSlideImg = document.createElement('img');
		initialSlideImg.src = carouselSlides[0].image;
		initialSlideImg.alt = carouselSlides[0].title;

		initialSlideImgContainer.appendChild(initialSlideImg);
		carouselImagesRef.current.appendChild(initialSlideImgContainer);

		// Initialize split text after fonts are ready
		const initializeSplitText = () => {
			// Process each slide
			carouselSlides.forEach((_, index) => {
				const titleContainer = titleRefs.current[index];
				const mainTitle = mainTitleRefs.current[index];
				const subTitle = subTitleRefs.current[index];
				const description = titleContainer?.querySelector('.slide-description');

				if (titleContainer) {
					// Store all text elements for this slide
					const textElements = [];

					// Process main title
					if (mainTitle) {
						const mainTitleSplit = new SplitText(mainTitle, {
							type: 'words',
							wordsClass: 'word main-title-word',
						});
						textElements.push(...mainTitle.querySelectorAll('.word'));
					}

					// Process subtitle
					if (subTitle) {
						const subTitleSplit = new SplitText(subTitle, {
							type: 'words',
							wordsClass: 'word sub-title-word',
						});
						textElements.push(...subTitle.querySelectorAll('.word'));
					}

					// Process description
					if (description) {
						const descriptionSplit = new SplitText(description, {
							type: 'words',
							wordsClass: 'word description-word',
						});
						textElements.push(...description.querySelectorAll('.word'));
					}

					// Store all words for this slide
					carouselTextElements.current[index] = {
						container: titleContainer,
						words: textElements,
					};

					// Set initial state based on slide index
					if (index === 0) {
						// First slide: set words to blurred initially for animation
						gsap.set(textElements, {
							filter: 'blur(75px)',
							opacity: 0,
							autoAlpha: 0,
						});
						// Ensure container is visible
						gsap.set(titleContainer, {
							visibility: 'visible',
							opacity: 1,
						});
					} else {
						// Other slides: hide completely
						gsap.set(textElements, {
							filter: 'blur(75px)',
							opacity: 0,
							autoAlpha: 0,
						});
						gsap.set(titleContainer, {
							visibility: 'hidden',
							opacity: 0,
						});
					}
				}
			});

			// Initialize first slide text with animation
			const firstSlideData = carouselTextElements.current[0];
			if (firstSlideData && firstSlideData.words.length > 0) {
				gsap.to(firstSlideData.words, {
					filter: 'blur(0px)',
					opacity: 1,
					autoAlpha: 1,
					duration: 2,
					ease: 'power3.out',
					delay: 0.5,
				});
			}
		};

		if (document.fonts?.ready) {
			document.fonts.ready.then(initializeSplitText);
		} else {
			// Fallback for environments without font loading API
			setTimeout(initializeSplitText, 500);
		}

		return () => {
			// Cleanup split text instances
			splitTextInstances.current.forEach((instance) => {
				if (instance?.revert) instance.revert();
			});
			splitTextInstances.current = [];
		};
	}, [isMounted]);

	const updateActiveTextSlide = React.useCallback((newIndex: number) => {
		gsap.killTweensOf('.word');

		carouselTextElements.current.forEach((slideData, index) => {
			const words = slideData?.words;
			const container = slideData?.container;
			if (!words || !container) return;

			if (index !== newIndex) {
				// Hide inactive slide containers and blur words
				gsap.set(container, {
					visibility: 'hidden',
					opacity: 0,
				});
				gsap.set(words, {
					filter: 'blur(75px)',
					opacity: 0,
					autoAlpha: 0,
				});
			} else {
				// Show active slide container
				gsap.set(container, {
					visibility: 'visible',
					opacity: 1,
				});
			}
		});

		const currentSlideData = carouselTextElements.current[newIndex];
		const currentWords = currentSlideData?.words;
		if (currentWords && currentWords.length > 0) {
			// Ensure starting from blurred state
			gsap.set(currentWords, {
				filter: 'blur(75px)',
				opacity: 0,
				autoAlpha: 0,
			});

			gsap.to(currentWords, {
				filter: 'blur(0px)',
				opacity: 1,
				autoAlpha: 1,
				duration: 2,
				ease: 'power3.out',
				delay: 0.2,
				overwrite: true,
				onComplete: () => {
					gsap.set(currentWords, {
						filter: 'blur(0px)',
						opacity: 1,
					});
				},
			});
		}
	}, []);

	const animateSlide = React.useCallback(
		(direction: 'left' | 'right', newIndex: number) => {
			if (isAnimating || !carouselImagesRef.current) return;

			setIsAnimating(true);

			const currentSlide = carouselImagesRef.current.querySelector(
				'.img:last-child'
			) as HTMLElement;
			const currentSlideImage = currentSlide?.querySelector('img');

			const newSlideImgContainer = document.createElement('div');
			newSlideImgContainer.classList.add('img');
			const newSlideImg = document.createElement('img');
			newSlideImg.src = carouselSlides[newIndex].image;
			newSlideImg.alt = carouselSlides[newIndex].title;

			gsap.set(newSlideImg, {
				x: direction === 'left' ? -slideOffset : slideOffset,
			});

			newSlideImgContainer.appendChild(newSlideImg);
			carouselImagesRef.current.appendChild(newSlideImgContainer);

			const isMobile = window.innerWidth < 768;
			const ease = isMobile ? 'power2.inOut' : 'hop';
			const duration = isMobile ? 1 : 1.5;

			if (currentSlideImage) {
				gsap.to(currentSlideImage, {
					x: direction === 'left' ? slideOffset : -slideOffset,
					duration: duration,
					ease: ease,
				});
			}

			gsap.fromTo(
				newSlideImgContainer,
				{
					clipPath:
						direction === 'left'
							? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
							: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
				},
				{
					clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					duration: duration,
					ease: ease,
					onComplete: () => {
						// Cleanup old slides
						const imgElements =
							carouselImagesRef.current?.querySelectorAll('.img');
						if (imgElements && imgElements.length > 1) {
							for (let i = 0; i < imgElements.length - 1; i++) {
								imgElements[i].remove();
							}
						}
						setIsAnimating(false);
					},
				}
			);

			gsap.to(newSlideImg, {
				x: 0,
				duration: duration,
				ease: ease,
			});

			updateActiveTextSlide(newIndex);
		},
		[isAnimating, slideOffset, updateActiveTextSlide]
	);

	const handleNext = React.useCallback(() => {
		if (isAnimating) return;
		const newIndex = (currentIndex + 1) % carouselSlides.length;
		setCurrentIndex(newIndex);
		animateSlide('right', newIndex);
	}, [isAnimating, currentIndex, animateSlide]);

	const handlePrev = React.useCallback(() => {
		if (isAnimating) return;
		const newIndex =
			(currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
		setCurrentIndex(newIndex);
		animateSlide('left', newIndex);
	}, [isAnimating, currentIndex, animateSlide]);

	return (
		<div className='w-full h-svh after after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-purple-600/50 after:mix-blend-multiply after:z-0'>
			<div className='carousel' ref={carouselRef}>
				<div className='carousel-images' ref={carouselImagesRef}></div>

				{/* Render titles using React */}
				{carouselSlides.map((slide, index) => (
					<div
						key={slide.title}
						className={`slide-title-container ${
							index === 0 ? 'slide-active' : 'slide-inactive'
						}`}
						ref={(el) => {
							titleRefs.current[index] = el;
						}}>
						<h1
							style={{ fontFamily: 'Anton, serif' }}
							className='title text-6xl max-w-[20ch] leading-[1.1] xl:leading-[1.2] tracking-tight'
							ref={(el) => {
								mainTitleRefs.current[index] = el;
							}}>
							GrandFit
							<span className='heading-span tracking-tighter'>&Beauty</span>
						</h1>
						<h2
							className='subTitle tracking-tighter font-medium'
							ref={(el) => {
								subTitleRefs.current[index] = el;
							}}>
							Centar za pokret, oblikovanje i njegu.
						</h2>
						<p className='slide-description'>{slide.title}</p>
					</div>
				))}
			</div>

			<div className='slider-controls'>
				<button
					className='control-btn prev-btn'
					ref={prevBtnRef}
					onClick={handlePrev}
					disabled={isAnimating}>
					<ArrowLeft size={32} className='stroke-[#b39a67]' />
				</button>

				<button
					className='control-btn next-btn'
					ref={nextBtnRef}
					onClick={handleNext}
					disabled={isAnimating}>
					<ArrowRight size={32} className='stroke-[#b39a67]' />
				</button>
			</div>
		</div>
	);
};
export default HeroComponent;
