'use client';
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function LenisScroller({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const lenis = useLenis();

	// Reset scroll on route change using Lenis API
	useEffect(() => {
		// Force immediate scroll to top using native browser API
		window.scrollTo(0, 0);

		if (lenis) {
			// Stop any ongoing animation
			lenis.stop();
			// Immediately scroll to top with Lenis
			lenis.scrollTo(0, { immediate: true, force: true });
			// Small delay before restarting to ensure scroll position is reset
			requestAnimationFrame(() => {
				lenis.start();
			});
		}
	}, [pathname, lenis]);

	return <>{children}</>;
}

export function ClientLenisProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// Return children without Lenis during SSR
	if (!isClient) {
		return <>{children}</>;
	}

	// Only render Lenis on client side
	return (
		<ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
			<LenisScroller>{children}</LenisScroller>
		</ReactLenis>
	);
}
