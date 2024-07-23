"use client";

import Link from "next/link";
import Logo from "./logo";
import {
   FacebookLogo,
   InstagramLogo,
   TiktokLogo,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

interface IFooter {}

export default function Footer({}: IFooter) {
   return (
      <footer className="grid gap-18 bg-background-dark p-3 pt-18 lg:px-36">
         <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <Logo />
            <div className="flex justify-center gap-6">
               <p className="font-bold">Follow us</p>
               <Link
                  href="https://www.instagram.com/gravitytunnel/"
                  target="_blank"
               >
                  <InstagramLogo size={24} />
               </Link>
               <Link
                  href="https://www.facebook.com/profile.php?id=61553252461423"
                  target="_blank"
               >
                  <FacebookLogo size={24} />
               </Link>
               <Link
                  href="https://www.tiktok.com/@gravity.tunnel"
                  target="_blank"
               >
                  <TiktokLogo size={24} />
               </Link>
            </div>
         </div>
         <div className="text-center font-epilogue lg:flex lg:items-end lg:justify-between lg:text-start">
            <p className="text-lg">
               Ven a volar en el primer túnel de{" "}
               <br className="hidden lg:block" /> Colombia y experimenta la{" "}
               <br className="hidden lg:block" />
               sensación de caer de un avión, <br className="hidden lg:block" />{" "}
               tal como lo haría un paracaidista.
            </p>
            <p className="mt-2 text-xs opacity-50">
               Copyright {new Date().getFullYear()} Zero Gravity, Inc. Terms &
               Privacy
            </p>
         </div>
         <div className="relative aspect-[12/2] w-full">
            <Image
               alt="footer title"
               src="/title/footer_title.png"
               fill
               className="object-contain"
            />
         </div>
      </footer>
   );
}
