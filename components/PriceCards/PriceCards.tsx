'use client';
import ClientButton from './ClientButton';
import AnimatedPriceCards from './AnimatedPriceCards';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';
import React from 'react';

type Props = {};

const PriceCards = (props: Props) => {
	const [activeIndex, setActiveIndex] = React.useState<number>(0);
	return (
		<div
			className={`w-full min-h-screen ${
				activeIndex === 0 ? 'bg-pink-300' : 'bg-(--green)'
			} flex justify-center items-center py-[5vw]`}>
			<div className='w-[90vw] mx-auto min-h-1/2 flex flex-col items-center gap-8'>
				<button
					className='cursor-pointer'
					onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}>
					<span
						className={`text-sm tracking-tight uppercase font-semibold text-gray-200 ${
							activeIndex === 0 ? 'bg-pink-600' : 'bg-(--darkGreen)'
						} p-3 rounded-lg`}>
						{activeIndex === 0
							? 'vidi cjenik za fitness'
							: 'vidi cjenik za beauty'}
					</span>
				</button>
				<GSAPSplitTextComponent ease={'power2'}>
					<h2
						className='text-5xl tracking-normal max-w-[25ch] leading-[1.3] text-gray-950 text-center uppercase'
						style={{ fontFamily: 'Anton, sans-serif' }}>
						Izaberite program ili uslugu koja vam najviše odgovara
					</h2>
				</GSAPSplitTextComponent>
				{/* <ClientButton>Fitness Cjenik</ClientButton> */}

				<AnimatedPriceCards activeIndex={activeIndex} />
			</div>
		</div>
	);
};

export default PriceCards;
