"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/landing/button";
import { PhoneCall } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { es } from "date-fns/locale";
import { cn, formatCurrency } from "@/lib/utils";
import { Day } from "date-fns";

interface IBooking {}

const items = [
   {
      name: "Paquete individual",
      days: [1, 2, 3, 4, 5],
      description: "Incluye dos vuelos 35.000 cada uno",
      price: 70000,
   },
   {
      name: "Paquete niños",
      days: [1, 2, 3, 4, 5],
      description: "Incluye dos vuelos 25.000 cada uno",
      price: 50000,
      label: "Promoción",
   },
   {
      name: "Paquete individual",
      days: [0, 5, 6],
      description: "Incluye dos vuelos 47.000 cada uno",
      price: 95000,
      label: "Promoción validad desde el 24",
   },
   {
      name: "Paquete individual",
      days: [0, 1, 2, 3, 4, 5, 6],
      description: "Incluye 15 VUELOS 32.666 cada uno",
      price: 490000,
   },
];

export default function Booking({}: IBooking) {
   return (
      <section>
         <div className="bg-bg_veil relative grid aspect-square w-full place-items-center">
            <h2 className="text-center font-epilogue text-5xl font-light text-white">
               Reserva tu vuelo aquí
            </h2>
            <Image
               alt="booking background"
               fill
               src="/backgrounds/packages_background.png"
               className="-z-10 object-cover"
            />
         </div>
         <div className="grid gap-5 bg-background px-3 py-10">
            {items.map((item, i) => {
               const highlight = item.days.some(day => day === 0 || day === 6);

               return (
                  <Card
                     key={i}
                     className={cn(
                        "grid gap-6 px-4",
                        highlight && "border-foreground",
                     )}
                  >
                     <div className="flex items-center justify-between">
                        <PhoneCall size={41} className="text-white" />
                        <p className="font-epilogue text-xs text-accent">
                           {item.label}
                        </p>
                     </div>
                     <Button variant={highlight ? "highlight" : "primary"}>
                        {item.name.toUpperCase()}
                     </Button>
                     <div className="grid gap-3 text-white">
                        <p
                           className={cn(
                              "w-full font-bold italic",
                              !highlight && "text-muted",
                           )}
                        >
                           {item.days.map((day, i, { length }) => (
                              <span key={day}>
                                 {es.localize
                                    .day(day as Day, { width: "wide" })
                                    .toUpperCase()}
                                 {i !== length - 1 && " - "}
                              </span>
                           ))}
                        </p>
                        <p>{item.description}</p>
                        <p className="font-bold text-primary">
                           TOTAL {formatCurrency(item.price)}
                        </p>
                     </div>
                  </Card>
               );
            })}
         </div>
      </section>
   );
}
