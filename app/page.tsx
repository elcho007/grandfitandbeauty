import BeautyCornerComponent from '@/components/BeautyCornerComponent/BeautyCornerComponent';
import Blog from '@/components/Blog/Blog';
import ClientTestimonials from '@/components/ClientTestimonials/ClientTestimonials';
import Coach from '@/components/Coach/Coach';
import Faq from '@/components/FAQ/Faq';
import HeroComponent from '@/components/HeroComponent/HeroComponent';
import MeetTheTeamComponent from '@/components/MeetTheTeamComponent/MeetTheTeamComponent';
import PowerQuotes from '@/components/PowerQuotes/PowerQuotes';
import PriceCards from '@/components/PriceCards/PriceCards';
import Services from '@/components/ServicesSection/Services';
import SuccessStories from '@/components/SuccessStories/SuccessStories';
import TwoImageClipComponent from '@/components/TwoImageClipComponent/TwoImageClipComponent';
import VideoComponent from '@/components/VideoComponent/VideoComponent';

export default function Home() {
	return (
		<div className='bg-zinc-50 font-sans dark:bg-black'>
			<main className='w-full'>
				<HeroComponent />
				<MeetTheTeamComponent />
				<Services />
				<Coach />
				<SuccessStories />
				<ClientTestimonials />
				<VideoComponent />
				<TwoImageClipComponent />
				<PowerQuotes />
				<BeautyCornerComponent />
				<PriceCards />
				<Blog />
				<Faq />
			</main>
		</div>
	);
}
