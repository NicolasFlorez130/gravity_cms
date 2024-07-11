"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "~/components/landing/ui/button";
import { Card } from "~/components/landing/ui/card";
import Header from "~/components/landing/ui/header";
import Loading from "~/components/shared/loading";
import { env } from "~/env";
import { useStore } from "~/lib/features/store";
import { cn, formatCurrency, formatDateInSpanish } from "~/lib/utils";
import { type api } from "~/trpc/server";

interface ICheckoutView {
   appointment: NonNullable<
      Awaited<ReturnType<typeof api.appointments.getById>>
   >;
   hashHex: string;
}

export default function CheckoutView({ appointment, hashHex }: ICheckoutView) {
   const packages = useStore.use.packages();

   const paymentButton = useRef<HTMLDivElement | null>(null);
   const boldButton = useRef<HTMLElement | null>(null);

   const [scriptLoaded, setScriptLoaded] = useState(false);

   useEffect(() => {
      function repositionButton() {
         boldButton.current = document.querySelector(
            "bold-payment-button",
         ) as HTMLElement | null;

         if (!!paymentButton.current && !!boldButton.current) {
            boldButton.current.classList.add("absolute");

            const rect = paymentButton.current.getBoundingClientRect();

            boldButton.current.style.top = `${rect.top + window.scrollY}px`;
            boldButton.current.style.left = `${rect.left + window.scrollX}px`;
            boldButton.current.style.width = `${rect.width}px`;
            boldButton.current.style.height = `${rect.height}px`;

            setScriptLoaded(true);
         }
      }

      document
         .querySelector(
            'script[src="https://checkout.bold.co/library/boldPaymentButton.js"]',
         )
         ?.addEventListener("load", repositionButton);

      window.addEventListener("resize", repositionButton);

      const interval = setInterval(() => {
         if (!scriptLoaded) {
            repositionButton();
         } else {
            clearInterval(interval);
         }
      }, 100);

      return () => {
         document
            .querySelector(
               'script[src="https://checkout.bold.co/library/boldPaymentButton.js"]',
            )
            ?.removeEventListener("load", repositionButton);

         window.removeEventListener("resize", repositionButton);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="relative grid h-screen grid-rows-[auto_1fr_auto] lg:grid-cols-[2fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-20">
         <div className="fixed top-1/3 -z-10 hidden h-[150vh] w-screen opacity-10 lg:block">
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
         <div className="h-full overflow-auto lg:ml-20 lg:pt-12">
            <h1 className="mx-4 pt-5 text-2xl font-normal lg:mb-10 lg:text-4xl">
               Resumen de la reserva
            </h1>
            <div className="mb-8 lg:mb-12">
               {appointment.services.map((service, i, { length }) => {
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
                                 <div className="grid gap-1 pt-2 text-sm lg:gap-2">
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
         <Card className="grid h-min gap-11 bg-background-black p-5 lg:mr-20 lg:mt-12 lg:bg-transparent [&_bold-payment-button_button]:hidden">
            <div className="flex flex-wrap justify-between gap-6 font-bold">
               <p className="w-full text-2xl font-light text-primary">
                  Total a pagar
               </p>
               <p>TOTAL</p>
               <p className="text-primary">
                  {formatCurrency(appointment.booking.totalAmount ?? 0)}
               </p>
            </div>
            <div
               className={cn(
                  scriptLoaded && "invisible",
                  buttonVariants({
                     variant: scriptLoaded ? "primary" : "ghost",
                  }),
                  "transition-none",
               )}
               ref={paymentButton}
            >
               <Loading />
            </div>
         </Card>
         <Script
            data-bold-button="light-L"
            data-order-id={appointment.booking.id}
            data-currency="COP"
            data-amount={appointment.booking.totalAmount}
            data-api-key={env.NEXT_PUBLIC_BOLD_KEY}
            data-integrity-signature={hashHex}
            data-redirection-url="https://micomercio.com/pagos/resultado"
         />
      </div>
   );
}
