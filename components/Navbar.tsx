'use client';
import { formatTimeAndDate } from '@/utils/formatTimeAndDate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import SplitTextComponent from './SplitTextComponent/SplitTextComponent';

import Logo from '@/public/images/gfblogo.svg';

type Props = {};

const links = [
	{ name: 'Home', href: '/' },
	{ name: 'O nama', href: '/o-nama' },
	{ name: 'Usluge', href: '/usluge' },
	{ name: 'Kontakt', href: '/kontakt' },
	{ name: 'Transformacije', href: '/transformacije' },
];

const Navbar = (props: Props) => {
	const hamburgerRef = React.useRef<HTMLButtonElement>(null);
	const [menuOpen, setMenuOpen] = React.useState(false);
	const [showText, setShowText] = React.useState(false);
	const [reverseText, setReverseText] = React.useState(false);
	const timelineRef = React.useRef<gsap.core.Timeline | null>(null);
	const completedAnimations = React.useRef(0);

	const handleTextAnimationComplete = () => {
		completedAnimations.current += 1;
		if (completedAnimations.current >= links.length && reverseText) {
			// All text animations completed, now close the menu
			timelineRef.current?.reverse();
			setShowText(false);
			setReverseText(false);
		}
	};

	useGSAP(() => {
		if (!hamburgerRef.current) return;
		const hamburger = hamburgerRef.current;

		// Set initial state explicitly
		gsap.set('.nav-links', {
			height: '100svh',
			autoAlpha: 0,
			y: '-110%',
		});

		const tl = gsap.timeline({
			paused: true,
			reversed: true,
			ease: 'power2.inOut',
		});

		timelineRef.current = tl;

		tl.to('.hamburger-menuToggle span:nth-child(1)', {
			y: 3,
			transformOrigin: 'center center',
			duration: 0.3,
		})
			.to(
				'.hamburger-menuToggle span:nth-child(2)',
				{
					y: -3,
					transformOrigin: 'center center',
					duration: 0.3,
				},
				'<'
			)
			.to(
				'.nav-links',
				{
					y: '0%',
					visibility: 'visible',
					autoAlpha: 1,
					duration: 0.5,
					ease: 'power2.out',
					onComplete: () => {
						// Trigger text animation when menu fully opens
						setShowText(true);
					},
					onReverseComplete: () => {
						// Hide text when menu closes
						setShowText(false);
					},
				},
				'<'
			);

		const toggleMenu = () => {
			if (tl.reversed()) {
				// Opening menu
				setReverseText(false);
				setShowText(false);
				tl.play();
				setMenuOpen(true);
			} else {
				// Closing menu - trigger reverse animation
				setReverseText(true);
				setShowText(true); // Keep showing text but in reverse mode
				completedAnimations.current = 0; // Reset counter
				setMenuOpen(false);
			}
		};

		hamburger.addEventListener('click', toggleMenu);
		return () => {
			hamburger.removeEventListener('click', toggleMenu);
			timelineRef.current = null;
		};
	});

	return (
		<div className='absolute h-20 w-full z-30'>
			<nav className='flex items-center justify-between px-[5vw] mx-auto h-20 bg-transparent  text-white z-20 relative w-full'>
				<div>
					<Link href='/'>
						<Image src={Logo} alt='Logo' width={50} height={50} />
					</Link>
				</div>

				<button
					ref={hamburgerRef}
					className='hamburger-menuToggle flex flex-col justify-center items-center gap-1 w-8 h-8 ml-4'>
					<span className='w-full h-0.5 bg-[#cebd92]'></span>
					<span className='w-full h-0.5 bg-[#cebd92]'></span>
				</button>
			</nav>
			<div className='nav-links absolute right-0 top-0 w-full bg-black text-white px-[5vw] pt-[5vw] z-0 overflow-hidden'>
				<ul
					className='flex flex-col gap-4 mt-24'
					style={{ fontFamily: 'Anton, sans-serif' }}>
					{links.map((link, index) => (
						<SplitTextComponent
							key={`${link.href}-${showText}-${reverseText}`}
							stagger={0.01}
							delay={showText ? index * 0.1 : 999}
							reverse={reverseText}
							onComplete={handleTextAnimationComplete}>
							<li
								className='text-4xl tracking-tight leading-[1.2] text-[#cebd92]'
								key={link.href}>
								<Link href={link.href}>{link.name}</Link>
							</li>
						</SplitTextComponent>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
