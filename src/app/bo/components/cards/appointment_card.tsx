"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardTitle } from "~/components/bo/ui/card";
import { Checkbox } from "~/components/bo/ui/checkbox";
import { Chip } from "~/components/bo/ui/chip";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import type { Appointment } from "~/types/appointments";

interface IAppointmentCard {
   data: Appointment;
   refetch: () => Promise<any>;
}

export default function AppointmentCard({ data, refetch }: IAppointmentCard) {
   const router = useRouter();

   const { mutate, isPending } = api.appointments.updateStatus.useMutation({
      onSuccess: async () => {
         router.refresh();
         await refetch();
      },
   });

   return (
      <Card
         className={cn(
            "grid w-full gap-2 border-bo-card-border bg-bo-card-background p-3",
            isPending && "opacity-50",
         )}
      >
         <CardTitle className="flex w-full items-center gap-2 truncate">
            <Checkbox
               disabled={isPending}
               onClick={() => mutate({ id: data.id, status: "ATTENDED" })}
               className="border-2 border-gray-400 data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500 [&_svg]:text-white"
            />
            <p
               className={cn(
                  "w-full truncate text-sm font-medium",
                  isPending && "text-indigo-500 line-through",
               )}
            >
               {data.clientNames}
            </p>
         </CardTitle>
         <CardContent className="flex items-baseline justify-between p-0">
            <Chip className="bg-violet-100 text-violet-600 text-xs">
               {format(data.date, "dd MMMM, yy")}
            </Chip>
            <p className="text-xs text-gray-500">
               {format(data.createdAt, "dd MMMM, yy")}
            </p>
         </CardContent>
      </Card>
   );
}
