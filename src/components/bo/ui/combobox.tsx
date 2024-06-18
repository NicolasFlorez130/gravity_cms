"use client";

import { type ReactNode, useState } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ChevronsUpDown } from "lucide-react";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandList,
} from "./command";

interface ICombobox {
   textValue: ReactNode;
   placeholder: string;
   children: ReactNode;
}

export default function Combobox({
   textValue,
   placeholder,
   children,
}: ICombobox) {
   const [open, setOpen] = useState(false);

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className="w-[200px] justify-between"
            >
               {textValue}
               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[200px] p-0">
            <Command>
               <CommandInput placeholder={placeholder} />
               <CommandList>
                  <CommandEmpty>No encontrado</CommandEmpty>
                  <CommandGroup>{children}</CommandGroup>
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   );
}
