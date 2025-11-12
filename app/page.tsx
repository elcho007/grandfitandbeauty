import Blog from '@/components/Blog/Blog';
import ClientTestimonials from '@/components/ClientTestimonials/ClientTestimonials';
import Coach from '@/components/Coach/Coach';
import Faq from '@/components/FAQ/Faq';
import HeroComponent from '@/components/HeroComponent/HeroComponent';
import PriceCards from '@/components/PriceCards/PriceCards';
import Services from '@/components/ServicesSection/Services';

export default function Home() {
	return (
		<div className='bg-zinc-50 font-sans dark:bg-black'>
			<main className='w-full'>
				<HeroComponent />
				<Services />
				<Coach />
				<ClientTestimonials />
				<Blog />
				<PriceCards />
				<Faq />
			</main>
		</div>
	);
}
