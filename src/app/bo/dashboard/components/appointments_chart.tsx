"use client";

import { Chart, type UserSerie, type AxisOptions } from "react-charts";
import { useEffect, useMemo, useState, useTransition } from "react";
import { type Appointment } from "../mock/dashboard_mocks";

interface IAppointmentsChart {
   appointments: Appointment[];
}

export default function AppointmentsChart({
   appointments,
}: IAppointmentsChart) {
   const [isSorting, startTransition] = useTransition();

   const [landingAppointments, setLandingAppointments] = useState(appointments);
   const [onlineAppointments, setOnlineAppointments] = useState(appointments);
   const [onSiteAppointments, setOnSiteAppointments] = useState(appointments);

   useEffect(() => {
      startTransition(() => {
         const landingAux: Appointment[] = [];
         const onlineAux: Appointment[] = [];
         const onSiteAux: Appointment[] = [];

         appointments.forEach(transaction => {
            switch (transaction.paymentMethod) {
               case "LANDING":
                  landingAux.push(transaction);
                  break;
               case "ONLINE":
                  onlineAux.push(transaction);
                  break;
               default:
                  onSiteAux.push(transaction);
                  break;
            }
         });
         setLandingAppointments(landingAux);
         setOnlineAppointments(onlineAux);
         setOnSiteAppointments(onSiteAux);
      });
   }, []);

   const primaryAxis = useMemo<AxisOptions<Appointment>>(
      () => ({
         getValue: datum => datum.date,
         formatters: {
            scale: (datum: Date) => datum.getMonth().toString(),
         },
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
         label: "Reservas",
         data: landingAppointments,
      },
      {
         label: "Reservas1",
         data: onlineAppointments,
      },
      {
         label: "Reservas2",
         data: onSiteAppointments,
      },
   ];

   return (
      <Chart
         options={{
            data,
            primaryAxis,
            secondaryAxes,
         }}
      />
   );
}
