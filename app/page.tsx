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
import ClientTestimonialsAlternative from '@/components/ClientTestimonialsAlternative/ClientTestimonials';
import BeautyMarquee from '@/components/BeautyMarquee/BeautyMarquee';
import IntroAnimation from '@/components/IntroAnimation/IntroAnimation';
import EquipmentComponent from '@/components/EquipmentComponent/Equipment';
import AdditionalServices from '@/components/AdditionalServicesComponent/AdditionalServices';
import TrainingSpaceComponent from '@/components/TrainingSpaceComponent/TrainingSpace';
import BeautyBentoGrid from '@/components/BeautyBentoGrid/BeautyBentoGrid';

export default function Home() {
	return (
		<div>
			<main className='w-full'>
				<IntroAnimation />
				<HeroComponent />
				{/* <Coach /> */}
				<Services />
				<BeautyCornerComponent />
				<BeautyMarquee />
				<BeautyBentoGrid />
				<PriceCards />
				{/* <EquipmentComponent />
				<TrainingSpaceComponent />
				<AdditionalServices /> */}
				<VideoComponent />
				<ClientTestimonialsAlternative />
				<SuccessStories />
				{/* <ClientTestimonials /> */}
				{/* <TwoImageClipComponent /> */}
				{/* <PowerQuotes /> */}
				<Blog />
				<MeetTheTeamComponent />
				<Faq />
			</main>
		</div>
	);
}
