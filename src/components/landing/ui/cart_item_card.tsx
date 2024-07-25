"use client";

import { useStore } from "~/lib/features/store";
import { Card, CardContent, CardHeader } from "./card";
import type { BookingPackage } from "~/lib/features/slices/cart_slice";
import { Button } from "./button";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import {
   filterDates,
   findDatesWithOccurrences,
   formatCurrency,
   parseDateToMidnightStartOfDay,
   parseEventForNumber,
   setDateTimeTo0,
   setDateTimeToMidnight,
} from "~/lib/utils";
import type { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import type { InputObject } from "~/server/api/routers/appointments";
import { useMemo } from "react";
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "./form";
import { Input } from "./input";
import { DatePicker } from "./date_picker";
import { holidaysWithinInterval } from "colombian-holidays/lib/utils/holidaysWithinInterval";
import { addYears } from "date-fns";

interface ICartItemCard {
   item: BookingPackage;
   remove: UseFieldArrayRemove;
   form: UseFormReturn<InputObject>;
   i: number;
   updateTotalSum(): void;
}

export default function CartItemCard({
   item,
   form,
   i,
   remove,
   updateTotalSum,
}: ICartItemCard) {
   const packages = useStore.use.packages();
   const removeFromCart = useStore.use.removeFromCart();
   const servicesBooked = useStore.use.appointments();
   const disableDates = useStore.use.disabledDays();

   const pkg = packages.find(({ id }) => id === item.packageId);

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
         <CardContent className="grid grid-cols-1 gap-4 p-0 lg:grid-cols-2 lg:items-end lg:gap-8">
            <FormField
               control={form.control}
               name={`packages.${i}.extraMinutes`}
               render={({ field }) => (
                  <FormItem className="grid w-full grid-cols-2 items-center gap-2 space-y-0">
                     <FormLabel>Minutos extra</FormLabel>
                     <FormControl>
                        <Input
                           {...field}
                           value={field.value ?? undefined}
                           type="number"
                           onChange={parseEventForNumber(
                              field.onChange,
                              updateTotalSum,
                           )}
                           min={0}
                        />
                     </FormControl>
                     <FormMessage className="col-span-2 w-full text-end" />
                  </FormItem>
               )}
            />
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
                           setDate={parseDateToMidnightStartOfDay(
                              field.onChange,
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
         </CardContent>
      </Card>
   );
}
