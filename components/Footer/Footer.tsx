import Link from 'next/link';
import React from 'react';

type Props = {};

const Footer = (props: Props) => {
	return (
		<div className='px-[5vw] bg-gray-950 text-gray-200 relative before:content-[""] before:absolute before:-top-10 before:left-0 before:w-full before:h-32 before:bg-gray-950 before:z-0'>
			<footer className='w-full py-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='location text-xs flex gap-2 col-span-3 font-mono opacity-55 text-gray-400'>
					{' '}
					<span>Dubrovnik</span>
					{/* current time */}
					<span>
						{new Date().toLocaleTimeString('hr-HR', {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</span>
				</div>
				<div className='social-links flex flex-col'>
					<span className='text-xs'>Pratite nas</span>
					<a
						className='underline'
						href='https://www.instagram.com/grandfit.andbeauty/'
						target='_blank'
						rel='noopener noreferrer'>
						Instagram
					</a>
					<a
						className='underline'
						href='https://www.facebook.com/grandfit.andbeauty'
						target='_blank'
						rel='noopener noreferrer'>
						Facebook
					</a>
				</div>

				<div className='flex gap-4 col-start-1'>
					<div className='text-sm'>
						<p>Kontakt</p>
						<span className='flex max-w-[15ch]'>
							Radnička 46, Dubrovnik, Croatia 20 000
						</span>
					</div>
				</div>

				<div className='col-start-1 col-span-3'>
					<span
						style={{ fontFamily: 'Anton, serif' }}
						className='text-5xl md:text-[6vw] max-w-[20ch] leading-[1.2] tracking-tight'>
						GrandFit
						<span className='heading-span tracking-tighter'>&Beauty</span>
					</span>
				</div>
				<span className='text-sm flex flex-col'>
					<span>&copy; {new Date().getFullYear()} GrandFit&Beauty.</span>
					<span>Sva prava pridržana.</span>
				</span>
			</footer>
		</div>
	);
};

export default Footer;
