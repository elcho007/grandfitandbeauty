'use client';
import { X, Plus } from 'lucide-react';
import React from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../../lib/gsap';

const Faq = () => {
	const [activeFaqIndex, setActiveFaqIndex] = React.useState<number | null>(
		null
	);
	const [isInitialized, setIsInitialized] = React.useState(false);
	const faqRefs = React.useRef<(HTMLDivElement | null)[]>([]);
	const contentRefs = React.useRef<(HTMLDivElement | null)[]>([]);
	const faqRef = React.useRef<HTMLDivElement | null>(null);

	const { contextSafe } = useGSAP();

	// Initialize FAQ content heights immediately - only once on mount
	React.useLayoutEffect(() => {
		contentRefs.current.forEach((content, index) => {
			if (content) {
				// Force all FAQs to start closed with GSAP
				gsap.set(content, {
					height: 0,
					overflow: 'hidden',
					visibility: 'hidden',
					maxHeight: 0,
				});
			}
		});
		setIsInitialized(true);
	}, []); // Empty dependency array - run only once on mount
	const handleOpenFAQ = contextSafe((index: number) => () => {
		const currentContent = contentRefs.current[index];

		if (!currentContent) return;

		// If clicking on already active FAQ, close it
		if (activeFaqIndex === index) {
			// Close current FAQ
			gsap.to(currentContent, {
				height: 0,
				duration: 0.4,
				ease: 'power2.out',
				onComplete: () => {
					gsap.set(currentContent, {
						overflow: 'hidden',
						visibility: 'hidden',
						maxHeight: 0,
					});
				},
			});

			setActiveFaqIndex(null);
			return;
		}

		// Close previously active FAQ if exists
		if (activeFaqIndex !== null) {
			const prevContent = contentRefs.current[activeFaqIndex];

			if (prevContent) {
				gsap.to(prevContent, {
					height: 0,
					duration: 0.4,
					ease: 'power2.out',
					onComplete: () => {
						gsap.set(prevContent, {
							overflow: 'hidden',
							visibility: 'hidden',
							maxHeight: 0,
						});
					},
				});
			}
		}

		// Open new FAQ
		// First set up visibility and measure natural height
		gsap.set(currentContent, {
			visibility: 'visible',
			overflow: 'visible',
			maxHeight: 'none',
			height: 'auto',
		});
		const naturalHeight = currentContent.scrollHeight;
		gsap.set(currentContent, {
			height: 0,
		});

		// Animate to natural height
		gsap.to(currentContent, {
			height: naturalHeight,
			duration: 0.5,
			ease: 'power2.out',
			onComplete: () => {
				currentContent.style.height = 'auto';
			},
		});

		setActiveFaqIndex(index);
	});

	useGSAP(
		() => {
			if (!faqRef.current) return;
			const mm = gsap.matchMedia();

			mm.add('(max-width: 768px)', () => {
				const anim = gsap.fromTo(
					faqRef.current,
					{
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 0,
					},
					{
						borderBottomLeftRadius: '1rem',
						borderBottomRightRadius: '1rem',
						scrollTrigger: {
							trigger: faqRef.current,
							start: 'bottom bottom',
							end: 'bottom center',
							scrub: true,
						},
					}
				);
			});

			mm.add('(min-width: 769px)', () => {
				const anim = gsap.fromTo(
					faqRef.current,
					{
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 0,
					},
					{
						borderBottomLeftRadius: '3rem',
						borderBottomRightRadius: '3rem',
						scrollTrigger: {
							trigger: faqRef.current,
							start: 'bottom bottom',
							end: 'bottom center',
							scrub: true,
						},
					}
				);
			});

			return () => {
				mm.revert();
			};
		},
		{ scope: faqRef }
	);

	return (
		<div
			ref={faqRef}
			className='w-full min-h-screen bg-(--black) flex flex-col justify-center md:items-center gap-8 px-[5vw] py-[10vh] md:py-[5vw] relative text-[#bcbcbc] z-10'>
			<h2
				className={`text-2xl md:text-5xl tracking-normal max-w-[25ch] leading-[1.3]`}
				style={{ fontFamily: 'Anton, sans-serif' }}>
				Najčešća pitanja
			</h2>
			<div className='flex w-full flex-col md:flex-row gap-4 md:gap-8 min-h-[60vh] items-center md:justify-center'>
				<div className='flex w-full max-w-full md:max-w-md flex-col gap-3 md:gap-6 bg-[#bcbcbc] text-black p-4 md:p-6 rounded-lg h-full justify-center flex-1'>
					{' '}
					<h3
						className='text-xl md:text-4xl tracking-tight leading-[1.3] max-w-full md:max-w-[15ch] text-black'
						style={{ fontFamily: 'Anton, sans-serif' }}>
						Ovo su neka od najčešćih pitanja koja nam postavljaju naši klijenti.
					</h3>
					<h4 className='text-black'>Imate li dodatnih pitanja?</h4>
					<button className='bg-black px-3 py-2 rounded-sm max-w-max text-gray-100'>
						Kontaktirajte nas
					</button>
				</div>
				<div className='faq-wrapper grid grid-cols-1 gap-2 md:gap-4 max-w-full md:max-w-[35vw]'>
					{Array.from({ length: 5 }).map((_, index) => (
						<div
							onClick={handleOpenFAQ(index)}
							key={index}
							ref={(el) => {
								faqRefs.current[index] = el;
							}}
							className='faq-item z-10 border md:border border-dashed border-gray-300 rounded-lg p-4 cursor-pointer transition-colors duration-300 relative flex flex-col justify-center overflow-hidden'>
							<div className='flex justify-between items-center gap-16'>
								<h4
									className='text-sm font-semibold md:font-medium md:text-xl text-gray-300 relative z-10'
									style={{ fontFamily: 'Lora, serif' }}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
								</h4>
								{activeFaqIndex === index ? (
									<X size={32} className='opacity-75 text-gray-300 z-10' />
								) : (
									<Plus size={32} className='opacity-75 text-gray-300 z-10' />
								)}
							</div>
							<div
								ref={(el) => {
									contentRefs.current[index] = el;
								}}
								className='z-10 relative'
								style={{
									height: 0,
									maxHeight: 0,
									overflow: 'hidden',
									visibility: 'hidden',
									display:
										isInitialized && activeFaqIndex !== index
											? 'block'
											: isInitialized
											? 'block'
											: 'none',
								}}>
								<p className='text-base py-4 max-w-[65ch] text-gray-300'>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Dolorem tenetur veritatis error, cumque asperiores fuga
									doloremque ipsa facilis est quam, aliquam possimus quaerat
									dolorum excepturi sed voluptatum tempore minima ut similique
									corporis! Consequatur eum debitis vero ipsa delectus deserunt
									quae minima, commodi nisi, tempore nobis?
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Faq;
