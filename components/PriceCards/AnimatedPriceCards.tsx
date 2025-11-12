'use client';
import React from 'react';
import FadeIn from '../FadeIn/FadeIn';

type Props = {};

const beautyPriceCards = [
	{
		title: 'Osnovni Paket',
		price: '€90',
		features: [
			'Konzultacija',
			'Osnovni tretman lica',
			'Savjeti za njegu kože kod kuće',
		],
	},
	{
		title: 'Napredni Paket',
		price: '€120',
		features: [
			'Konzultacija',
			'Dubinsko čišćenje lica',
			'Hidratantni tretman',
			'Personalizirani plan njege kože',
		],
	},
	{
		title: 'Premium Paket',
		price: '€150',
		features: [
			'Konzultacija',
			'Tretman mikrodermoabrazije',
			'Anti-age tretman',
		],
	},
];

const fitnessPriceCards = [
	{
		title: 'Osnovni Paket',
		price: '€80',
		features: [
			'Konzultacija s trenerom',
			'Individualni plan vježbanja',
			'Pristup grupnim treninzima',
		],
	},
	{
		title: 'Premium Paket',
		price: '€110 ',
		features: [
			'Konzultacija s trenerom',
			'Individualni plan vježbanja',
			'Pristup grupnim treninzima',
		],
	},
];

const AnimatedPriceCards = (props: Props) => {
	const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);

	return (
		<>
			<FadeIn className='flex gap-4' duration={0.5} stagger={0.15}>
				{fitnessPriceCards.map((card, index) => (
					<div
						key={card.title}
						ref={(el) => {
							cardsRef.current[index] = el!;
						}}
						className='relative after:content-[""] after:absolute after:top-0 after:left-0 after:bg-[#283b35] after:w-full after:z-0 after:rounded-2xl after:h-[85%] border border-[#d5bb9a] price-card p-8 pb-2 mb-4 aspect-[.75] w-88 rounded-3xl bg-gray-950 flex flex-col '>
						<h3
							className='relative text-[#d5bb9a] z-10 text-3xl font-normal mb-2 border-b border-[#d3b48ba8]'
							style={{ fontFamily: 'Lora, serif' }}>
							{card.title}
						</h3>

						<ul className=' list-disc list-outside relative z-10 mb-4 mt-4 text-[#d5bb9a]'>
							{card.features.map((feature, index) => (
								<li key={index} className='mb-2'>
									{feature}
								</li>
							))}
						</ul>
						<p
							style={{ fontFamily: 'Lora, serif' }}
							className='text-[#d5bb9a] relative z-10 font-bold mb-4 flex mt-auto text-4xl'>
							{card.price}
						</p>
					</div>
				))}
			</FadeIn>
		</>
	);
};

export default AnimatedPriceCards;
