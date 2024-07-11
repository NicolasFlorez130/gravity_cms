import FollowSign from "~/components/landing/ui/follow_sign";
import Hero from "./sections/hero";
import Packages from "./sections/packages";
import Opinions from "./sections/opinions";
import Comments from "./sections/comments";
import Questions from "./sections/questions";
import GalleryCarousel from "./sections/gallery_carousel";
import IgCarousel from "./sections/ig_carousel";
import Veil from "~/components/landing/ui/veil";
import { api } from "~/trpc/server";
import Footer from "~/components/landing/ui/footer";
import { groupBy } from "~/lib/utils";
import { CartDrawer } from "~/components/landing/ui/cart_drawer";
import { type Metadata } from "next";

export const metadata: Metadata = {
   title: "Gravity",
   description: "",
};

export default async function Home() {
   const [images, opinions] = await Promise.all([
      api.images.getAll(),
      api.opinions.getAll(),
   ]);

   const groupedImages = groupBy(images, "category");

   return (
      <>
         <Veil />
         <main className="relative m-auto max-w-screen-3xl overflow-hidden">
            <div
               id="book_button"
               className="fixed bottom-4 right-4 z-20 h-max w-max"
            >
               <CartDrawer />
            </div>
            <FollowSign />
            <Hero />
            <Packages />
            <Opinions
               images={groupedImages.PROFILE_PICTURES ?? []}
               opinions={opinions}
            />
            <GalleryCarousel images={groupedImages.GALLERY ?? []} />
            <Comments />
            <Questions />
            <IgCarousel images={groupedImages.INSTAGRAM_POSTS ?? []} />
         </main>
         <Footer />
      </>
   );
}
