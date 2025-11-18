'use client';
import { X } from 'lucide-react';
import React from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

type Props = {};

const Faq = (props: Props) => {
	const [activeFaqIndex, setActiveFaqIndex] = React.useState<number | null>(
		null
	);
	const faqRefs = React.useRef<(HTMLDivElement | null)[]>([]);
	const contentRefs = React.useRef<(HTMLDivElement | null)[]>([]);

	const { contextSafe } = useGSAP();

	// Initialize FAQ content heights
	React.useEffect(() => {
		contentRefs.current.forEach((content) => {
			if (content) {
				gsap.set(content, {
					height: 0,
					overflow: 'hidden',
				});
			}
		});

		// Initialize icons
		faqRefs.current.forEach((faqItem) => {
			const icon = faqItem?.querySelector('svg');
			if (icon) {
				gsap.set(icon, { rotation: 0 });
			}
		});
	}, []);
	const handleOpenFAQ = contextSafe((index: number) => {
		const currentContent = contentRefs.current[index];
		const currentIcon = faqRefs.current[index]?.querySelector('svg');

		if (!currentContent || !currentIcon) return;

		// If clicking on already active FAQ, close it
		if (activeFaqIndex === index) {
			// Close current FAQ
			gsap.to(currentContent, {
				height: 0,
				duration: 0.4,
				ease: 'power2',
				onComplete: () => {
					currentContent.style.overflow = 'hidden';
				},
			});

			// Rotate icon back
			gsap.to(currentIcon, {
				rotation: 0,
				duration: 0.3,
				ease: 'power2.inOut',
			});

			setActiveFaqIndex(null);
			return;
		}

		// Close previously active FAQ if exists
		if (activeFaqIndex !== null) {
			const prevContent = contentRefs.current[activeFaqIndex];
			const prevIcon = faqRefs.current[activeFaqIndex]?.querySelector('svg');

			if (prevContent && prevIcon) {
				gsap.to(prevContent, {
					height: 0,
					duration: 0.3,
					ease: 'power2.inOut',
				});

				gsap.to(prevIcon, {
					rotation: 0,
					duration: 0.3,
					ease: 'power2.inOut',
				});
			}
		}

		// Open new FAQ
		// First set content visible and measure natural height
		currentContent.style.overflow = 'visible';
		currentContent.style.height = 'auto';
		const naturalHeight = currentContent.scrollHeight;
		currentContent.style.height = '0px';

		// Animate to natural height
		gsap.to(currentContent, {
			height: naturalHeight,
			duration: 0.5,
			ease: 'power2.out',
			onComplete: () => {
				currentContent.style.height = 'auto';
			},
		});

		// Rotate icon
		gsap.to(currentIcon, {
			rotation: 45,
			duration: 0.3,
			ease: 'power2.inOut',
		});

		setActiveFaqIndex(index);
	});

	return (
		<div className='w-full h-[85vh] bg-(--green) text-[#ceeec6] flex flex-col justify-center gap-8 items-center'>
			{' '}
			<div className='flex max-w-3xl flex-col gap-6 items-center'>
				{' '}
				<h3 className='text-7xl tracking-tight font-semibold max-w-[40ch]'>
					Najčešća pitanja
				</h3>
				{/* <p className='text-lg max-w-[45ch] text-center'>
					Često nam postavljate pitanja o našim uslugama. Ovdje smo da
					odgovorimo na neka od najčešćih. Za sva dodatna pitanja slobodno nas
					kontaktirajte.
				</p> */}
			</div>
			<div className='faq-wrapper grid grid-cols-1 gap-4 max-w-[90vw] mx-auto'>
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						onClick={() => handleOpenFAQ(index)}
						key={index}
						ref={(el) => {
							faqRefs.current[index] = el;
						}}
						className='faq-item before before:content-[""] after after:absolute after:content-[""] after:w-full after:h-full after:left-0 after:top-0 before:absolute before:w-full before:h-full before:bg-(--darkGreen) bg-(--green) after:bg-(--green) z-10 border border-(--darkGreen) before:-top-2 before:-left-2 p-4 pb-1 cursor-pointer transition-colors duration-300 relative'>
						<div className='flex justify-between items-center'>
							<h4
								className='text-xl mb-2 text-white relative z-10'
								style={{ fontFamily: 'Lora, serif' }}>
								Pitanje {index + 1}?
							</h4>
							<X size={16} className='opacity-50 text-white z-10' />
						</div>
						<div
							ref={(el) => {
								contentRefs.current[index] = el;
							}}
							className='faq-content-hidden overflow-hidden z-10 relative'
							style={{ height: 0 }}>
							<p className='text-base pb-4 max-w-[65ch]'>
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
	);
};

export default Faq;
