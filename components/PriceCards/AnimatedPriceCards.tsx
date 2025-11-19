'use client';
import React from 'react';
import FadeIn from '../FadeIn/FadeIn';
import { Check } from 'lucide-react';

type Props = {
	activeIndex: number;
};

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
		subTitle: 'Za početnike koji žele započeti svoju fitness avanturu',
		price: '€55',
		features: [
			'Pristup teretani',
			'4 termina tjedno',
			'Osnovne prehrambene smjernice',
		],
	},
	{
		title: 'Pro Paket',
		subTitle:
			'Za ozbiljne entuzijaste koji traže smjernice i dosljedan pristup vježbanju',
		price: '€85',
		features: [
			'Konzultacija s trenerom (2x mjesečno)',
			'Neograničen pristup teretani',
			'Individualni plan vježbanja za svaki mjesec',
			'Pristup grupnim treninzima',
			'Praćenje napretka',
		],
	},
	{
		title: 'Zlatni Paket',
		subTitle: 'Za one koji žele maksimalne rezultate',
		price: '€120',
		features: [
			'Svi benefiti Pro Paketa',
			'Tjedne konzultacije s trenerom',
			'Savjeti i smjernice za oporavak',
			'Prioritet kod rezervacije termina',
			'Ekskluzivni pristup radionicama i događajima',
		],
	},
];

const AnimatedPriceCards = ({ activeIndex }: Props) => {
	const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);

	// Choose which price cards to show based on activeIndex
	const currentCards = activeIndex === 0 ? beautyPriceCards : fitnessPriceCards;

	// Reset cardsRef when activeIndex changes to ensure proper animation
	React.useEffect(() => {
		cardsRef.current = [];
	}, [activeIndex]);

	return (
		<>
			<FadeIn
				key={activeIndex}
				className='flex gap-4 items-center justify-center w-full'
				duration={0.5}
				stagger={0.15}>
				{currentCards.map((card, index) => (
					<div
						key={card.title}
						ref={(el) => {
							cardsRef.current[index] = el!;
						}}
						className={`relative price-card p-8 pb-2 mb-4 aspect-[.80] w-88  flex flex-col ${
							index === 1
								? `w-96 aspect-[.65] z-10 ${
										activeIndex === 0 ? 'bg-pink-600' : 'bg-(--darkGreen)'
								  } text-gray-50`
								: 'bg-gray-50  text-gray-700'
						} rounded-3xl`}>
						<div
							className={`flex flex-col gap-2 border-b ${
								index === 1 ? 'border-gray-50/50' : 'border-green-900/50'
							}`}>
							<h3 className='relative z-10 text-2xl font-semibold tracking-tight mb-2'>
								{card.title}
							</h3>
							{'subTitle' in card && (
								<p className='tracking-tight leading-[1.2]'>
									{(card as any).subTitle}
								</p>
							)}

							<p className=' relative z-10 font-bold mb-2 flex text-5xl tracking-tighter items-end gap-1'>
								{card.price}
								<span className='font-normal text-lg tracking-normal'>
									/mjesečno
								</span>
							</p>
						</div>

						<ul className='list-disc list-outside relative z-10 mb-4 mt-4 tracking-tight'>
							{card.features.map((feature, featureIndex) => (
								<li
									key={featureIndex}
									className='mb-2 list-none flex items-start gap-2'>
									<span
										className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 shrink-0 ${
											index === 1
												? 'bg-gray-200'
												: `${
														activeIndex === 0
															? 'bg-pink-400'
															: 'bg-(--darkGreen)'
												  }`
										}`}>
										<Check
											size={12}
											className={
												index === 1
													? `${
															activeIndex === 0
																? 'text-pink-600'
																: 'text-(--darkGreen)'
													  }`
													: 'text-gray-200'
											}
										/>
									</span>
									<span className='leading-[1.45] relative -top-0.5'>
										{feature}
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</FadeIn>
		</>
	);
};

export default AnimatedPriceCards;
