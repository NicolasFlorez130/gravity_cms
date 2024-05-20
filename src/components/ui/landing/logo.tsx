"use client";

import Image from "next/image";

interface ILogo {}

export default function Logo({}: ILogo) {
   return (
      <div className="flex items-center">
         <div className="relative aspect-square h-20">
            <Image
               alt="gravity logo"
               fill
               src="/icons/gravity_icon.svg"
               className="object-fill"
            />
         </div>
         <p className="h-max font-din text-sm leading-none tracking-[.5rem]">
            <span className="text-secondary">ZERO</span>
            <span className="text-secondary-foreground">GRAVITY</span>
         </p>
      </div>
   );
}
