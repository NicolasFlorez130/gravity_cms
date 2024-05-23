"use client";

import Link from "next/link";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import { PushPin } from "@phosphor-icons/react/dist/ssr";

interface IHeader {}

export default function Header({}: IHeader) {
   return (
      <header className="flex w-full justify-center px-14 pb-8 pt-10 lg:justify-between lg:px-0">
         <Logo />
         <div className="hidden h-max items-stretch gap-5 lg:flex">
            <Link
               href="#"
               className={cn(buttonVariants({ variant: "primary" }), "w-max")}
            >
               RESERVA AQUÍ
            </Link>
            <Button className="aspect-square h-max border-white p-4">
               <PushPin size={26} />
            </Button>
         </div>
      </header>
   );
}
