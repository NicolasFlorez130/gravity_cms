"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button, type ButtonProps } from "./button";
import { cn } from "~/lib/utils";
import type { Matcher } from "react-day-picker";
import { Calendar } from "~/components/shared/calendar";

interface IDatePicker extends ButtonProps {
   date: Date | undefined;
   setDate: Dispatch<SetStateAction<Date | undefined>>;
   disabledDates?: Matcher | Matcher[];
}

export function DatePicker({
   date,
   setDate,
   className,
   disabledDates,
   ...props
}: IDatePicker) {
   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               {...props}
               variant="ghost"
               className={cn(
                  "flex w-full items-center justify-between rounded-full border-b-2 border-input bg-background-dark p-3 text-sm !text-white ring-offset-background-dark placeholder:text-gray-300 hover:!bg-background-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  !date && "text-muted-foreground",
                  className,
               )}
            >
               {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
               <CalendarIcon className="mr-2 h-4 w-4" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0">
            <Calendar
               mode="single"
               selected={date}
               onSelect={setDate}
               initialFocus
               disabled={disabledDates}
            />
         </PopoverContent>
      </Popover>
   );
}
