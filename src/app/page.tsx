import FollowSign from "@/components/ui/landing/follow_sign";
import Hero from "./sections/hero";
import Booking from "./sections/booking";
import Opinions from "./sections/opinions";

export default function Home() {
   return (
      <>
         <FollowSign />
         <main>
            <Hero />
            <Booking />
            <Opinions />
         </main>
      </>
   );
}
