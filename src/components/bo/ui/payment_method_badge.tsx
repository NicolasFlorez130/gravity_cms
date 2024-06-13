"use client";

import type { AppointmentPaymentMethod } from "~/types/appointments";
import { Badge } from "./badge";

interface IPaymentMethodBadge {
   paymentMethod: AppointmentPaymentMethod;
}

export default function PaymentMethodBadge({
   paymentMethod,
}: IPaymentMethodBadge) {
   const translation = (() => {
      switch (paymentMethod) {
         case "COURTESY":
            return "Cortesía";
         case "LANDING":
            return "Landing";
         case "ONLINE":
            return "Online";
         default:
            return "En sitio";
      }
   })();

   return <Badge className="bg-accent">{translation}</Badge>;
}
