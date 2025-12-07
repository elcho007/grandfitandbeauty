import Image from 'next/image';
import React from 'react';

const teamMembers = [
	{
		name: 'Elma Agovic',
		slug: 'elma-agovic',
		role: 'Suvlasnica GF&B, strucnjakinja za welness',
		bio: 'Elma Agovic, suvlasnica GrandFit&Beauty centra, donosi bogato iskustvo u wellness industriji. Svojim klijentima pristupa s posvećenošću i stručnošću, osiguravajući vrhunsku uslugu i rezultate.',
	},
	{
		name: 'Elvis Agovic',
		slug: 'elvis-agovic',
		role: 'Suvlasnik GF&B i glavni trener',
		bio: 'Elvis Agovic, suvlasnik GrandFit&Beauty centra i glavni trener, posvećen je pružanju vrhunskih treninga i podrške klijentima. Njegovo iskustvo i stručnost ključni su za uspjeh svakog pojedinca.',
	},
];

type Props = {
	params: Promise<{
		slug: string;
	}>;
};

const page = async ({ params }: Props) => {
	const { slug } = await params;

	const teamMember = teamMembers.find((member) => member.slug === slug);
	return (
		<div className='w-full min-h-[110vh] bg-(--black) px-[5vw] py-[15vh] lg:py-[10vh] flex items-start text-[#9d9d9d]'>
			<div>
				{teamMember ? (
					<div>
						<div className='relative overflow-hidden w-80 h-80 rounded-xl mb-8'>
							<Image
								src={`/images/${teamMember.name
									.split(' ')[0]
									.toLowerCase()}.webp`}
								alt={teamMember.name}
								style={{ objectFit: 'cover' }}
								fill
							/>
						</div>
						<h1
							className='text-3xl'
							style={{ fontFamily: 'Anton, sans-serif' }}>
							{teamMember.name}
						</h1>
						<p className='rounded-sm bg-(--gold) max-w-60 lg:max-w-max px-3 py-1 text-(--black) mt-2 mb-6'>
							{teamMember.role}
						</p>
						<p className='max-w-lg'>{teamMember.bio}</p>
					</div>
				) : (
					<p>Team member not found.</p>
				)}
			</div>
		</div>
	);
};

export default page;
