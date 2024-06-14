"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button, type ButtonProps } from "./button";
import { cn } from "~/lib/utils";
import { Calendar } from "./calendar";

interface IDatePicker extends ButtonProps {
   date: Date | undefined;
   setDate: Dispatch<SetStateAction<Date | undefined>>;
}

export function DatePicker({
   date,
   setDate,
   className,
   ...props
}: IDatePicker) {
   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant={"outline"}
               {...props}
               className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                  className,
               )}
            >
               <CalendarIcon className="mr-2 h-4 w-4" />
               {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0">
            <Calendar
               mode="single"
               selected={date}
               onSelect={setDate}
               initialFocus
            />
         </PopoverContent>
      </Popover>
   );
}
