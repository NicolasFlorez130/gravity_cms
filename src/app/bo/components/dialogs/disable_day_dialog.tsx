"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/bo/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "~/components/bo/ui/dialog";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "~/components/bo/ui/form";
import Loading from "~/components/shared/loading";
import { getDatesBetween } from "~/lib/utils";
import { DateRangePicker } from "../../../../components/bo/ui/date_range_picker";
import { z } from "zod";
import { useRouterRefresh } from "~/lib/hooks/useRouterRefresh";
import { useStore } from "~/lib/features/store";

interface IDisableDayDialog {}

export default function DisableDayDialog({}: IDisableDayDialog) {
   const disabledDates = useStore.use.disabledDays();

   const { refresh } = useRouterRefresh();

   const [isOpen, setIsOpen] = useState(false);

   const { mutate, isPending } = api.disabledDays.disableDates.useMutation({
      onSuccess: async () => {
         await refresh();
         setIsOpen(false);
         form.reset();
      },
   });

   const form = useForm<{
      dates: {
         from: Date;
         to: Date;
      };
   }>({
      resolver: zodResolver(
         z.object({ dates: z.object({ from: z.date(), to: z.date() }) }),
      ),
      disabled: isPending,
   });

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button variant="outline">Deshabilitar días</Button>
         </DialogTrigger>
         <DialogContent className="grid h-max w-[30vw] max-w-lg gap-6 text-black">
            <DialogHeader>
               <DialogTitle>Deshabilitar día</DialogTitle>
            </DialogHeader>
            <div className="grid p-6 pt-0">
               <Form {...form}>
                  <form
                     className="space-y-5"
                     onSubmit={form.handleSubmit(({ dates: { from, to } }) =>
                        mutate(
                           getDatesBetween(from ?? new Date(), to ?? from)
                              .filter(date =>
                                 !disabledDates.some(
                                    ({ date: $date }) =>
                                       $date.getTime() === date.getTime(),
                                 ),
                              )
                              .map(date => ({ date })),
                        ),
                     )}
                  >
                     <FormField
                        control={form.control}
                        name="dates"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Días</FormLabel>
                              <FormControl>
                                 <DateRangePicker
                                    disabledDates={[
                                       { before: new Date() },
                                       ...disabledDates.map(({ date }) => date),
                                    ]}
                                    disabled={field.disabled}
                                    className="w-full"
                                    dates={field.value}
                                    setDates={field.onChange}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <Button
                        disabled={isPending}
                        type="submit"
                        variant="purple"
                     >
                        {isPending ? <Loading /> : <>Deshabilitar</>}
                     </Button>
                  </form>
               </Form>
            </div>
         </DialogContent>
      </Dialog>
   );
}
