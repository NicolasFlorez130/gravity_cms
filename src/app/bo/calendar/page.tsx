import type { Metadata } from "next";
import { BigCalendar } from "./sections/big_calendar";

export const metadata: Metadata = {
   title: "",
   description: "",
};

export default function Page() {
   return <BigCalendar />;
}
