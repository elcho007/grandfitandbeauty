import Image from 'next/image';
import React from 'react';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';
import GSAPClipPathImageRevealComponent from '../GSAPClipPathImageRevealComponent/GSAPClipPathImageRevealComponent';

type Props = {};

const TwoImageClipComponent = (props: Props) => {
	return (
		<div className='w-full h-screen'>
			<div className='w-full h-full relative grid grid-cols-1 md:grid-cols-2 grid-rows-1'>
				<div className='relative overflow-hidden p-4 before:content-[""] before:absolute before:w-full before:z-10 before:h-full before:left-0 before:mix-blend-difference before:top-0 before:bg-yellow-500/10'>
					<GSAPClipPathImageRevealComponent>
						<Image
							src='/images/gfb3.jpg'
							fill
							alt=''
							className='object-cover'
						/>
					</GSAPClipPathImageRevealComponent>
					<div className='relative top-[55%] z-10 mix-blend-overlay text-3xl max-w-sm text-white'>
						<GSAPSplitTextComponent
							ease={'power2'}
							stagger={0.03}
							duration={0.75}
							start='top 80%'>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Molestias ipsa architecto molestiae fugiat nisi dolorem
								doloremque quod rerum neque dolores dicta, asperiores fuga modi,
								tempora aut, vero totam vel omnis temporibus. Ipsum sed quas
								optio!
							</p>
						</GSAPSplitTextComponent>
					</div>
				</div>
				<div className='relative overflow-hidden p-4 before:content-[""] before:absolute before:w-full before:z-10 before:h-full before:left-0 before:mix-blend-difference before:top-0 before:bg-yellow-500/10'>
					<GSAPClipPathImageRevealComponent direction='top'>
						<Image
							src='/images/gfb4.jpg'
							fill
							alt=''
							className='object-cover'
						/>
					</GSAPClipPathImageRevealComponent>
					<div className='relative z-20 mix-blend-overlay text-3xl max-w-sm text-white'>
						<GSAPSplitTextComponent
							ease={'power2'}
							stagger={0.03}
							duration={0.75}
							start={'bottom 80%'}>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Molestias ipsa architecto molestiae fugiat nisi dolorem
								doloremque quod rerum neque dolores dicta, asperiores fuga modi,
								tempora aut, vero totam vel omnis temporibus. Ipsum sed quas
								optio!
							</p>
						</GSAPSplitTextComponent>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TwoImageClipComponent;
