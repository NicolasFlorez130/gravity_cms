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
         default:
            return "Pendiente";
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
                  default:
                     return "border-gray-500 text-gray-500";
               }
            })(),
         )}
      >
         {translation}
      </Badge>
   );
}
