import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
