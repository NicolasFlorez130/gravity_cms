"use client";

import Image from "next/image";
import { Input } from "~/components/ui/input";

interface ISidebar {}

export default function Sidebar({}: ISidebar) {
   return (
      <div className="grid grid-rows-[auto_auto_1fr_auto] gap-5">
         <div className="flex gap-2">
            <Image
               alt="backoffice logo"
               src="/backoffice_logo.svg"
               height={21}
               width={21}
            />
            <p>Gravity</p>
         </div>
         <Input />
         <div></div>
         <div></div>
      </div>
   );
}
