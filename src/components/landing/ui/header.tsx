"use client";

import Logo from "./logo";
import { buttonVariants } from "./button";
import Link from "next/link";
import { cn } from "~/lib/utils";

interface IHeader {}

export default function Header({}: IHeader) {
   return (
      <header
         id="landing_header"
         className="flex w-full justify-center self-start md:px-14 p-8 md:pt-10 lg:justify-between lg:px-10"
      >
         <Logo />
         <nav className="hidden h-max items-stretch gap-5 lg:flex">
            <Link
               href="/#packages_list"
               className={cn(buttonVariants({ variant: "primary" }))}
            >
               RESERVAR
            </Link>
         </nav>
      </header>
   );
}
