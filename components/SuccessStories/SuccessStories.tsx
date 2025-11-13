'use client';
import Image from 'next/image';
import React from 'react';

const stories = [
	{
		title: 'Ivanova transformacija',
		description:
			'Ivan je uspio izgubiti 15 kilograma i značajno poboljšati svoju kondiciju uz naš program.',
		image: '/images/story1.jpg',
		startWeight: 95,
		endWeight: 80,
		duration: '3 mjeseca',
		misicnaMasa: +5,
		fatLoss: -15,
	},
	{
		title: 'Anina priča',
		description:
			'Ana je ostvarila svoje fitness ciljeve i sada se osjeća bolje nego ikada prije.',
		image: '/images/story2.jpg',
		startWeight: 96,
		endWeight: 72,
		duration: '4 mjeseca',
		misicnaMasa: +3,
		fatLoss: -18,
	},
	{
		title: 'Marko Mornar',
		description:
			'Marko je pronašao novu strast za vježbanjem i postao je inspiracija drugima.',
		image: '/images/story3.jpg',
		startWeight: 145,
		endWeight: 120,
		duration: '5 mjeseci',
		misicnaMasa: +8,
		fatLoss: -20,
	},
	{
		title: 'Lina i snaga volje',
		description:
			'Lina je uspjela izgraditi mišićnu masu i poboljšati svoje zdravlje kroz naš program.',
		image: '/images/story4.jpg',
		startWeight: 88,
		endWeight: 70,
		duration: '4 mjeseca',
		misicnaMasa: +6,
		fatLoss: -14,
	},
];

type Props = {};

const SuccessStories = (props: Props) => {
	const [activeStoryIndex, setActiveStoryIndex] = React.useState(0);

	const handleActiveStoryChange = (index: number) => {
		setActiveStoryIndex(index);
	};

	return (
		<div className='w-full min-h-screen bg-[#f3bb20] p-[5vw] flex flex-col gap-8'>
			<div className='grid grid-cols-4 gap-8 w-full overflow-hidden'>
				<div className='col-span-1 w-full flex flex-col gap-2'>
					<h2
						className='text-4xl font-bold mb-4 '
						style={{ fontFamily: 'Anton, sans-serif' }}>
						Uspješne priče
					</h2>
					<p className='text-lg max-w-3xl mb-4'>
						Pogledajte kako su naši klijenti transformisali svoje živote uz naše
						program. Njihove priče su inspiracija za sve koji žele postići svoje
						ciljeve.
					</p>
					<h3
						className='text-xl tracking-tight  mb-2'
						style={{ fontFamily: 'Anton, sans-serif' }}>
						Vec danas sa nama ispisite svoju pricu.
					</h3>
					<p>
						citat Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Corporis aliquam quidem dicta debitis dolore. Incidunt fuga voluptas
						dolor adipisci impedit?
					</p>
				</div>
				<div className='relative w-full h-[600px] col-span-3'>
					<Image
						src={stories[activeStoryIndex].image}
						alt='Workout Image'
						fill
						className='object-cover'
					/>
					<div className='story-stats absolute z-10 bottom-0 left-0 w-full mt-auto flex flex-col gap-2 p-4'>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 rounded-sm w-full flex max-w-max text-lg'>
							<span className='font-semibold tracking-tight'>
								{stories[activeStoryIndex].title}
							</span>
						</div>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 rounded-sm w-full flex gap-4 max-w-max text-sm'>
							<span>Pocetna kilaza: </span>
							<span>{stories[activeStoryIndex].startWeight}</span>
						</div>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 rounded-sm w-full flex gap-4 max-w-max text-sm'>
							<span>Kilaza nakon programa: </span>
							<span>{stories[activeStoryIndex].endWeight}</span>
						</div>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 rounded-sm w-full flex gap-4 max-w-max text-sm'>
							<span>Trajanje programa: </span>
							<span>{stories[activeStoryIndex].duration}</span>
						</div>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 rounded-sm w-full flex gap-4 max-w-max text-sm'>
							<span>Povecanje misicne mase: </span>
							<span>{stories[activeStoryIndex].misicnaMasa} kg</span>
						</div>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 rounded-sm w-full flex gap-4 max-w-max text-sm'>
							<span>Gubitak masnog tkiva: </span>
							<span>{stories[activeStoryIndex].fatLoss} kg</span>
						</div>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-4 gap-8 w-full'>
				<div className='flex gap-4 col-span-2 -col-start-1 w-full justify-end'>
					<div
						onClick={() => handleActiveStoryChange(0)}
						className='min-w-48 aspect-4/3 bg-[#171717] rounded-sm flex flex-1 relative'>
						<Image
							src={'/images/story1.jpg'}
							fill
							alt='Transformacija Tijela Ivana'
						/>
					</div>
					<div
						onClick={() => handleActiveStoryChange(1)}
						className='max-w-48 aspect-4/3 bg-[#171717] rounded-sm flex flex-1 relative'>
						<Image
							src={'/images/story2.jpg'}
							fill
							alt='Transformacija Tijela Ivana'
						/>
					</div>
					<div
						onClick={() => handleActiveStoryChange(2)}
						className='max-w-48 aspect-4/3 bg-[#171717] rounded-sm flex flex-1 relative'>
						<Image
							src={'/images/story3.jpg'}
							fill
							alt='Transformacija Tijela Ivana'
						/>
					</div>
					<div
						onClick={() => handleActiveStoryChange(3)}
						className='max-w-48 aspect-4/3 bg-[#171717] rounded-sm flex flex-1 relative'>
						<Image
							src={'/images/story4.jpg'}
							fill
							alt='Transformacija Tijela Ivana'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SuccessStories;
