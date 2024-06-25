"use client";

import type { AppointmentPaymentMethod } from "~/types/appointments";
import { Badge } from "./badge";
import { translatePaymentMethod } from "~/lib/utils";

interface IPaymentMethodBadge {
   paymentMethod: AppointmentPaymentMethod;
}

export default function PaymentMethodBadge({
   paymentMethod,
}: IPaymentMethodBadge) {
   return (
      <Badge className="bg-accent">
         {translatePaymentMethod(paymentMethod)}
      </Badge>
   );
}
