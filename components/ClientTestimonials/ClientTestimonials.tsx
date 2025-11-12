import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {};

const testimonials = [
	{
		name: 'Ana Kovač',
		feedback: 'Izvrsna usluga i profesionalan pristup! Preporučujem svima.',
		image: '/images/testimonial1.jpg',
		date: '01.10.2025',
	},
	{
		name: 'Marko Horvat',
		feedback:
			'Samo najbolji mogu reći! Rezultati su vidljivi odmah. Trener je vrlo stručan i motivirajući.',
		image: '/images/testimonial2.jpg',
		date: '02.09.2025',
	},
	{
		name: 'Ivana Marić',
		feedback:
			'Izvrsna usluga i profesionalan pristup! Posebno mi se svidio individualni plan treninga.',
		image: '/images/testimonial3.jpg',
		date: '12.08.2025',
	},
	{
		name: 'Lucia Babić',
		feedback: 'Izvrsna usluga i profesionalan pristup! Preporučujem svima.',
		image: '/images/testimonial1.jpg',
		date: '12.12.2024',
	},
	{
		name: 'Ivano Lakić',
		feedback: 'Izvrsna usluga i profesionalan pristup! Preporučujem svima.',
		image: '/images/testimonial2.jpg',
		date: '05.11.2024',
	},
];

const ClientTestimonials = (props: Props) => {
	return (
		<div className='bg-[#030712] w-full h-[60vh] flex flex-col justify-center items-center gap-8 text-[#dadada] py-8'>
			<h3>Pročitajte šta naši klijenti kažu</h3>
			<div className='flex justify-center gap-4'>
				{testimonials.map((testimonial, index) => (
					<div
						key={index}
						className='testimonial-card max-w-64 aspect-3/4 p-4 bg-[#939393] rounded-lg flex flex-col'>
						<div className='flex items-end gap-4 mb-8'>
							<div className='relative w-16 h-16 rounded-full overflow-hidden'>
								<Image
									fill
									src={testimonial.image}
									alt={`Slika klijenta ${testimonial.name}`}
								/>
							</div>
							<span>{testimonial.name}</span>
						</div>
						<p className='text-sm '>{testimonial.feedback}</p>

						<span className='bg-[#aaaaaa] p-2 text-[10px] text-gray-600 mt-auto flex max-w-max rounded-xs'>
							{testimonial.date}
						</span>
					</div>
				))}
			</div>
			<div className='flex items-center'>
				<button className='bg-[#939393] text-[#dadada] p-2 rounded-full font-semibold'>
					<ArrowLeft />
				</button>

				<span className='mx-4 w-40 h-2 bg-[#939393] rounded-full relative flex items-center'>
					<span className='w-12 h-1 bg-[#dadada] rounded-full'></span>
				</span>

				<button className='bg-[#939393] text-[#dadada] p-2 rounded-full font-semibold'>
					<ArrowRight />
				</button>
			</div>
		</div>
	);
};

export default ClientTestimonials;
