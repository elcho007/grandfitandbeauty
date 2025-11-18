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
		<div className='relative w-full gap-8 min-h-[130vh] px-[5vw] grid grid-cols-4 bg-gray-200 overflow-hidden grid-row-auto-rows-[auto_auto_1fr] py-10'>
			<div className='z-10 mt-4 col-start-1 col-span-3 flex flex-col row-start-1 max-h-max'>
				<GSAPSplitTextComponent
					ease={'power2'}
					duration={0.5}
					stagger={0.05}
					direction={'down'}>
					<p className='text-5xl text-medium leading-tight tracking-tighter'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
						beatae rerum ex nihil corrupti vel adipisci voluptate esse quas
						autem expedita, perferendis iusto. Dolor optio distinctio commodi
						alias eveniet omnis porro rerum eligendi.
					</p>
				</GSAPSplitTextComponent>
			</div>
			<div className='relative h-[60vh] overflow-hidden col-start-2 col-span-2 row-start-2'>
				<ParallaxImage src='/images/coach.webp' alt='Video Thumbnail' />
			</div>
			<div className='text-gray-950 col-start-2 col-span-1 row-start-3'>
				<GSAPSplitTextComponent
					ease={'power2'}
					duration={0.5}
					stagger={0.05}
					direction={'down'}>
					<p className='text-2xl tracking-tight text-medium leading-tight'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
						enim aperiam, sunt eligendi quam a at, vel necessitatibus beatae
						delectus et quaerat nemo perferendis reprehenderit assumenda alias
						provident atque voluptas?
					</p>
				</GSAPSplitTextComponent>
			</div>
		</div>
	);
};

export default VideoComponent;
