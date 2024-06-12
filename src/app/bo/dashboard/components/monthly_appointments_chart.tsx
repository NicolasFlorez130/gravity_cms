"use client";

import { useEffect, useState, useTransition } from "react";
import { type Appointment } from "~/types/appointments";
import {
   cn,
   dashboardLineColor,
   generateDates,
   landingLineColor,
   onSiteLineColor,
} from "~/lib/utils";
import type { DateRange } from "react-day-picker";
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

function preprocessAppointments(appointments: Appointment[]) {
   const earnings: Record<
      string,
      { landingSum: number; onlineSum: number; onsiteSum: number }
   > = {};

   appointments.forEach(({ date, paymentMethod, totalAmount }) => {
      const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!earnings[yearMonth]) {
         earnings[yearMonth] = { landingSum: 0, onlineSum: 0, onsiteSum: 0 };
      }

      switch (paymentMethod) {
         case "LANDING":
            earnings[yearMonth]!.landingSum += totalAmount;
            break;
         case "ONLINE":
            earnings[yearMonth]!.onlineSum += totalAmount;
            break;
         default:
            earnings[yearMonth]!.onsiteSum += totalAmount;
            break;
      }
   });

   return earnings;
}

function calculateMonthlyEarnings(days: Date[], appointments: Appointment[]) {
   const start = new Date(days[0]!);
   const end = new Date(days[days.length - 1]!);

   const earnings = preprocessAppointments(appointments);
   const monthlyEarnings = [];

   const currentDate = new Date(start);
   while (currentDate <= end) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const yearMonth = `${year}-${month + 1}`;
      const monthEarnings = earnings[yearMonth] ?? {
         landingSum: 0,
         onlineSum: 0,
         onsiteSum: 0,
      };

      monthlyEarnings.push({
         monthDate: new Date(year, month, 1),
         landingSum: monthEarnings.landingSum,
         onlineSum: monthEarnings.onlineSum,
         onsiteSum: monthEarnings.onsiteSum,
      });

      currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
   }

   return monthlyEarnings;
}

interface IMonthlyAppointmentsChart {
   appointments: Appointment[];
   dates: DateRange | undefined;
}

export default function MonthlyAppointmentsChart({
   appointments,
   dates,
}: IMonthlyAppointmentsChart) {
   const [isSorting, startTransition] = useTransition();

   const [days, setDays] = useState<Date[]>([]);

   const [monthlyEarnings, setMonthlyEarning] = useState<
      ReturnType<typeof calculateMonthlyEarnings>
   >([]);

   useEffect(() => {
      if (!dates?.from || !dates?.to) return;

      setDays(generateDates(dates.from, dates.to));
   }, [dates]);

   useEffect(() => {
      startTransition(() => {
         setMonthlyEarning(calculateMonthlyEarnings(days, appointments));
      });
   }, [appointments, days]);

   const data = {
      labels: monthlyEarnings.map(({ monthDate }) => format(monthDate, "MMM yy")),
      datasets: [
         {
            label: "Landing",
            data: monthlyEarnings.map(({ landingSum }) => landingSum),
            borderColor: landingLineColor,
         },
         {
            label: "Dashboard",
            data: monthlyEarnings.map(({ onlineSum }) => onlineSum),
            borderColor: dashboardLineColor,
         },
         {
            label: "En persona",
            data: monthlyEarnings.map(({ onsiteSum }) => onsiteSum),
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
