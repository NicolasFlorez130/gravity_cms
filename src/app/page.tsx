import FollowSign from "~/components/landing/ui/follow_sign";
import Hero from "./sections/hero";
import Booking from "./sections/booking";
import Opinions from "./sections/opinions";
import Comments from "./sections/comments";
import Questions from "./sections/questions";
import GalleryCarousel from "./sections/gallery_carousel";
import IgCarousel from "./sections/ig_carousel";
import Veil from "~/components/landing/ui/veil";
import { api } from "~/trpc/server";
import Footer from "~/components/landing/ui/footer";
import { groupBy } from "~/lib/utils";

export default async function Home() {
   const images = await api.images.getAll();

   const groupedImages = groupBy(images, "category");

   return (
      <>
         <Veil />
         <main className="relative m-auto max-w-screen-3xl overflow-hidden">
            <FollowSign />
            <Hero />
            <Booking />
            <Opinions />
            <GalleryCarousel images={groupedImages.GALLERY} />
            <Comments />
            <Questions />
            <IgCarousel images={groupedImages.INSTAGRAM_POSTS} />
         </main>
         <Footer />
      </>
   );
}
