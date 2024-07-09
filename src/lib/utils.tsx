import type { Row } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { format, set, type Day } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";
import type { AppointmentPaymentMethod, Service } from "~/types/appointments";
import * as XLSX from "xlsx";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { onlyNumbersAndEmpty } from "./regex";
import type { PackageAvailability } from "~/types/packages";
import { isHoliday } from "colombian-holidays/lib/utils/isHoliday";

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

export function generateRandomString(length = 10) {
   const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
   let randomString = "";

   for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
   }

   return randomString;
}

export const week_end = [0, 5, 6];
export const work_days = [1, 2, 3, 4];

/**
 * Verifies if a package is available on a specific day based on its availability settings.
 * @param availability The availability setting of the package.
 * @param weekDay The day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
 * @returns A boolean indicating if the package is available on the specified day.
 */
export function verifyAvailability(
   availability: PackageAvailability,
   date: Date,
) {
   if (availability === "EVERY_DAY") {
      return true;
   }

   const weekDay = date.getDay();

   const aux = isHoliday(date);

   return (
      (availability === "WEEKEND" && (aux || week_end.includes(weekDay))) ||
      (availability === "WORK_DAYS" && work_days.includes(weekDay) && !aux)
   );
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
export function getMonthlyTotals(transactions: Service[]) {
   const monthlyTotals: Record<string, { sum: number; date: Date }> = {};

   transactions.forEach(({ appointment: { totalAmount, createdAt } }) => {
      const year = createdAt.getFullYear();
      const month = createdAt.getMonth() + 1;
      const monthYear = `${year}-${month.toString().padStart(2, "0")}`;

      if (!monthlyTotals[monthYear]) {
         monthlyTotals[monthYear] = {
            sum: 0,
            date: new Date(year, month - 1, 1), // Create a Date object with the first day of the month
         };
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      monthlyTotals[monthYear]!.sum += totalAmount;
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
   row: Row<any>,
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
 * @param services The appointments to convert.
 * @param fileName The name of the resulting Excel file.
 * @param dates Optional date range to filter appointments.
 */
export function convertAppointmentsToExcel(
   services: Service[],
   fileName: string,
   dates?: DateRange,
) {
   const filteredServices = services.filter(
      ({ appointment_pack: { date } }) =>
         (!dates?.from || date >= dates.from) &&
         (!dates?.to || date <= dates.to),
   );

   // Convert records to a format that can be used by xlsx
   const formattedRecords = filteredServices.map(
      ({ appointment, appointment_pack }) => ({
         date: appointment_pack.date.toISOString(),
         id: appointment.id,
         clientNames: appointment.clientNames,
         clientEmail: appointment.clientEmail,
         clientPhoneNumber: appointment.clientPhoneNumber,
         totalAmount: appointment.totalAmount,
         status: appointment.status,
         paymentMethod: appointment.paymentMethod,
         createdAt: appointment.createdAt.toISOString(),
      }),
   );

   // Create a worksheet from the records
   const worksheet = XLSX.utils.json_to_sheet(formattedRecords);

   // Create a workbook and add the worksheet
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, "Records");

   // Write the workbook to a file
   XLSX.writeFile(workbook, fileName);
}

/**
 * Parses an event to extract a number value and calls the onChange function with the parsed number.
 * @param onChange The function to call with the parsed number.
 */
export function parseEventForNumber(
   onChange: (...event: any[]) => void,
   cb?: () => any,
) {
   return function ({
      target: { value, ...target },
      ...event
   }: ChangeEvent<HTMLInputElement>) {
      if (onlyNumbersAndEmpty.test(value)) {
         onChange({
            ...event,
            target: {
               value: value === "" ? undefined : Number(value),
               ...target,
            },
         });
      }

      cb?.();
   };
}

export function translatePaymentMethod(
   paymentMethod: AppointmentPaymentMethod,
) {
   switch (paymentMethod) {
      case "COURTESY":
         return "Cortesía";
      case "LANDING":
         return "Landing";
      case "ONLINE":
         return "Online";
      case "ON_SITE":
         return "En sitio";
   }
}

/**
 * Parses a date to set the time to midnight (23:59:59.999) and calls the onChange function with the updated date.
 * @param onChange The function to call with the updated date.
 * @returns A function that sets the time of the date to midnight.
 */
export function parseDateToMidnight(
   onChange: (...event: any[]) => void,
   cb?: () => any,
): Dispatch<SetStateAction<Date | undefined>> {
   return function (date) {
      if (typeof date === "object") {
         onChange(
            set(date, {
               hours: 23,
               minutes: 59,
               seconds: 59,
               milliseconds: 999,
            }),
         );
      } else {
         onChange(date);
      }

      cb?.();
   };
}

/**
 * Parses a date to set the time to midnight (00:00:00.000) and calls the onChange function with the updated date.
 * @param onChange The function to call with the updated date.
 * @returns A function that sets the time of the date to midnight.
 */
export function parseDateToMidnightStartOfDay(
   onChange: (...event: any[]) => void,
   cb?: () => any,
): Dispatch<SetStateAction<Date | undefined>> {
   return function (date) {
      if (typeof date === "object") {
         onChange(setDateTimeTo0(date));
      } else {
         onChange(date);
      }

      cb?.();
   };
}

export const availabilityOptions = [
   {
      label: "Todos los días",
      value: "EVERY_DAY",
      colors: "bg-green-100 text-green-600",
   },
   {
      label: "Fines de semana",
      value: "WEEKEND",
      colors: "bg-pink-100 text-pink-600",
   },
   {
      label: "Entre semana",
      value: "WORK_DAYS",
      colors: "bg-yellow-100 text-yellow-600",
   },
] as const;

/**
 * Groups an array of objects by a specified key.
 * @param array The array of objects to group.
 * @param key The key to group the objects by.
 * @returns An object where keys are unique values of the specified key and values are arrays of objects with that key value.
 */
export function groupBy<
   T,
   Y extends keyof T,
   X extends T[Y] extends string ? T[Y] : string,
>(array: T[], key: Y) {
   return array.reduce((acc: Record<string, T[]>, obj: T) => {
      const property = obj[key] as string;
      acc[property] = acc[property] ?? [];
      acc[property]?.push(obj);
      return acc;
   }, {}) as Record<X, T[]>;
}

export function setDateTimeTo0(date: Date) {
   return set(date, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
   });
}

export function findDatesWithOccurrences<T>(arr: T[], cb: (arg: T) => Date) {
   const dateCounts: Record<string, number> = {};

   for (const el of arr) {
      const date = format(cb(el), "yyyy-MM-dd");

      dateCounts[date] = (dateCounts[date] ?? 0) + 1;
   }

   return arr.reduce((filtered, el) => {
      const date = cb(el);

      const key = format(cb(el), "yyyy-MM-dd");

      const aux = dateCounts[key];

      if (aux && aux >= 15) {
         filtered.push(date);
      }

      return filtered;
   }, [] as Date[]);
}
