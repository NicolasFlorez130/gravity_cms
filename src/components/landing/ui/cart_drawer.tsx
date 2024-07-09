"use client";

import { X } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./button";
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "./drawer";
import { useStore } from "~/lib/features/store";
import CartItemCard from "./cart_item_card";
import { api } from "~/trpc/react";
import { useRouterRefresh } from "~/lib/hooks/useRouterRefresh";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookAppointmentSchema } from "~/server/db/schemas/appointments";
import { useEffect, useState } from "react";
import type { IPackage } from "~/types/packages";
import type { InputObject } from "~/server/api/routers/appointments";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "./form";
import { Input } from "./input";
import { cn, formatCurrency } from "~/lib/utils";
import { useToast } from "./use-toast";
import Loading from "~/components/shared/loading";

export function CartDrawer() {
   const { toast } = useToast();

   const { refresh } = useRouterRefresh();

   const cart = useStore.use.cart();
   const setCart = useStore.use.setCart();
   const packages = useStore.use.packages();

   const { mutate, isPending } = api.appointments.book.useMutation({
      onSuccess: async () => {
         await refresh();
         toast({
            title: "Reserva agendada con éxito",
            description:
               "Preséntate el dia de las reservas con tu documento de identidad.",
         });

         form.reset();
         setCart([]);
      },
   });

   const form = useForm<InputObject>({
      resolver: zodResolver(bookAppointmentSchema),
      defaultValues: {
         packages: [],
         paymentMethod: "LANDING",
         clientEmail: "",
         clientNames: "",
         clientPhoneNumber: "",
         totalAmount: 0,
      },
      disabled: isPending,
   });

   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "packages",
   });

   const [totalSum, setTotalSum] = useState(0);

   function updateTotalSum() {
      const pkgs = new Map<string, IPackage>();

      packages.forEach(pkg => pkgs.set(pkg.id, pkg));

      let sum = 0;

      form.getValues().packages?.forEach(el => {
         const pkg = pkgs.get(el.packageId);

         sum += pkg ? pkg.price + pkg.minutePrice * (el.extraMinutes ?? 0) : 0;
      });

      setTotalSum(sum);
   }

   useEffect(() => {
      form.setValue("totalAmount", totalSum);
   }, [totalSum, form]);

   const [addedPackages, setAddedPackages] = useState<string[]>([]);

   useEffect(() => {
      const aux = [...addedPackages];

      cart.forEach(({ packageId, id }) => {
         if (!addedPackages.some(el => el === id)) {
            append({ packageId, date: undefined as unknown as Date });

            aux.push(id);
         }
      });

      setAddedPackages(aux);

      updateTotalSum();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [cart]);

   return (
      <Drawer>
         <DrawerTrigger asChild>
            <Button variant="primary" className="relative w-max backdrop-blur">
               {
                  <div
                     className={cn(
                        "absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-black opacity-0 transition-all",
                        !!cart.length && "opacity-100",
                     )}
                  >
                     {cart.length}
                  </div>
               }
               RESERVA AQUÍ
            </Button>
         </DrawerTrigger>
         <DrawerContent className="grid grid-rows-[auto_1fr]">
            <DrawerHeader className="grid grid-cols-[1fr_auto] items-center gap-4">
               <div>
                  <DrawerTitle>Tus reservas</DrawerTitle>
                  <DrawerDescription>
                     Programa las fechas de tus reservas y guardaremos tu cupo
                  </DrawerDescription>
               </div>
               <DrawerClose asChild>
                  <Button className="text-primary" variant="ghost">
                     <X size={32} />
                  </Button>
               </DrawerClose>
            </DrawerHeader>
            <Form {...form}>
               <form
                  className="relative"
                  onSubmit={form.handleSubmit(data => mutate(data))}
               >
                  <div className="grid gap-4 p-4">
                     {fields.length ? (
                        fields.map((item, i) => (
                           <CartItemCard
                              key={item.id}
                              item={item}
                              form={form}
                              i={i}
                              remove={remove}
                              updateTotalSum={updateTotalSum}
                           />
                        ))
                     ) : (
                        <>No has agregado ningún paquete</>
                     )}
                  </div>

                  <div className="grid gap-4 bg-background-black p-4 lg:grid-cols-2">
                     <p className="font-semibold lg:col-span-2">
                        Datos para programar la reserva
                     </p>
                     <FormField
                        control={form.control}
                        name="clientNames"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Nombres</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="clientPhoneNumber"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Teléfono</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="clientEmail"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <DrawerFooter className="bottom-0 grid w-full gap-4">
                     <div className="flex justify-between gap-2 font-semibold">
                        <p className="col-span-2">Total a pagar:</p>
                        <p className="text-primary">
                           {formatCurrency(totalSum)}
                        </p>
                     </div>
                     <Button
                        type="submit"
                        variant="muted"
                        className="flex items-center justify-center"
                        disabled={isPending || !fields.length}
                     >
                        {isPending ? <Loading /> : <>PROGRAMAR AHORA</>}
                     </Button>
                  </DrawerFooter>
               </form>
            </Form>
         </DrawerContent>
      </Drawer>
   );
}
