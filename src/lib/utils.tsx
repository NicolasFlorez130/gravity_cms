import type { Row } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { type Day } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";
import { type Appointment } from "~/types/appointments";
import * as XLSX from "xlsx";

export function translateDays(days: number[]) {
   const workDay = [1, 2, 3, 4, 5]; // Lunes a Viernes
   const everyday = [0, 1, 2, 3, 4, 5, 6]; // Domingo a Sábado

   const isWorkDay = workDay.every(dia => days.includes(dia));
   const isEveryDay = everyday.every(dia => days.includes(dia));

   if (isEveryDay) {
      return "TODOS LOS DÍAS";
   } else if (isWorkDay && days.length === workDay.length) {
      return "ENTRE SEMANA";
   } else {
      return days.map((day, i, { length }) => (
         <span key={day}>
            {es.localize.day(day as Day, { width: "wide" }).toUpperCase()}
            {i !== length - 1 && " - "}
         </span>
      ));
   }
}

const USDFormatter = new Intl.NumberFormat("en-US", {
   style: "currency",
   currency: "USD",
   minimumFractionDigits: 0,
   maximumFractionDigits: 2,
});

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatCurrency(number: number) {
   return USDFormatter.format(number);
}

export function textSplitter(
   el: HTMLElement | null,
   letter_class?: string,
   word_class?: string,
) {
   if (!el) return;

   let words = el.textContent?.split(" ") ?? [];
   words = words.map(word => {
      let letters = word.split("");
      letters = letters.map(
         letter => `<div class="${letter_class ?? ""} inline">${letter}</div>`,
      );
      return letters.join("");
   });
   words = words.map(
      word => `<span class="${word_class ?? ""}">${word}</span>`,
   );
   el.innerHTML = words.join(" ");
}

export function printAsSpans(text: string) {
   return text.split("").map((char, i) =>
      char === " " ? (
         <span key={i} className="whitespace-normal">
            {" "}
         </span>
      ) : (
         <span className="inline-block" key={i}>
            {char}
         </span>
      ),
   );
}

export function getMonthlyTotals(transactions: Appointment[]) {
   const monthlyTotals: Record<string, { sum: number; date: Date }> = {};

   transactions.forEach(transaction => {
      const year = transaction.date.getFullYear();
      const month = transaction.date.getMonth() + 1;
      const monthYear = `${year}-${month.toString().padStart(2, "0")}`;

      if (!monthlyTotals[monthYear]) {
         monthlyTotals[monthYear] = {
            sum: 0,
            date: new Date(year, month - 1, 1), // Create a Date object with the first day of the month
         };
      }

      monthlyTotals[monthYear]!.sum += transaction.totalAmount;
   });

   return Object.entries(monthlyTotals).map(([_key, value]) => {
      const month = value.date.toLocaleString("default", { month: "long" });
      return {
         name: month,
         sum: value.sum,
         date: value.date,
      };
   });
}

export type MonthlyTotals = ReturnType<typeof getMonthlyTotals>[number];

export const landingLineColor = "#f98600";
export const onSiteLineColor = "#0085ff";
export const dashboardLineColor = "#00ba34";

export function generateDates(startDate: Date, endDate: Date): Date[] {
   const dateArray: Date[] = [];
   const currentDate = new Date(startDate);

   while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
   }

   return dateArray;
}

export function dateFilterFunction(
   row: Row<Appointment>,
   column: string,
   { from, to }: DateRange,
) {
   const date = new Date(row.getValue(column));

   if ((from ?? to) && !date) return false;

   if (from && !to) {
      return date.getTime() >= from.getTime();
   } else if (!from && to) {
      return date.getTime() <= to.getTime();
   } else if (from && to) {
      return date.getTime() >= from.getTime() && date.getTime() <= to.getTime();
   } else return true;
}

export function convertAppointmentsToExcel(
   appointments: Appointment[],
   fileName: string,
   dates?: DateRange,
) {
   const filteredAppointments = appointments.filter(
      record =>
         (!dates?.from || record.date >= dates.from) &&
         (!dates?.to || record.date <= dates.to),
   );

   // Convert records to a format that can be used by xlsx
   const formattedRecords = filteredAppointments.map(record => ({
      date: record.date.toISOString(),
      id: record.id,
      clientNames: record.clientNames,
      clientEmail: record.clientEmail,
      clientPhoneNumber: record.clientPhoneNumber,
      totalAmount: record.totalAmount,
      status: record.status,
      paymentMethod: record.paymentMethod,
      reference: record.reference,
      createdAt: record.createdAt.toISOString(),
   }));

   // Create a worksheet from the records
   const worksheet = XLSX.utils.json_to_sheet(formattedRecords);

   // Create a workbook and add the worksheet
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, "Records");

   // Write the workbook to a file
   XLSX.writeFile(workbook, fileName);
}
