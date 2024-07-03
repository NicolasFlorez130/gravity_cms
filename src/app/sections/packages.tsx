"use client";

import { Card } from "~/components/landing/ui/card";
import { Button } from "~/components/landing/ui/button";
import {
   Baby,
   User,
   Users,
   UsersFour,
   UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import {
   availabilityOptions,
   cn,
   formatCurrency,
   verifyAvailability,
} from "~/lib/utils";
import type { IPackage } from "~/types/packages";

interface IPackages {
   packages: IPackage[];
}

export default function Packages({ packages }: IPackages) {
   return (
      <section className="relative xl:grid xl:grid-cols-[2fr_5fr] xl:bg-bg_veil/80 xl:p-36">
         <div className="relative grid aspect-square w-full place-items-center bg-bg_veil/80 sm:aspect-[744/344] lg:aspect-[1024/344] xl:static xl:aspect-auto xl:bg-transparent">
            <h2 className="text-center font-epilogue text-5xl font-light text-white">
               Reserva tu <br className="hidden sm:block" /> vuelo aquí
            </h2>
            <Image
               alt="booking background"
               fill
               src="/backgrounds/packages_background.png"
               className="-z-10 object-cover"
            />
         </div>
         <div className="grid h-max gap-5 bg-background-dark px-3 py-10 sm:grid-cols-2 lg:px-36 xl:gap-14 xl:bg-transparent xl:px-0">
            {packages.map((pkg, i) => {
               const highlight = verifyAvailability(
                  pkg.availability,
                  new Date(),
               );

               const UsersIcon = (() => {
                  switch (pkg.usersQuantity) {
                     case 1:
                        return User;
                     case 2:
                        return Users;
                     case 3:
                        return UsersThree;
                     default:
                        return UsersFour;
                  }
               })();

               return (
                  <Card
                     key={i}
                     className={cn(
                        "grid gap-6 px-4",
                        highlight && "border-foreground",
                     )}
                  >
                     <div className="flex gap-4">
                        <UsersIcon size={41} className="text-white" />
                        {pkg.forChildren && (
                           <Baby size={41} className="text-white" />
                        )}
                     </div>
                     <Button
                        className="w-full truncate"
                        variant={highlight ? "highlight" : "primary"}
                     >
                        {pkg.name.toUpperCase()}
                     </Button>
                     <div className="grid gap-3 text-white">
                        <p
                           className={cn(
                              "w-full font-bold uppercase italic",
                              !highlight && "text-muted",
                           )}
                        >
                           {
                              availabilityOptions.find(
                                 opt => opt.value === pkg.availability,
                              )?.label
                           }
                        </p>
                        <p>{pkg.description}</p>
                        <p className="grid gap-1 font-bold text-primary">
                           <span>TOTAL: {formatCurrency(pkg.price)}</span>{" "}
                           <span className="text-xs text-muted">
                              MINUTO EXTRA: {formatCurrency(pkg.minutePrice)}
                           </span>
                        </p>
                     </div>
                  </Card>
               );
            })}
         </div>
      </section>
   );
}
