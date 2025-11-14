'use client';
import Image from 'next/image';
import React from 'react';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';

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
			<div className='grid grid-cols-4 gap-8 w-full'>
				<div className='col-span-1 w-full flex flex-col'>
					<GSAPSplitTextComponent
						ease={'expo'}
						start={'top bottom'}
						duration={1}>
						<h3
							className='text-[3.5vw] mb-4 tracking-tight'
							style={{ fontFamily: 'Anton, sans-serif' }}>
							Uspješne priče
						</h3>
					</GSAPSplitTextComponent>
					<h4
						className='text-xl tracking-tight  mb-2'
						style={{ fontFamily: 'Anton, sans-serif' }}>
						Ovo može biti vaša priča.{' '}
					</h4>
					<p className='text-base tracking-tight max-w-3xl mb-4'>
						Pogledajte kako su naši klijenti transformisali svoje živote uz naše
						program. Njihove priče su inspiracija za sve koji žele postići svoje
						ciljeve.
					</p>
					<button className='bg-black text-white max-w-max text-base px-3 py-2 before:content-[""] before:absolute before:inset-0 before:bg-(--green) before:top-1 before:left-1 before:w-full before:h-full before before:-z-10 z-10 relative mb-4 after after:content-[""] after:absolute after:inset-0 after:bg-black after:w-full after:h-full after:z-[-2] '>
						Prijavite se već danas
					</button>
					<p
						className='mt-auto tracking-tighter'
						style={{ fontFamily: 'Lora, serif' }}>
						"Strength does not come from physical capacity. It comes from an
						indomitable will." – Mahatma Gandhi
					</p>
				</div>
				<div className='relative w-full h-[600px] col-start-2 col-span-3 border '>
					<Image
						src={stories[activeStoryIndex].image}
						alt='Workout Image'
						fill
						className='object-cover'
					/>
					<div className='story-stats absolute z-10 bottom-0 left-0 w-full mt-auto flex flex-col gap-2 p-4'>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 w-full flex max-w-max text-lg'>
							<span className='font-semibold tracking-tight'>
								{stories[activeStoryIndex].title}
							</span>
						</div>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 w-full flex gap-4 max-w-max text-sm'>
							<span>Početna kilaža: </span>
							<span>{stories[activeStoryIndex].startWeight}</span>
						</div>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 w-full flex gap-4 max-w-max text-sm'>
							<span>Kilaža nakon programa: </span>
							<span>{stories[activeStoryIndex].endWeight}</span>
						</div>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 w-full flex gap-4 max-w-max text-sm'>
							<span>Trajanje programa: </span>
							<span>{stories[activeStoryIndex].duration}</span>
						</div>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 w-full flex gap-4 max-w-max text-sm'>
							<span>Povećanje mišićne mase: </span>
							<span>{stories[activeStoryIndex].misicnaMasa} kg</span>
						</div>
						<div className='stat-item bg-[#03a554] text-white px-4 py-2 w-full flex gap-4 max-w-max text-sm'>
							<span>Gubitak masnog tkiva: </span>
							<span>{stories[activeStoryIndex].fatLoss} kg</span>
						</div>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-4 gap-8 w-full'>
				<div className='flex gap-2 col-span-3 col-start-2 w-full justify-end overflow-hidden'>
					<div
						onClick={() => handleActiveStoryChange(0)}
						className='w-48 h-40 bg-[#171717] rounded-sm flex relative flex-1'>
						<Image
							src={'/images/story1.jpg'}
							fill
							alt='Transformacija Tijela Ivana'
							className='object-cover'
						/>
					</div>
					<div
						onClick={() => handleActiveStoryChange(1)}
						className='w-48 h-40 bg-[#171717] rounded-sm flex relative flex-1'>
						<Image
							src={'/images/story2.jpg'}
							fill
							alt='Transformacija Tijela Ivana'
							className='object-cover'
						/>
					</div>
					<div
						onClick={() => handleActiveStoryChange(2)}
						className='w-48 h-40 bg-[#171717] rounded-sm flex relative flex-1'>
						<Image
							src={'/images/story3.jpg'}
							fill
							alt='Transformacija Tijela Ivana'
							className='object-cover'
						/>
					</div>
					<div
						onClick={() => handleActiveStoryChange(3)}
						className='w-48 h-40 bg-[#171717] rounded-sm flex relative flex-1'>
						<Image
							src={'/images/story4.jpg'}
							fill
							alt='Transformacija Tijela Ivana'
							className='object-cover'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SuccessStories;
