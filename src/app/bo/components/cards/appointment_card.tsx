"use client";

import { format } from "date-fns";
import { Card, CardContent, CardTitle } from "~/components/bo/ui/card";
import { Checkbox } from "~/components/bo/ui/checkbox";
import { Chip } from "~/components/bo/ui/chip";
import { useRouterRefresh } from "~/lib/hooks/useRouterRefresh";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import type { Appointment } from "~/types/appointments";

interface IAppointmentCard {
   data: Appointment;
}

export default function AppointmentCard({
   data: { booking, service },
}: IAppointmentCard) {
   const { refresh } = useRouterRefresh();

   const { mutate, isPending } =
      api.appointments.markServiceAsAttended.useMutation({
         onSuccess: refresh,
      });

   return (
      <Card
         className={cn(
            "grid w-full gap-2 border-bo-card-border bg-bo-card-background p-3",
            isPending && "opacity-50",
         )}
      >
         <CardTitle className="flex w-full items-center gap-2 truncate">
            <Checkbox disabled={isPending} onClick={() => mutate(service.id)} />
            <p
               className={cn(
                  "w-full truncate text-sm font-medium",
                  isPending && "text-indigo-500 line-through",
               )}
            >
               {booking.clientNames}
            </p>
         </CardTitle>
         <CardContent className="flex items-baseline justify-between p-0">
            <Chip className="bg-violet-100 text-xs text-violet-600">
               {format(service.date, "dd MMMM, yy")}
            </Chip>
            <p className="text-xs text-gray-500">
               {format(service.createdAt, "dd MMMM, yy")}
            </p>
         </CardContent>
      </Card>
   );
}
