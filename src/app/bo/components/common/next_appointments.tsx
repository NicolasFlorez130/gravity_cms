"use client";

import { Separator } from "~/components/bo/ui/separator";
import AppointmentCard from "../cards/appointment_card";
import { useStore } from "~/lib/features/store";
import { setDateTimeTo0 } from "~/lib/utils";

interface INextAppointments {}

export default function NextAppointments({}: INextAppointments) {
   const today = setDateTimeTo0(new Date());

   const services = useStore.use.appointments();

   const filteredServices = services
      .filter(
         ({ service: { date, attended } }) =>
            !attended && date.getTime() >= today.getTime(),
      )
      .sort(
         ({ service: { date: date_1 } }, { service: { date: date_2 } }) =>
            date_1.getTime() - date_2.getTime(),
      )
      .slice(0, 4);

   return (
      <div className="grid h-max w-full gap-4">
         <div>
            <h2 className="mb-1 font-medium text-gray-700 underline">
               Próximos vuelos
            </h2>
            <Separator />
         </div>

         <div className="grid place-items-center gap-2">
            {filteredServices.map(el => (
               <AppointmentCard key={el.service.id} data={el} />
            ))}
         </div>
      </div>
   );
}
