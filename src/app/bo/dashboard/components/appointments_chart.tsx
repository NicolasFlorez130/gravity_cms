"use client";

import { Chart, type UserSerie, type AxisOptions } from "react-charts";
import { useEffect, useMemo, useState, useTransition } from "react";
import { type Appointment } from "~/types/appointments";

interface IDailyAppointmentsChart {
   appointments: Appointment[];
}

export default function DailyAppointmentsChart({
   appointments,
}: IDailyAppointmentsChart) {
   const [isSorting, startTransition] = useTransition();

   const [landingAppointments, setLandingAppointments] = useState(appointments);
   const [onlineAppointments, setOnlineAppointments] = useState(appointments);
   const [onSiteAppointments, setOnSiteAppointments] = useState(appointments);

   useEffect(() => {
      startTransition(() => {
         const landingAux: Appointment[] = [];
         const onlineAux: Appointment[] = [];
         const onSiteAux: Appointment[] = [];

         appointments.forEach(appointment => {
            switch (appointment.paymentMethod) {
               case "LANDING":
                  landingAux.push(appointment);
                  break;
               case "ONLINE":
                  onlineAux.push(appointment);
                  break;
               default:
                  onSiteAux.push(appointment);
                  break;
            }
         });
         setLandingAppointments(landingAux);
         setOnlineAppointments(onlineAux);
         setOnSiteAppointments(onSiteAux);
      });
   }, [appointments]);

   const primaryAxis = useMemo<AxisOptions<Appointment>>(
      () => ({
         getValue: datum => datum.date,
         // formatters: {
         // scale: (datum: Date) => new Date(datum).getMonth().toString(),
         // },
      }),
      [],
   );

   const secondaryAxes = useMemo<AxisOptions<Appointment>[]>(
      () => [
         {
            getValue: datum => datum.totalAmount,
         },
      ],
      [],
   );

   const data: UserSerie<Appointment>[] = [
      {
         label: "Landing",
         data: landingAppointments,
      },
      {
         label: "Dashboard",
         data: onlineAppointments,
      },
      {
         label: "En sitio",
         data: onSiteAppointments,
      },
   ];

   return (
      !isSorting && (
         <Chart
            options={{
               data,
               primaryAxis,
               secondaryAxes,
            }}
         />
      )
   );
}
