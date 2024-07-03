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

export default async function Home() {
   const [images, opinions, packages] = await Promise.all([
      api.images.getAll(),
      api.opinions.getAll(),
      api.packages.getActivePackages(),
   ]);

   const groupedImages = groupBy(images, "category");

   return (
      <>
         <Veil />
         <main className="relative m-auto max-w-screen-3xl overflow-hidden">
            <FollowSign />
            <Hero />
            <Packages packages={packages} />
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
