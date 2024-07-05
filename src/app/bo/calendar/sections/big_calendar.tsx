"use client";

import {
   Calendar,
   type View,
   momentLocalizer,
   Views,
} from "react-big-calendar";
import moment from "moment";
import { addHours } from "date-fns";
import { useStore } from "~/lib/features/store";
import { ToggleGroup, ToggleGroupItem } from "~/components/bo/ui/toggle-group";
import { useCallback, useMemo, useState } from "react";
import { Button } from "~/components/bo/ui/button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { cn, translatePaymentMethod } from "~/lib/utils";

interface IBigCalendar {}

export function BigCalendar({}: IBigCalendar) {
   const services = useStore(state => state.services);
   const localizer = momentLocalizer(moment);

   const [date, setDate] = useState<Date>(new Date());
   const [view, setView] = useState<View>(Views.MONTH);

   const dateText = useMemo(() => {
      try {
         if (view === Views.DAY) return moment(date).format("dddd, MMMM DD");
         if (view === Views.WEEK) {
            const from = moment(date)?.startOf("week");
            const to = moment(date)?.endOf("week");
            return `${from.format("MMMM DD")} a ${to.format("MMMM DD")}`;
         }
         if (view === Views.MONTH) {
            return moment(date).format("MMMM YYYY");
         }
      } catch (error) {
         return "";
      }
   }, [view, date]);

   const onPrevClick = useCallback(() => {
      if (view === Views.DAY) {
         setDate(moment(date).subtract(1, "d").toDate());
      } else if (view === Views.WEEK) {
         setDate(moment(date).subtract(1, "w").toDate());
      } else {
         setDate(moment(date).subtract(1, "M").toDate());
      }
   }, [view, date]);

   const onNextClick = useCallback(() => {
      if (view === Views.DAY) {
         setDate(moment(date).add(1, "d").toDate());
      } else if (view === Views.WEEK) {
         setDate(moment(date).add(1, "w").toDate());
      } else {
         setDate(moment(date).add(1, "M").toDate());
      }
   }, [view, date]);

   const onTodayClick = useCallback(() => {
      setDate(moment().toDate());
   }, []);

   return (
      <div className="grid min-h-screen grid-rows-[auto_1fr] gap-8 px-12 py-10">
         <div className="flex items-center justify-between">
            <div className="flex gap-4">
               <h2
                  className={cn(
                     "mr-4 inline-block text-4xl font-medium",
                     view !== Views.MONTH ? "min-w-96" : "min-w-80",
                  )}
               >
                  {dateText}
               </h2>
               <Button
                  className="mr-6"
                  variant="outline"
                  onClick={onTodayClick}
               >
                  Hoy
               </Button>
               <div className="flex gap-2">
                  <Button
                     className="aspect-square rounded-full"
                     variant="outline"
                     onClick={onPrevClick}
                  >
                     <CaretLeft />
                  </Button>
                  <Button
                     className="aspect-square rounded-full"
                     variant="outline"
                     onClick={onNextClick}
                  >
                     <CaretRight />
                  </Button>
               </div>
            </div>
            <div>
               <ToggleGroup
                  type="single"
                  value={view}
                  onValueChange={value => value && setView(value as View)}
               >
                  <ToggleGroupItem value="month">Mes</ToggleGroupItem>
                  <ToggleGroupItem value="week">Semana</ToggleGroupItem>
                  <ToggleGroupItem value="day">Dia</ToggleGroupItem>
               </ToggleGroup>
            </div>
         </div>
         <Calendar
            toolbar={false}
            localizer={localizer}
            events={services.map(
               ({ appointment, appointment_pack: { date } }) => ({
                  end: addHours(date, 2),
                  start: date,
                  title: translatePaymentMethod(appointment.paymentMethod),
                  className: cn(
                     appointment.paymentMethod === "COURTESY" &&
                        "bg-violet-100 text-violet-500",
                     appointment.paymentMethod === "LANDING" &&
                        "bg-blue-100 text-blue-500",
                     appointment.paymentMethod === "ONLINE" &&
                        "bg-orange-100 text-orange-500",
                     appointment.paymentMethod === "ON_SITE" &&
                        "bg-green-100 text-green-500",
                  ),
               }),
            )}
            views={["day", "week", "month"]}
            startAccessor="start"
            view={view}
            onNavigate={setDate}
            endAccessor="end"
            defaultView={Views.MONTH}
            date={date}
            onView={setView}
            components={{
               timeGutterWrapper: () => <></>,
               timeGutterHeader: ({}) => <></>,
               timeSlotWrapper: ({}) => <></>,
               eventWrapper: ({ event: { className, title } }) => (
                  <div
                     className={cn(
                        "ml-2 flex h-10 flex-col justify-center gap-2 rounded-l-lg px-3 py-1",
                        className,
                     )}
                  >
                     {title}
                  </div>
               ),
            }}
         />
      </div>
   );
}
