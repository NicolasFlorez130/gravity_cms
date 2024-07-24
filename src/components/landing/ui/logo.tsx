"use client";

import Image from "next/image";
import { cn } from "~/lib/utils";

interface ILogo {
   className?: string;
}

export default function Logo({ className }: ILogo) {
   return (
      <div id="logo" className={cn("flex items-center gap-2", className)}>
         <div className="relative aspect-square h-24">
            <Image
               alt="gravity logo"
               fill
               src="/icons/gravity_icon.png"
               className="object-fill"
            />
         </div>
      </div>
   );
}
