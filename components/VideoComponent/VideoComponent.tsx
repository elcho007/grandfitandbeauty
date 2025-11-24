'use client';
import Image from 'next/image';
import React from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import ParallaxImage from '../ParallaxImage/ParallaxImage';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';

type Props = {};

const VideoComponent = (props: Props) => {
	const imageRef = React.useRef<HTMLImageElement>(null);

	return (
		<div className='relative w-full min-h-[130vh] px-[5vw] grid grid-cols-4 bg-gray-200 overflow-hidden grid-rows-[auto_auto_1fr] py-10'>
			{' '}
			<div className='z-10 mt-4 col-start-1 col-span-full md:col-span-3 flex flex-col row-start-1 max-h-max mb-4'>
				<GSAPSplitTextComponent
					ease={'power2'}
					duration={0.5}
					stagger={0.05}
					direction={'up'}>
					<p
						style={{ fontFamily: 'Anton, sans-serif' }}
						className='text-3xl md:text-4xl leading-tight tracking-tight max-w-[35ch]'>
						Specijalizovani smo za rad sa profesionalnim sportašima koji žele
						dostignuti vrhunske rezultate.
					</p>
				</GSAPSplitTextComponent>
			</div>
			<div className='relative h-[80vh] md:h-[80vh] overflow-hidden col-start-1 col-span-full md:col-span-2 row-start-2 mb-4'>
				<ParallaxImage src='/images/coach.webp' alt='Video Thumbnail' />
			</div>
			<div className='text-gray-950 col-start-1 col-span-full md:col-start-2 md:col-span-1 row-start-3 flex justify-end'>
				<GSAPSplitTextComponent
					ease={'power2'}
					duration={0.5}
					stagger={0.05}
					direction={'up'}>
					<p className='text-xl md:text-xl tracking-tight font-semibold leading-tight text-right max-w-[35ch]'>
						Nasi treneri primjenjuju najsavremenije metode treninga i
						rehabilitacije kako bi osigurali da naši klijenti postignu svoje
						ciljeve na siguran i efikasan način.
					</p>
				</GSAPSplitTextComponent>
			</div>
		</div>
	);
};

export default VideoComponent;
