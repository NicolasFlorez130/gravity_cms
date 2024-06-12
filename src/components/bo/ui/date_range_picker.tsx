"use client";

import { format } from "date-fns";
import type { Dispatch, SetStateAction } from "react";
import { type DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { cn } from "~/lib/utils";

interface IDateRangePicker {
   dates: DateRange | undefined;
   setDates: Dispatch<SetStateAction<DateRange | undefined>>;
   className?: string;
}

export function DateRangePicker({
   dates,
   setDates,
   className,
}: IDateRangePicker) {
   return (
      <div className={cn("grid gap-2", className)}>
         <Popover>
            <PopoverTrigger asChild>
               <Button
                  id="dates"
                  variant={"outline"}
                  className={cn(
                     "w-[300px] justify-start text-left font-normal",
                     !dates && "text-muted-foreground",
                  )}
               >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dates?.from ? (
                     dates.to ? (
                        <>
                           {format(dates.from, "LLL dd, y")} -{" "}
                           {format(dates.to, "LLL dd, y")}
                        </>
                     ) : (
                        format(dates.from, "LLL dd, y")
                     )
                  ) : (
                     <span>Selecciona fechas</span>
                  )}
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
               <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dates?.from}
                  selected={dates}
                  onSelect={setDates}
                  numberOfMonths={2}
               />
            </PopoverContent>
         </Popover>
      </div>
   );
}
