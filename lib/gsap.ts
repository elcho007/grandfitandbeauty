// Centralized GSAP configuration and imports
// Import once, use everywhere to reduce bundle size
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Draggable } from 'gsap/Draggable';
import { Observer } from 'gsap/Observer';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

// Register all plugins once
gsap.registerPlugin(
	ScrollTrigger,
	SplitText,
	CustomEase,
	InertiaPlugin,
	Draggable,
	Observer,
	Flip
);

// Export the configured GSAP instance and plugins
export {
	gsap,
	ScrollTrigger,
	SplitText,
	CustomEase,
	InertiaPlugin,
	Draggable,
	Observer,
	Flip,
	useGSAP,
};

// Export default as gsap for backward compatibility
export default gsap;
