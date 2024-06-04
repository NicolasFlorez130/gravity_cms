import { type ClassValue, clsx } from "clsx";
import { type Day } from "date-fns";
import { es } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

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
