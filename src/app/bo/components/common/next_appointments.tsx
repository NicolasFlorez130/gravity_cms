"use client";

import { Separator } from "~/components/bo/ui/separator";
import { api } from "~/trpc/react";
import AppointmentCard from "../cards/appointment_card";
import Loading from "~/components/shared/loading";

interface INextAppointments {}

export default function NextAppointments({}: INextAppointments) {
   const { data, refetch, isFetching, isRefetching } =
      api.appointments.getNextAppointments.useQuery(4, {
         refetchOnWindowFocus: false,
      });

   return (
      <div className="grid h-max w-full gap-4">
         <div>
            <h2 className="mb-1 font-medium text-gray-700 underline">
               Próximos vuelos
            </h2>
            <Separator />
         </div>

         <div className="grid place-items-center gap-2">
            {isFetching && !isRefetching ? (
               <Loading />
            ) : (
               data?.map(appointment => (
                  <AppointmentCard
                     key={appointment.id}
                     data={appointment}
                     refetch={refetch}
                  />
               ))
            )}
         </div>
      </div>
   );
}
