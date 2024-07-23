"use client";

import {
   FacebookLogo,
   InstagramLogo,
   TiktokLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface IFollowUs {}

export default function FollowUs({}: IFollowUs) {
   return (
      <div
         id="social_media"
         className="fixed bottom-2 left-1 z-20 flex justify-center gap-4 text-lg vertical-rl sm:left-2 md:text-xl lg:bottom-4 lg:left-4 xl:bottom-8 xl:left-8 xl:gap-6 xl:text-2xl"
      >
         <p className="text-sm font-bold xl:text-base">Follow us</p>
         <Link href="https://www.instagram.com/gravitytunnel/" target="_blank">
            <InstagramLogo />
         </Link>
         <Link
            href="https://www.facebook.com/profile.php?id=61553252461423"
            target="_blank"
         >
            <FacebookLogo />
         </Link>
         <Link href="https://www.tiktok.com/@gravity.tunnel" target="_blank">
            <TiktokLogo />
         </Link>
      </div>
   );
}
