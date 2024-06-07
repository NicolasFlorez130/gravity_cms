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
import { useState } from "react";
import { cn } from "~/lib/utils";
import type { Group, ItemButton, ItemLink } from "~/lib/routes";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISidebar {
   navButtons: (ItemLink | ItemButton | Group)[];
}

export default function Sidebar({ navButtons }: ISidebar) {
   const pathname = usePathname();

   const [isExpanded, setIsExpanded] = useState(true);

   function ItemLink({ icon, label, url }: ItemLink) {
      const isThisRoute = pathname === url;

      return (
         <Link
            className={cn(
               buttonVariants({ variant: "ghost" }),
               "flex w-full justify-start gap-2 truncate hover:bg-bo-blue-light/60",
               isThisRoute &&
                  "bg-bo-blue-light text-bo-blue hover:bg-bo-blue-light hover:text-bo-blue",
            )}
            href={url}
         >
            {icon}
            {isExpanded && label}
         </Link>
      );
   }

   function ItemButton({ icon, label, action }: ItemButton) {
      return (
         <Button
            variant="ghost"
            className="flex w-full justify-start gap-2 truncate hover:bg-bo-blue-light/60"
            onClick={action}
         >
            {icon}
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
                  "flex w-full items-center justify-between gap-2 truncate hover:bg-bo-blue-light/60",
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
            "sticky top-0 grid max-h-screen grid-rows-[auto_auto_1fr_auto] gap-5 p-4",
            isExpanded ? "w-60" : "justify-items w-auto justify-items-center",
         )}
      >
         <div className="flex gap-2">
            <Image
               alt="backoffice logo"
               src="/icons/backoffice_logo.svg"
               height={25}
               width={25}
            />
            {isExpanded && (
               <p className="w-full truncate font-semibold">Gravity</p>
            )}
         </div>
         <Input
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
            placeholder="Buscar"
            className={cn(!isExpanded && "invisible w-0")}
         />
         <nav className="grid h-max">
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
            className="flex items-center justify-end gap-2"
            onClick={() => setIsExpanded(prev => !prev)}
            variant="link"
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
