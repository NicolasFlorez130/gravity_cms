"use client";

import Image from "next/image";
import { Input } from "./input";
import { Button, buttonVariants } from "./button";
import {
   CaretDoubleLeft,
   CaretDoubleRight,
   CaretDown,
   CaretUp,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import type { Group, ItemButton, ItemLink } from "~/lib/routes";

import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

interface ISidebar {
   navButtons: (ItemLink | ItemButton | Group)[];
}

export default function Sidebar({ navButtons }: ISidebar) {
   const pathname = usePathname();

   const [isExpanded, setIsExpanded] = useState(true);

   const flipState = useRef<ReturnType<typeof Flip.getState>>();

   useEffect(() => {
      gsap.registerPlugin(Flip);
   }, []);

   function toggleExpansion() {
      const elements: Parameters<typeof Flip.getState>[0] =
         gsap.utils.toArray(".expandable");

      flipState.current = Flip.getState(elements);

      setIsExpanded(prev => !prev);
   }

   useEffect(() => {
      if (!flipState.current) return;

      Flip.from(flipState.current, {
         duration: 0.2,
         ease: "none",
      });

      flipState.current = undefined;
   }, [isExpanded]);

   function ItemLink({ icon, label, url }: ItemLink) {
      const isThisRoute = pathname === url;

      return (
         <Link
            className={cn(
               buttonVariants({ variant: "ghost" }),
               "expandable flex w-full justify-start gap-2 truncate hover:bg-bo-blue-light/60",
               isThisRoute &&
                  "bg-bo-blue-light text-bo-blue hover:bg-bo-blue-light hover:text-bo-blue",
            )}
            href={url}
         >
            <span className="flex-none">{icon}</span>
            {isExpanded && label}
         </Link>
      );
   }

   function ItemButton({ icon, label, action }: ItemButton) {
      return (
         <Button
            variant="ghost"
            className="expandable flex w-full justify-start gap-2 truncate hover:bg-bo-blue-light/60"
            onClick={action}
         >
            <span className="flex-none">{icon}</span>
            {isExpanded && label}
         </Button>
      );
   }

   function GroupButton({ icon, items, label }: Group) {
      const [isOpen, setIsOpen] = useState(false);

      return (
         <>
            <Button
               variant="ghost"
               className={cn(
                  "expandable flex w-full items-center justify-between gap-2 truncate hover:bg-bo-blue-light/60",
                  isOpen && "opacity-50",
               )}
               onClick={() => setIsOpen(!isOpen)}
            >
               <span className="flex items-center gap-2">
                  {icon}
                  {isExpanded && label}
               </span>
               {isExpanded && (isOpen ? <CaretUp /> : <CaretDown />)}
            </Button>
            {isOpen && items.map((el, i) => <ItemButton key={i} {...el} />)}
         </>
      );
   }

   const [search, setSearch] = useState("");

   return (
      <div
         className={cn(
            "expandable sticky top-0 grid max-h-screen gap-5 p-4",
            isExpanded
               ? "w-60 grid-rows-[auto_auto_1fr_auto]"
               : "w-auto grid-rows-[auto_1fr_auto] justify-items-center",
         )}
      >
         <div className="expandable flex gap-2">
            <Image
               alt="backoffice logo"
               src="/icons/backoffice_logo.svg"
               height={25}
               width={25}
               className="expandable"
            />
            {isExpanded && (
               <p className="w-full truncate font-semibold">Gravity</p>
            )}
         </div>
         {isExpanded && (
            <Input
               value={search}
               onChange={({ target: { value } }) => setSearch(value)}
               placeholder="Buscar"
               className="expandable"
            />
         )}
         <nav className="expandable grid h-max">
            {navButtons
               .filter(
                  el =>
                     !search.length ||
                     el.label.toLowerCase().includes(search.toLowerCase()) ||
                     (el.type === "group" &&
                        el.items.some(group_el =>
                           group_el.label
                              .toLowerCase()
                              .includes(search.toLowerCase()),
                        )),
               )
               .map((el, i) =>
                  el.type === "link" ? (
                     <ItemLink key={i} {...el} />
                  ) : el.type === "button" ? (
                     <ItemButton key={i} {...el} />
                  ) : (
                     <GroupButton key={i} {...el} />
                  ),
               )}
         </nav>
         <Button
            className="expandable flex items-center justify-end gap-2"
            onClick={toggleExpansion}
            variant="ghost"
         >
            {isExpanded ? (
               <>
                  <CaretDoubleLeft /> Reducir
               </>
            ) : (
               <CaretDoubleRight />
            )}
         </Button>
      </div>
   );
}
