"use client";

import { useEffect, useState, useTransition } from "react";
import type { Appointment } from "~/types/appointments";
import {
   cn,
   dashboardLineColor,
   generateDates,
   landingLineColor,
   onSiteLineColor,
} from "~/lib/utils";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
);

function preprocessAppointments(
   appointments: Appointment[],
): Record<
   string,
   { landingSum: number; onlineSum: number; onsiteSum: number }
> {
   const earnings: Record<
      string,
      { landingSum: number; onlineSum: number; onsiteSum: number }
   > = {};

   appointments.forEach(({ paymentMethod, totalAmount, createdAt }) => {
      const dateString = createdAt.toISOString().split("T")[0]!; // Format date as YYYY-MM-DD

      if (!earnings[dateString]) {
         earnings[dateString] = {
            landingSum: 0,
            onlineSum: 0,
            onsiteSum: 0,
         };
      }

      switch (paymentMethod) {
         case "LANDING":
            earnings[dateString]!.landingSum += totalAmount;
            break;
         case "ONLINE":
            earnings[dateString]!.onlineSum += totalAmount;
            break;
         default:
            earnings[dateString]!.onsiteSum += totalAmount;
            break;
      }
   });

   return earnings;
}

function calculateEarnings(days: Date[], appointments: Appointment[]) {
   const landingAux: number[] = [];
   const onlineAux: number[] = [];
   const onSiteAux: number[] = [];

   const earnings = preprocessAppointments(appointments);

   days.forEach(day => {
      const dateString = day.toISOString().split("T")[0]!;
      const dayEarnings = earnings[dateString] ?? {
         landingSum: 0,
         onlineSum: 0,
         onsiteSum: 0,
      };

      landingAux.push(dayEarnings.landingSum);
      onlineAux.push(dayEarnings.onlineSum);
      onSiteAux.push(dayEarnings.onsiteSum);
   });

   return { landingAux, onlineAux, onSiteAux };
}

interface IDailyAppointmentsChart {
   appointments: Appointment[];
   dates: DateRange | undefined;
}

export default function DailyAppointmentsChart({
   appointments,
   dates,
}: IDailyAppointmentsChart) {
   const [isSorting, startTransition] = useTransition();

   const [landingAppointments, setLandingAppointments] = useState<number[]>([]);
   const [dashboardAppointments, setOnlineAppointments] = useState<number[]>(
      [],
   );
   const [onSiteAppointments, setOnSiteAppointments] = useState<number[]>([]);

   const [days, setDays] = useState<Date[]>([]);

   useEffect(() => {
      if (!dates?.from || !dates?.to) return;

      setDays(generateDates(dates.from, dates.to));
   }, [dates]);

   useEffect(() => {
      startTransition(() => {
         const { landingAux, onlineAux, onSiteAux } = calculateEarnings(
            days,
            appointments,
         );

         setLandingAppointments(landingAux);
         setOnlineAppointments(onlineAux);
         setOnSiteAppointments(onSiteAux);
      });
   }, [days, appointments]);

   const data = {
      labels: days.map(date => format(date, "d MMM yy")),
      datasets: [
         {
            label: "Landing",
            data: landingAppointments,
            borderColor: landingLineColor,
         },
         {
            label: "Dashboard",
            data: dashboardAppointments,
            borderColor: dashboardLineColor,
         },
         {
            label: "En persona",
            data: onSiteAppointments,
            borderColor: onSiteLineColor,
         },
      ],
   };

   return (
      <div
         className={cn("m-auto flex h-full w-11/12", isSorting && "opacity-50")}
      >
         <Line
            options={{
               resizeDelay: 0,
               maintainAspectRatio: false,
               plugins: {
                  legend: {
                     position: "bottom",
                  },
               },
            }}
            data={data}
         />
      </div>
   );
}
