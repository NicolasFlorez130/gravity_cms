import type { Row } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { type Day } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";
import { type Appointment } from "~/types/appointments";
import * as XLSX from "xlsx";

/**
 * Translates an array of day indices to a human-readable string or JSX elements.
 * @param days Array of day indices (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
 * @returns A string for common patterns (e.g., "TODOS LOS DÍAS") or JSX elements for specific days.
 */
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

/**
 * Formats a number as a currency string in USD format.
 */
const USDFormatter = new Intl.NumberFormat("en-US", {
   style: "currency",
   currency: "USD",
   minimumFractionDigits: 0,
   maximumFractionDigits: 2,
});

/**
 * Combines multiple class names into a single string with deduplication.
 * @param inputs Array of class values to combine.
 * @returns A string with merged class names.
 */
export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string): string {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats a number into a currency string using USD formatting.
 * @param number The number to format.
 * @returns The formatted currency string.
 */
export function formatCurrency(number: number) {
   return USDFormatter.format(number);
}

/**
 * Splits text content of an HTML element into spans, optionally applying classes to each letter and word.
 * @param el The HTML element whose text content will be split.
 * @param letter_class Optional class to apply to each letter.
 * @param word_class Optional class to apply to each word.
 */
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

/**
 * Converts a string into an array of span elements, treating each character as a separate span.
 * @param text The string to convert.
 * @returns An array of span elements.
 */
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

/**
 * Calculates monthly totals from a list of appointments.
 * @param transactions An array of appointments.
 * @returns An array of objects each representing a month with total sum and date.
 */
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

/**
 * Generates an array of dates between two dates.
 * @param startDate The start date.
 * @param endDate The end date.
 * @returns An array of dates from start to end.
 */
export function generateDates(startDate: Date, endDate: Date): Date[] {
   const dateArray: Date[] = [];
   const currentDate = new Date(startDate);

   while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
   }

   return dateArray;
}

/**
 * Filters rows based on a date range.
 * @param row The row to check.
 * @param column The column identifier which holds the date value.
 * @param dateRange The range { from, to } within which the date should fall.
 * @returns True if the row's date falls within the range, false otherwise.
 */
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

/**
 * Converts an array of appointments to an Excel file.
 * @param appointments The appointments to convert.
 * @param fileName The name of the resulting Excel file.
 * @param dates Optional date range to filter appointments.
 */
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
