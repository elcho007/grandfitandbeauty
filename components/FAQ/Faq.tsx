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
			const anim = gsap.fromTo(
				faqRef.current,
				{
					borderBottomLeftRadius: 0,
					borderBottomRightRadius: 0,
				},
				{
					borderBottomLeftRadius: '4rem',
					borderBottomRightRadius: '4rem',
					scrollTrigger: {
						trigger: faqRef.current,
						start: 'bottom bottom',
						end: 'bottom center',
						scrub: true,
					},
				}
			);

			return () => {
				anim.kill();
			};
		},
		{ scope: faqRef }
	);

	return (
		<div
			ref={faqRef}
			className='w-full h-screen bg-gray-300 flex justify-center gap-8 items-center px-[5vw] py-[5vw] relative z-10'>
			<div className='flex gap-8 min-h-[60vh] items-center'>
				<div className='flex max-w-3xl flex-col gap-6 bg-(--green) p-6 rounded-lg h-full justify-center flex-1'>
					{' '}
					<h3
						className='text-5xl tracking-tight leading-[1.3] max-w-[15ch] text-green-950'
						style={{ fontFamily: 'Anton, sans-serif' }}>
						Ovo su neka od najčešćih pitanja koja nam postavljaju naši klijenti.
					</h3>
					<h4 className='text-green-100'>Imate li dodatnih pitanja?</h4>
					<button className='bg-green-950 px-3 py-2 rounded-sm max-w-max text-green-100'>
						Kontaktirajte nas
					</button>
				</div>
				<div className='faq-wrapper grid grid-cols-1 gap-4 max-w-[35vw]'>
					{Array.from({ length: 5 }).map((_, index) => (
						<div
							onClick={handleOpenFAQ(index)}
							key={index}
							ref={(el) => {
								faqRefs.current[index] = el;
							}}
							className='faq-item z-10 border border-dashed border-green-950 rounded-lg p-4 cursor-pointer transition-colors duration-300 relative flex flex-col justify-center overflow-hidden'>
							<div className='flex justify-between items-center gap-16'>
								<h4
									className='text-xl text-green-950 relative z-10'
									style={{ fontFamily: 'Lora, serif' }}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
									doloribus.
								</h4>
								{activeFaqIndex === index ? (
									<X size={32} className='opacity-75 text-green-950 z-10' />
								) : (
									<Plus size={32} className='opacity-75 text-green-950 z-10' />
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
								<p className='text-base py-4 max-w-[65ch] text-green-950'>
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
