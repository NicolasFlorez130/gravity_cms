import FollowSign from "@/components/ui/landing/follow_sign";
import Hero from "./sections/hero";
import Booking from "./sections/booking";
import Opinions from "./sections/opinions";
import Comments from "./sections/comments";
import Questions from "./sections/questions";
import Footer from "@/components/ui/landing/footer";
import GalleryCarousel from "./sections/gallery_carousel";
import IgCarousel from "./sections/ig_carousel";
import Veil from "@/components/ui/landing/veil";

export default function Home() {
   return (
      <>
         <Veil />
         <main className="relative m-auto max-w-screen-3xl overflow-hidden">
            <FollowSign />
            <Hero />
            <Booking />
            <Opinions />
            <GalleryCarousel />
            <Comments />
            <Questions />
            <IgCarousel />
         </main>
         <Footer />
      </>
   );
}
