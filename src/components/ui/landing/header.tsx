"use client";

import Logo from "./logo";

interface IHeader {}

export default function Header({}: IHeader) {
   return (
      <header className="flex w-full justify-center px-14 pb-8 pt-10">
         <Logo />
      </header>
   );
}
