"use client";

import Link from "next/link";
import Logo from "./logo";
import { InstagramLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

interface IFooter {}

export default function Footer({}: IFooter) {
   return (
      <footer className="gap-18 pt-18 grid bg-background p-4">
         <div className="flex flex-col items-center gap-6">
            <Logo />
            <div className="flex justify-center gap-6">
               <Link className="font-light text-primary" href="#">
                  Follow us
               </Link>
               <Link className="font-bold" href="#">
                  <InstagramLogo size={24} />
               </Link>
               <Link className="font-bold" href="#">
                  <XLogo size={24} />
               </Link>
            </div>
         </div>
         <div className="text-center font-epilogue">
            <p>
               Ven a divertirte en el primer túnel de Colombia y experimenta la
               experiencia de paracaidismo
            </p>
            <p className="mt-2 text-xs opacity-50">
               Copyright 2023 Zero Gravity, Inc. Terms & Privacy
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
