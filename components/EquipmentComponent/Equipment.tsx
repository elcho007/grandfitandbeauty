'use client';

import Image from 'next/image';
import React from 'react';

import { Draggable, gsap, useGSAP } from '@/lib/gsap';

const equipment = [
	{
		id: 1,
		name: 'RitFit Cage Station',
		brand: 'RitFit',
		imgUrl: '/images/equipment/equipment1.png',
	},
	{
		id: 2,
		name: 'eConcept Rowing Machine',
		brand: 'eConcept',
		imgUrl: '/images/equipment/equipment2.png',
	},
	{
		id: 3,
		name: 'TechnoGym Treadmill',
		brand: 'Technogym',
		imgUrl: '/images/equipment/equipment3.png',
	},
	{
		id: 4,
		name: 'Leg Press Machine',
		brand: 'FitnessPro',
		imgUrl: '/images/equipment/equipment4.png',
	},
	{
		id: 5,
		name: 'Titan Station',
		brand: 'Titan',
		imgUrl: '/images/equipment/equipment5.png',
	},
	{
		id: 6,
		name: 'Smith Machine',
		brand: 'FitnessPro',
		imgUrl: '/images/equipment/equipment6.png',
	},
];

const Equipment = () => {
	const dragBoundsRef = React.useRef<HTMLDivElement>(null);
	const gridRef = React.useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add('(max-width: 767px)', () => {
				const boundsEl = dragBoundsRef.current;
				const targetEl = gridRef.current;
				if (!boundsEl || !targetEl) return;

				gsap.set(targetEl, { x: 0 });

				const getBounds = () => {
					const containerWidth = boundsEl.offsetWidth;
					const contentWidth = targetEl.scrollWidth || targetEl.offsetWidth;

					const maxX = 0;
					const minX = Math.min(0, containerWidth - contentWidth);

					return { minX, maxX };
				};

				const [draggable] = Draggable.create(targetEl, {
					type: 'x',
					bounds: getBounds(),
					inertia: true,
					resistance: 0.25,
					edgeResistance: 0.9,
					cursor: 'grab',
					activeCursor: 'grabbing',
					dragClickables: true,
				});

				const resizeObserver = new ResizeObserver(() => {
					const bounds = getBounds();
					draggable.applyBounds(bounds);
					draggable.update(true);
				});
				resizeObserver.observe(boundsEl);

				return () => {
					resizeObserver.disconnect();
					draggable.kill();
					gsap.set(targetEl, { clearProps: 'transform' });
				};
			});

			return () => mm.revert();
		},
		{ scope: dragBoundsRef }
	);

	return (
		<div className='w-full min-h-[80vh] bg-(--gold) flex flex-col gap-8 py-10 xl:py-0 px-4 xl:px-20 justify-center overflow-hidden'>
			<div className='flex flex-col gap-4'>
				<h3
					style={{ fontFamily: 'Anton, sans-serif' }}
					className='text-xl md:text-3xl tracking-normal max-w-lg leading-[1.3]'>
					Vrhunska oprema odabrana u skladu sa potrebama naših klijenata
				</h3>
				<p className='text-base tracking-tight leading-snug max-w-sm'>
					Sva oprema u našem centru dolazi od renomiranih proizvođača i najvišeg
					je kvaliteta. Kod nas možete koristiti sprave prizvođača TechnoGym,
					Rogue, Nautilus i drugih.
				</p>
			</div>
			<div>
				<div ref={dragBoundsRef}>
					<div
						ref={gridRef}
						className='flex whitespace-nowrap xl:grid grid-cols-6 gap-2 xl:gap-4'>
						{equipment.map((item) => (
							<div
								key={item.id}
								className='flex flex-col relative h-96 w-64 items-start justify-end p-2 xl:w-full shrink-0'>
								<Image
									fill
									src={item.imgUrl}
									alt={item.name}
									className='object-cover'
								/>
								<h3 className='text-lg relative z-10 text-white'>
									{item.name}
								</h3>
								<p className='text-sm relative z-10 text-white'>{item.brand}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Equipment;
