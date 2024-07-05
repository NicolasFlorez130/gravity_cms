"use client";

import { PushPin } from "@phosphor-icons/react/dist/ssr";
import Logo from "./logo";
import { Button } from "./button";
import { DrawerDemo } from "./cart_drawer";

interface IHeader {}

export default function Header({}: IHeader) {
   return (
      <header className="flex w-full justify-center self-start px-14 pb-8 pt-10 lg:justify-between lg:px-10">
         <Logo />
         <nav
            id="header_buttons"
            className="hidden h-max items-stretch gap-5 lg:flex"
         >
            <DrawerDemo />
            <Button className="aspect-square h-max border-white p-4">
               <PushPin size={26} />
            </Button>
         </nav>
      </header>
   );
}
