import Image from 'next/image';
import React from 'react';

/* 
(Slika Elme i Elvisa, pa da sw lista slika i s dadom i urosem) 

Grand Fit & Beauty nastao je iz jedne priče o ljubavi, strasti prema poslu i zajedničkom snu. Elma i Elvis upoznali su se radeći rame uz rame — ona kao stručnjakinja u wellnessu, a on kao trener u hotelskoj wellness zoni. Od prvog dana, povezala ih je ista energija, ista vizija i isti osjećaj da zajedno mogu više.

Radili su predano, učili jedan od drugoga i otkrili da najbolje rezultate postižu upravo kada su – zajedno. Upravo ta snaga partnerstva, ali i ljubavi, bila je motivacija da naprave hrabar korak i otvore svoj centar — mjesto koje će nositi njihov potpis, njihovu filozofiju i njihovu strast.

Tako je nastao Grand Fit & Beauty: prostor u kojem se isprepliću profesionalnost, toplina i posvećenost svakom gostu. Danas, Elma i Elvis vode centar s istim žarom s kojim su se i upoznali — vjerujući da se najbolji uspjesi rađaju iz ljubavi, zajedništva i srca koje uvijek ide naprijed.

Onda svakoga posebno i koje usluge pruza


*/

type Props = {};

const MeetTheTeamComponent = (props: Props) => {
	return (
		<div className='w-full min-h-svh px-[5vw] py-24 grid grid-cols-12 gap-8 justify-center items-start bg-(--black) text-gray-200'>
			<div className='col-span-6'>
				<h2
					className='text-3xl xl:text-[3vw] tracking-tight mb-4 max-h-max text-[#b39a67] max-w-2xl'
					style={{ fontFamily: 'Anton, sans-serif' }}>
					Upoznajte Elmu i Elvisa, vlasnike Grand Fit & Beauty
				</h2>
			</div>
			<div className='relative col-span-6 max-w-4xl h-[400px] md:h-[800px] my-8 row-span-3'>
				<Image
					fill
					alt='Elma i Elvis'
					src='/images/fitnesscouple.avif'
					className='object-cover rounded-lg'
				/>
			</div>
			<div className='flex flex-col col-start-1 col-span-6 row-start-2'>
				<p className='max-w-lg text-xl'>
					Grand Fit & Beauty nastao je iz jedne priče o ljubavi, strasti prema
					poslu i zajedničkom snu. Elma i Elvis upoznali su se radeći rame uz
					rame — ona kao stručnjakinja u wellnessu, a on kao trener u hotelskoj
					wellness zoni. Od prvog dana, povezala ih je ista energija, ista
					vizija i isti osjećaj da zajedno mogu više.
				</p>
				<p className='max-w-lg mt-4 text-xl'>
					Radili su predano, učili jedno od drugoga i otkrili da najbolje
					rezultate postižu upravo kada su zajedno. Upravo ta snaga partnerstva,
					ali i ljubavi, bila je motivacija da naprave hrabar korak i otvore
					svoj centar, mjesto koje će nositi njihov potpis, njihovu filozofiju i
					njihovu strast.
				</p>
				<p className='max-w-lg mt-4 text-xl'>
					Tako je nastao Grand Fit & Beauty: prostor u kojem se isprepliću
					profesionalnost, toplina i posvećenost svakom gostu. Danas, Elma i
					Elvis vode centar s istim žarom s kojim su se i upoznali, vjerujući da
					se najbolji uspjesi rađaju iz ljubavi, zajedništva i srca koje uvijek
					ide naprijed.
				</p>
			</div>
		</div>
	);
};

export default MeetTheTeamComponent;
