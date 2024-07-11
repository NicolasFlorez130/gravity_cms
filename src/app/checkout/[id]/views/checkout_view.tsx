"use client";

import Image from "next/image";
import { Button } from "~/components/landing/ui/button";
import Header from "~/components/landing/ui/header";
import { useStore } from "~/lib/features/store";
import { cn, formatCurrency, formatDateInSpanish } from "~/lib/utils";
import { type api } from "~/trpc/server";

interface ICheckoutView {
   appointment: Awaited<ReturnType<typeof api.appointments.getById>>;
}

export default function CheckoutView({ appointment }: ICheckoutView) {
   const packages = useStore.use.packages();

   return (
      <div className="relative grid h-screen grid-rows-[auto_1fr_auto] lg:grid-cols-[2fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-20">
         <div className="fixed top-1/3 hidden h-[150vh] w-screen opacity-10 lg:block -z-10">
            <Image
               src="/backgrounds/back_circle_light.png"
               alt="auth background"
               fill
               className="object-contain"
            />
         </div>
         <div className="border-b lg:col-span-2">
            <div>
               <Header />
            </div>
         </div>
         <div className="h-full overflow-auto lg:ml-20 lg:mt-12">
            <h1 className="mx-4 mt-5 text-2xl font-normal lg:mb-10 lg:text-4xl">
               Resumen de la reserva
            </h1>
            <div className="mb-8 lg:mb-12">
               {appointment?.services.map((service, i, { length }) => {
                  const pkg = packages.find(
                     ({ id }) => service.packageId === id,
                  );

                  return (
                     <div
                        key={service.id}
                        className={cn(
                           "grid grid-cols-[1fr_auto] gap-8 px-4 py-5",
                           i < length - 1 && "border-b",
                        )}
                     >
                        {/* {service.id} */}
                        <div className="grid w-full gap-2 truncate lg:gap-3">
                           <p className="w-full truncate font-medium lg:text-xl">
                              {pkg?.name}
                           </p>
                           <p className="text-sm font-light">
                              {formatDateInSpanish(service.date)}
                           </p>
                           {!!service.extraMinutes &&
                              service.extraMinutes > 0 && (
                                 <div className="mt-2 grid gap-1 text-sm lg:gap-2">
                                    <p className="font-light text-primary">
                                       Minutos extra
                                    </p>
                                    <p>{service.extraMinutes}</p>
                                 </div>
                              )}
                        </div>
                        <p className="self-end font-medium text-primary">
                           {formatCurrency(pkg?.price ?? 0)}
                        </p>
                     </div>
                  );
               })}
            </div>
         </div>
         <div className="grid h-min gap-11 bg-background-black p-5 lg:mr-20 lg:mt-12 lg:gap-24 lg:bg-transparent">
            <div className="flex flex-wrap justify-between gap-6 font-bold">
               <p className="w-full text-2xl font-light text-primary">
                  Total a pagar
               </p>
               <p>TOTAL</p>
               <p className="text-primary">
                  {formatCurrency(appointment?.booking.totalAmount ?? 0)}
               </p>
            </div>
            <Button>PAGAR AHORA</Button>
         </div>
      </div>
   );
}
