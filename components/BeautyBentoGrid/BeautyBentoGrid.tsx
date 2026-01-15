'use client';
import React from 'react';
import Image from 'next/image';
import FadeIn from '../FadeIn/FadeIn';

type Props = {};

const stats = [
	{
		id: 1,
		title: '500+',
		subtitle: 'Zadovoljnih klijenata',
		description: 'Pružili smo tretmane koji su promijenili živote',
	},
	{
		id: 2,
		title: '650+',
		subtitle: 'Tretmana obavljeno',
		description: 'Iskustvo koje donosi rezultate',
	},
	{
		id: 3,
		title: '98%',
		subtitle: 'Klijenata se vraćaju',
		description: 'Jer kvalitet govori sam za sebe',
	},
];

const bentoItems = [
	{
		id: 1,
		type: 'stats-group',
		size: 'large',
		color: 'gold',
	},
	{
		id: 2,
		type: 'promo',
		title: 'Vaša ljepota, naša strast',
		description:
			'Personalizirani pristup svakom klijentu jer znamo da ste jedinstveni',
		size: 'large',
		image: '/images/wellness3.webp',
	},
	{
		id: 5,
		type: 'catchphrase',
		title: 'Osjećajte se sjajno',
		subtitle: 'u svojoj koži',
		description: 'Tretmani koji vraćaju samopouzdanje',
		size: 'medium',
		color: 'accent',
	},

	{
		id: 6,
		type: 'promo',
		title: '20% Popust',
		subtitle: 'na prvi tretman',
		description: 'Zakažite svoj tretman danas i otkrijte šta znači prava njega',
		size: 'medium',
		color: 'gold-gradient',
		cta: 'Zakažite sada',
	},
	{
		id: 7,
		type: 'catchphrase',
		title: 'Ljepota nije luksuz',
		subtitle: 'To je investicija u sebe',
		description: 'Zaslužujete da se osjećate najbolje',
		size: 'large',
		color: 'pink',
	},
	{
		id: 8,
		type: 'promo',
		title: 'Vrhunska oprema',
		description: 'Koristimo najmoderniju tehnologiju za najbolje rezultate',
		size: 'medium',
		image: '/images/wellness5.webp',
	},
	{
		id: 9,
		type: 'catchphrase',
		title: 'Sjaj iznutra',
		subtitle: 'Blistaj spolja',
		description: 'Holistički pristup ljepoti koja se vidi i osjeća',
		size: 'medium',
		color: 'gold',
	},
];

const BeautyBentoGrid = (props: Props) => {
	return (
		<div className='w-full min-h-screen bg-[#f8ead1] px-4 py-20'>
			<div className='w-full xl:max-w-[80vw] mx-auto'>
				<div className='mb-12'>
					<h4
						style={{ fontFamily: 'Lora, serif' }}
						className='text-4xl md:text-5xl font-semibold tracking-tight text-(--black) leading-[1.2] mb-4 max-w-2xl'>
						Priuštite sebi neke od najdjelotvornijih beauty tretmana
					</h4>
					<p className='text-base xl:text-lg text-(--black) max-w-2xl text-balance'>
						Mi cemo se pobrinuti da vaša koža izgleda i osjeća se najbolje
						moguće. Otkrijte našu ponudu tretmana i prepustite se rukama
						stručnjaka.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-4 gap-y-4'>
					<FadeIn className='col-start-1 h-svh flex flex-col gap-2'>
						<div className='relative w-full h-140 rounded-2xl overflow-hidden p-2 xl:p-4 flex items-end before:absolute before:inset-0 before:bg-(--black) before:opacity-20 before:z-10 before:content-[""]'>
							<Image
								src='/images/kozmetika.png'
								fill
								alt='Kozmetika'
								className='object-cover'
							/>
							<p
								style={{ fontFamily: 'var(--font-lora)' }}
								className='relative z-10 text-xl text-white max-w-full text-center leading-[1.2] tracking-tighter'>
								U našem beauty centru koristimo isključivo vrhunsku
								profesionalnu kozmetiku, a jedan od brendova kojem posebno
								vjerujemo je Mesoestetic
							</p>
						</div>
						<div className='p-4 relative w-full h-140 xl:h-100 grow rounded-2xl overflow-hidden before:absolute before:inset-0 before:bg-(--black) before:opacity-30 before:z-10 before:content-[""] flex items-end'>
							<Image
								src='/images/healthyskin.avif'
								alt='Kozmetika 2'
								fill
								className='object-cover'
							/>
							<div className='relative z-20 '>
								<p
									style={{ fontFamily: 'var(--font-lora)' }}
									className='relative z-10 text-xl text-white max-w-full text-center leading-[1.2] tracking-tighter'>
									Zdrava koža je uvijek IN — kada se njeguje na pravi način!{' '}
								</p>
							</div>
						</div>
					</FadeIn>
					<FadeIn className='col-start1 xl:col-start-2 col-span-2 overflow-hidden'>
						<div className='relative rounded-2xl overflow-hidden flex w-full h-140 xl:h-full before:absolute before:inset-0 before:bg-(--black) before:opacity-10 before:z-10 before:content-[""]'>
							<Image
								src='/images/wellness3.webp'
								fill
								alt='Beauty Bento Grid Top'
								className=' rounded-2xl object-cover'
							/>

							<div className='flex relative z-20 text-2xl flex-col items-center justify-center w-full text-white p-8 gap-4 text-center mt-auto'>
								<p
									style={{ fontFamily: 'var(--font-lora)' }}
									className='text-5xl tracking-tighter'>
									Vaša ljepota, naša strast
								</p>
								<p
									style={{ fontFamily: 'var(--font-lora)' }}
									className='tracking-tight max-w-sm'>
									Garantiramo personalizirani pristup svakom klijentu jer znamo
									da ste jedinstveni
								</p>
							</div>
						</div>
					</FadeIn>

					<FadeIn className='col-start-1 xl:col-start-4 flex flex-col gap-2 xl:gap-4'>
						<div className=' bg-(--gold) h-50 rounded-2xl w-full flex flex-col items-center justify-center p-6 text-(--black) gap-4 '>
							<div>
								<p
									style={{ fontFamily: 'Lora, serif' }}
									className='text-4xl text-center tracking-tight'>
									98% klijenata se vraćaju
								</p>
							</div>
							<div>
								<p className='text-lg text-center tracking-tight'>
									Jer kvalitet govori sam za sebe
								</p>
							</div>
						</div>
						<div className=' bg-(--gold) h-25 rounded-2xl w-full flex flex-col items-center justify-center p-6 text-(--black) gap-4 '>
							<div>
								<p
									style={{ fontFamily: 'Lora, serif' }}
									className='text-4xl text-center tracking-tight'>
									12+ godina iskustva
								</p>
							</div>
						</div>
						<div className='bg-(--gold) grow rounded-2xl h-120 relative overflow-hidden w-full before:absolute before:inset-0 before:bg-(--black) before:opacity-20 before:z-10 before:content-[""] flex items-center'>
							{/* embed a gif here */}
							<video
								src='/images/hifulift.mp4'
								autoPlay
								loop
								muted
								className='object-cover rounded-2xl absolute w-full h-full'
							/>
							<p
								className='mt-auto relative z-20 text-white text-xl text-center p-6 '
								style={{ fontFamily: 'Lora, serif' }}>
								Prepustite se našim stručnim rukama i otkrijte kako izgleda koža
								koja istinski sjaji — jer ljepota je najljepša kada je prirodna,
								njegovana i vaša!
							</p>
						</div>
					</FadeIn>
				</div>
			</div>
		</div>
	);
};

export default BeautyBentoGrid;
