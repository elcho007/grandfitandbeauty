import Image from 'next/image';
import React from 'react';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';
import GSAPClipPathImageRevealComponent from '../GSAPClipPathImageRevealComponent/GSAPClipPathImageRevealComponent';

type Props = {};

const TwoImageClipComponent = (props: Props) => {
	return (
		<div className='w-full h-screen'>
			<div className='w-full h-full relative flex flex-col md:grid grid-cols-1 md:grid-cols-2 grid-rows-1'>
				<div className='relative overflow-hidden h-1/2 md:h-full p-4 before:content-[""] before:absolute before:w-full before:z-10 before:h-full before:left-0 before:top-0 before:bg-black/30'>
					<GSAPClipPathImageRevealComponent>
						<Image
							src='/images/gfb3.jpg'
							fill
							alt=''
							className='object-cover'
						/>
					</GSAPClipPathImageRevealComponent>
					<div className='relative top-8 md:top-[90svh] z-20 max-w-3xl text-white'>
						<GSAPSplitTextComponent
							ease={'power2'}
							stagger={0.03}
							duration={0.75}
							start='top bottom'>
							<p
								style={{ fontFamily: 'Anton, sans-serif' }}
								className='text-xl md:text-5xl uppercase leading-[1.3]'>
								Tražite načine, ne isprike!
							</p>
						</GSAPSplitTextComponent>
					</div>
				</div>
				<div className='relative overflow-hidden h-1/2 md:h-full p-4 before:content-[""] before:absolute before:w-full before:z-10 before:h-full before:left-0 before:top-0 before:bg-black/30'>
					<GSAPClipPathImageRevealComponent direction='top'>
						<Image
							src='/images/gfb4.jpg'
							fill
							alt=''
							className='object-cover'
						/>
					</GSAPClipPathImageRevealComponent>
					<div className='relative z-20 max-w-3xl text-white'>
						<GSAPSplitTextComponent
							ease={'power2'}
							stagger={0.03}
							duration={0.75}
							start={'bottom 80%'}>
							<p
								style={{ fontFamily: 'Anton, sans-serif' }}
								className='text-xl md:text-5xl uppercase leading-[1.3]'>
								Kada mislite da ne možete više, to je samo početak!
							</p>
						</GSAPSplitTextComponent>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TwoImageClipComponent;
