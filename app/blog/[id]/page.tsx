import Image from 'next/image';
import React from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-inter',
});

type Props = {
	params: Promise<{ id: string }>;
};

const BlogPage = async ({ params }: Props) => {
	const { id } = await params;
	return (
		<div className='w-full min-h-screen p-[5vw] bg-[#dddddd] text-gray-950'>
			<div className='w-full mx-auto h-[800px] mb-8 relative'>
				<Image
					src='/images/story1.jpg'
					fill
					sizes='(max-width: 768px) 100vw, 90vw'
					alt=''
					className='object-cover'
				/>
				<div className='post-title absolute bottom-4 left-4 text-white z-10 bg-opacity-75 p-4 rounded-md'>
					<h1
						style={{ fontFamily: 'Anton, sans-serif' }}
						className='text-7xl max-w-[15ch] font-bold mb-4'>
						Kako postići svoje fitness ciljeve
					</h1>
					<p className='text-sm text-gray-400 mb-8'>
						Objavljeno: {new Date().toLocaleDateString()}
					</p>
				</div>
			</div>
			<div className={`w-2xl ${inter.variable} px-8`}>
				<h2 className='mb-6 text-2xl tracking-tight font-semibold'>
					Kako postići svoje fitness ciljeve
				</h2>
				<p className='mb-3 max-w-[65ch]'>
					Svi imamo trenutak kada odlučimo promijeniti nešto kod sebe, npr.
					početi trenirati, zdravije jesti ili jednostavno osjećati se bolje u
					vlastitom tijelu. Ali pravi izazov nije početi, nego ostati dosljedan.
					U fitnessu, uspjeh se ne postiže preko noći. On se gradi svakim
					treningom, svakom odlukom da ustaneš i pojaviš se, čak i onda kada ti
					se ne da.
				</p>
				<p className='mb-3 max-w-[65ch]'>
					Prvi korak ka promjeni uvijek je jasan cilj. Kada znaš šta želiš, bilo
					da zelis izgubiti nekoliko kilograma, izgraditi snagu, popraviti
					držanje ili jednostavno imati više energije, sve postaje
					jednostavnije. Zapiši svoj cilj, daj mu rok i napravi plan. Kada znaš
					kuda ideš, svaki trening ima smisao i svrhu. Nema univerzalnog plana
					koji odgovara svima. Neko voli trčati, neko diže tegove, neko uživa u
					grupnim treninzima. Najvažnije je pronaći ono što te pokreće i što
					možeš održati na duže staze. Naši treneri pomažu ti da pronađeš
					program koji odgovara tvom nivou kondicije, rasporedu i ciljevima.
				</p>
				<p className='mb-3 max-w-[65ch]'>
					Pravi napredak dolazi kada treniraš pametno, ne samo naporno. Uz dobar
					trening, jednako važna je i ishrana. Bez pravilne prehrane nema pravih
					rezultata. Ne radi se o strogim dijetama, već o balansu. To znači
					dovoljno proteina, dovoljno vode i pametan izbor namirnica. Tvoje
					tijelo je tvoj motor, a hrana tvoje gorivo.
				</p>
				<p className='mb-3 max-w-[65ch]'>
					Ako naučiš hraniti se svjesno, tvoji rezultati će to pokazati.
					Napredak se ne mjeri savršenstvom, već dosljednošću. Zapiši svoje
					treninge, bilježi male uspjehe i ne potcjenjuj koliko znači jedan
					dobar dan više od onog kad bi odustao. Promjene možda nećeš odmah
					vidjeti u ogledalu, ali ćeš ih osjetiti u snazi, energiji i
					samopouzdanju. I ne zaboravi da je odmor dio plana. Tijelu treba
					vrijeme da se oporavi i ojača. Kvalitetan san, dan bez treninga i
					istezanje jednako su važni kao i teški setovi u teretani. Napredak
					dolazi kada pronađeš ravnotežu između rada i odmora. Biće dana kad ti
					motivacija padne. To je normalno. Zato je važno imati podršku trenera,
					tim ili zajednicu koja te gura naprijed.
				</p>
				<p className='mb-3 max-w-[65ch]'>
					U našem klubu vjerujemo u tu snagu zajedništva. Kada treniraš okružen
					ljudima koji dijele tvoj cilj, lakše je ostati na pravom putu. Bez
					obzira na to gdje se trenutno nalaziš, uvijek možeš napraviti prvi
					korak. Nema savršenog trenutka, samo danas. Počni sada, da bi sutra
					bio ponosan na sebe. Dođi, treniraj s nama i otkrij koliko možeš
					postići uz pravu podršku i okruženje koje te motiviše. Tvoj rezultat
					počinje danas. Prijavi se na probni trening i kreni svojim putem ka
					boljoj verziji sebe.
				</p>
			</div>
		</div>
	);
};

export default BlogPage;
