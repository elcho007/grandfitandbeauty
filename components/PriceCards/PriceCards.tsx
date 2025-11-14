import ClientButton from './ClientButton';
import AnimatedPriceCards from './AnimatedPriceCards';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';

type Props = {};

const PriceCards = (props: Props) => {
	return (
		<div className='w-full min-h-screen bg-(--green) flex justify-center items-center py-[5vw]'>
			<div className='w-7xl mx-auto min-h-1/2 flex flex-col items-center gap-8'>
				<GSAPSplitTextComponent ease={'power2'}>
					<h2
						className='text-6xl tracking-normal text-(--darkGreen) uppercase'
						style={{ fontFamily: 'Anton, sans-serif' }}>
						Cjenik
					</h2>
				</GSAPSplitTextComponent>
				{/* <ClientButton>Fitness Cjenik</ClientButton> */}
				<div className='flex gap-4'>
					<AnimatedPriceCards />
				</div>
			</div>
		</div>
	);
};

export default PriceCards;
