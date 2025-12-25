import Image from 'next/image';
import React from 'react';

type Props = {};

const additionalServices = [
	{
		id: 1,
		title: 'Fitness Bar',
		description: 'Uživajte u zdravim napicima i obrocima nakon treninga.',
		imageUrl: '/images/fitbar.png',
	},
	{
		id: 2,
		title: 'Udobne Svlačionice',
		description: 'Prostrane i čiste svlačionice za vašu udobnost.',
		imageUrl: '/images/lockerroom.png',
	},
	{
		id: 3,
		title: 'Parking Mjesta',
		description: 'Dostupna parking mjesta ispred centra za naše članove.',
		imageUrl: '/images/parking.png',
	},
];

const AdditionalServices = (props: Props) => {
	return (
		<div className='w-full min-h-[40vh] flex flex-col gap-8 bg-(--gold) px-4 xl:px-20 pb-10 justify-center'>
			<div>
				<h3
					style={{ fontFamily: 'Anton, sans-serif' }}
					className='text-xl md:text-3xl tracking-normal max-w-lg leading-[1.3]'>
					Prateće usluge i pogodnosti
				</h3>
				<p className='text-base tracking-tight leading-snug max-w-sm'>
					Svim našim članovima nudimo dodatne pogodnosti i usluge poput fitness
					bara, udobnih svlačionica i sigurnog prostora za odlaganje osobnih
					stvari. Na raspolaganju je i određeni broj parking mjesta ispred samog
					centra.
				</p>
			</div>

			<div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{additionalServices.map((service) => (
						<div
							key={service.id}
							className='bg-white p-2 relative h-96 flex items-end'>
							{service.imageUrl && (
								<Image src={service.imageUrl} alt={service.title} fill />
							)}
							<div className='flex flex-col w-full relative z-10'>
								<h4 className='text-lg font-semibold mb-2 relative z-10 text-white'>
									{service.title}
								</h4>
								<p className='text-sm relative z-10 text-white max-w-[200px] tracking-tight leading-snug'>
									{service.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AdditionalServices;
