"use client";

import type { AppointmentStatus } from "~/types/appointments";
import { Badge } from "./badge";
import { cn } from "~/lib/utils";

interface IStatusBadge {
   status: AppointmentStatus;
}

export default function StatusBadge({ status }: IStatusBadge) {
   const translation = (() => {
      switch (status) {
         case "ATTENDED":
            return "Atendido";
         case "PAID":
            return "Pagado";
         case "PENDING":
            return "Pendiente";
         case "CANCELED":
            return "Cancelado";
      }
   })();

   return (
      <Badge
         className={cn(
            "bg-transparent",
            (() => {
               switch (status) {
                  case "PENDING":
                     return "border-bo-red text-bo-red";
                  case "PAID":
                     return "border-bo-green text-bo-green";
                  case "ATTENDED":
                     return "border-gray-500 text-gray-500";
                  case "CANCELED":
                     return "border-yellow-300 text-yellow-300";
               }
            })(),
         )}
      >
         {translation}
      </Badge>
   );
}
