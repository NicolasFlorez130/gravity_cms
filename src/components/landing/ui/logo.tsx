"use client";

import Image from "next/image";
import { cn } from "~/lib/utils";

interface ILogo {
   className?: string;
}

export default function Logo({ className }: ILogo) {
   return (
      <div id="logo" className={cn("flex items-center", className)}>
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
