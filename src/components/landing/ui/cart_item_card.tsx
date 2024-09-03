"use client";

import { useStore } from "~/lib/features/store";
import { Card, CardContent, CardHeader } from "./card";
import type { BookingPackage } from "~/lib/features/slices/cart_slice";
import { Button } from "./button";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import {
   filterDates,
   filteredHours,
   findDatesWithOccurrences,
   formatCurrency,
   onChangeSetDateTimeTo0,
   setDateTimeTo0,
   setDateTimeToMidnight,
} from "~/lib/utils";
import type { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import type { InputObject } from "~/server/api/routers/appointments";
import { useMemo, useState } from "react";
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "./form";
import { DatePicker } from "./date_picker";
import { holidaysWithinInterval } from "colombian-holidays/lib/utils/holidaysWithinInterval";
import { addYears } from "date-fns";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./select";

interface ICartItemCard {
   item: BookingPackage;
   remove: UseFieldArrayRemove;
   form: UseFormReturn<InputObject>;
   i: number;
   updateTotalSum(): void;
}

export default function CartItemCard({ item, form, i, remove }: ICartItemCard) {
   const packages = useStore.use.packages();
   const removeFromCart = useStore.use.removeFromCart();
   const servicesBooked = useStore.use.appointments();
   const disableDates = useStore.use.disabledDays();
   const hours = useStore.use.hours();

   const pkg = packages.find(({ id }) => id === item.packageId);

   const [daySelected, setDaySelected] = useState(
      form.getValues().packages?.at(i)?.date,
   );

   const unavailableDates = useMemo(
      () => [
         ...findDatesWithOccurrences(
            servicesBooked,
            ({ service: { date } }) => date,
         ),
         ...disableDates.map(({ date }) => date),
      ],
      [servicesBooked, disableDates],
   );

   const now = new Date();

   const dates = {
      start: setDateTimeTo0(now),
      end: setDateTimeToMidnight(addYears(now, 1)),
   };

   const holidaysDates = useMemo(
      () =>
         holidaysWithinInterval({
            ...dates,
            valueAsDate: true,
         })
            .map(({ date }) => date)
            .filter(date => !!date),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
   );

   function updateDaySelected() {
      setDaySelected(form.getValues().packages.at(i)?.date);
   }

   return (
      <Card className="grid gap-4 p-4">
         <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 p-0">
            <div className="grid w-full truncate text-lg">
               <p className="w-full truncate text-gray-300">{pkg?.name}</p>
               <p className="font-medium">{formatCurrency(pkg?.price ?? 0)}</p>
            </div>
            <Button
               type="button"
               className="aspect-square h-max border p-2 text-primary"
               onClick={() => {
                  remove(i);
                  removeFromCart(i);
               }}
            >
               <Trash />
            </Button>
         </CardHeader>
         <CardContent className="grid grid-cols-1 gap-4 p-0 lg:grid-cols-2 lg:items-end lg:gap-6">
            <FormField
               control={form.control}
               name={`packages.${i}.date`}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="flex-none">
                        Selecciona la fecha
                     </FormLabel>
                     <FormControl>
                        <DatePicker
                           disabled={field.disabled}
                           className="w-full"
                           date={field.value}
                           setDate={onChangeSetDateTimeTo0(
                              field.onChange,
                              updateDaySelected,
                           )}
                           disabledDates={[
                              {
                                 before: dates.start,
                                 after: dates.end,
                              },
                              ...filterDates(
                                 dates.start,
                                 dates.end,
                                 holidaysDates,
                                 pkg?.availability ?? "EVERY_DAY",
                              ),
                              ...unavailableDates,
                           ]}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name={`packages.${i}.hourId`}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="flex-none">Hora</FormLabel>
                     <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!daySelected || field.disabled}
                     >
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue placeholder="Selecciona una hora" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {filteredHours(
                              hours,
                              servicesBooked.filter(
                                 ({ service: { date } }) =>
                                    setDateTimeTo0(date).getTime() ===
                                    daySelected?.getTime(),
                              ),
                           ).map(hour => (
                              <SelectItem key={hour.id} value={hour.id}>
                                 {hour.displayValue}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     <FormMessage className="col-span-2 w-full text-end" />
                  </FormItem>
               )}
            />
         </CardContent>
      </Card>
   );
}
