"use client";

import {
   Baby,
   Question,
   User,
   Users,
   UsersFour,
   UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import {
   availabilityOptions,
   cn,
   formatCurrency,
   generateRandomString,
   verifyAvailability,
} from "~/lib/utils";
import type { IPackage } from "~/types/packages";
import { Card } from "./card";
import { Button } from "./button";
import { useStore } from "~/lib/features/store";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

interface IPackageCard {
   pkg: IPackage;
}

export default function PackageCard({ pkg }: IPackageCard) {
   const highlight = verifyAvailability(pkg.availability, new Date());

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

   const addPackageToCart = useStore.use.addPackageToCart();

   return (
      <Card className={cn("grid gap-6 px-4", highlight && "border-foreground")}>
         <div className="flex justify-between">
            <div className="flex gap-4">
               <UsersIcon size={41} className="text-white" />
               {pkg.forChildren && <Baby size={41} className="text-white" />}
            </div>
            <HoverCard openDelay={0}>
               <HoverCardTrigger>
                  <Question className="text-2xl hover:cursor-pointer" />
               </HoverCardTrigger>
               <HoverCardContent>
                  Aplican términos y condiciones por peso.
               </HoverCardContent>
            </HoverCard>
         </div>
         <Button
            className="w-full truncate"
            variant={highlight ? "highlight" : "primary"}
            onClick={() => {
               addPackageToCart([
                  { packageId: pkg.id, id: generateRandomString() },
               ]);
            }}
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
}
