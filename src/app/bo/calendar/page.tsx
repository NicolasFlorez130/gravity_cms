import type { Metadata } from "next";
import { BigCalendar } from "./views/big_calendar";

export const metadata: Metadata = {
   title: "Calendario",
   description: "",
};

export default function Page() {
   return <BigCalendar />;
}
