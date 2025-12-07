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
					className='cursor-pointer flex gap-2 rounded-full border border-(--gold) items-center w-38 h-10 justify-between relative overflow-hidden'
					onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}>
					<span
						className={`${
							activeIndex === 1 ? 'text-[#1a1a1a]' : 'text-[#9d9d9d]'
						} text-xs tracking-tight uppercase font-medium relative z-10 flex rounded-full px-3 w-24 h-10 items-center justify-center `}>
						{' '}
						fitness
					</span>
					<span
						className={`absolute w-1/2 h-full flex bg-(--gold) rounded-full border border-(--gold) z-0 transition-all duration-300 ease-out transform ${
							activeIndex === 1 ? 'translate-x-0' : 'translate-x-full'
						}`}></span>
					<span
						className={`${
							activeIndex === 1 ? 'text-[#9d9d9d]' : 'text-[#1a1a1a]'
						} text-xs tracking-tight uppercase font-medium relative z-10 flex rounded-full px-3 w-24 h-10 items-center justify-center `}>
						beauty
					</span>
				</button>
				{/* <ClientButton>Fitness Cjenik</ClientButton> */}

				<AnimatedPriceCards key={activeIndex} activeIndex={activeIndex} />
			</div>
		</div>
	);
};

export default PriceCards;
