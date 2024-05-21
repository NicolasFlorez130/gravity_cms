import FollowSign from "@/components/ui/landing/follow_sign";
import Hero from "./sections/hero";
import Booking from "./sections/booking";
import Opinions from "./sections/opinions";
import Comments from "./sections/comments";
import Questions from "./sections/questions";
import Footer from "@/components/ui/landing/footer";

export default function Home() {
   return (
      <>
         <FollowSign />
         <main>
            <Hero />
            <Booking />
            <Opinions />
            <Comments />
            <Questions />
         </main>
         <Footer />
      </>
   );
}
