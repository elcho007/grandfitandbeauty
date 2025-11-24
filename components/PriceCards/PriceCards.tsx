'use client';
import ClientButton from './ClientButton';
import AnimatedPriceCards from './AnimatedPriceCards';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';
import React from 'react';

type Props = {};

const PriceCards = (props: Props) => {
	const [activeIndex, setActiveIndex] = React.useState<number>(1);
	return (
		<div
			className={`w-full min-h-[130svh] md:min-h-screen overflow-hidden ${
				activeIndex === 0 ? 'bg-(--black)' : 'bg-(--black)'
			} flex justify-center items-center py-[5vw]`}>
			<div className='w-[90vw] mx-auto min-h-1/2 flex flex-col items-center gap-4 md:gap-8'>
				<GSAPSplitTextComponent ease={'power2'}>
					<h2
						className={`text-2xl md:text-5xl tracking-normal max-w-[25ch] leading-[1.3] ${
							activeIndex === 0 ? 'text-[#b39a67]' : 'text-[#b39a67]'
						} text-center`}
						style={{ fontFamily: 'Anton, sans-serif' }}>
						Izaberite program ili uslugu koja vam najviše odgovara
					</h2>
				</GSAPSplitTextComponent>
				<button
					className='cursor-pointer'
					onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}>
					<span
						className={`text-xs tracking-tight uppercase font-medium text-gray-200 mb-4 flex ${
							activeIndex === 0 ? 'bg-[#b39a67]' : 'bg-[#b39a67]'
						} px-2 py-1 rounded-full`}>
						{activeIndex === 0
							? 'vidi cjenik za fitness'
							: 'vidi cjenik za beauty'}
					</span>
				</button>
				{/* <ClientButton>Fitness Cjenik</ClientButton> */}

				<AnimatedPriceCards key={activeIndex} activeIndex={activeIndex} />
			</div>
		</div>
	);
};

export default PriceCards;
