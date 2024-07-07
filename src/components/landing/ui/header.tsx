"use client";

import Logo from "./logo";
import { CartDrawer } from "./cart_drawer";

interface IHeader {}

export default function Header({}: IHeader) {
   return (
      <header
         id="landing_header"
         className="flex w-full justify-center self-start px-14 pb-8 pt-10 lg:justify-between lg:px-10"
      >
         <Logo />
         <nav
            id="header_buttons"
            className="hidden h-max items-stretch gap-5 lg:flex"
         >
            <CartDrawer />
         </nav>
      </header>
   );
}
