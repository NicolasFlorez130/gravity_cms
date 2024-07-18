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
import { api } from "~/trpc/react";
import { useRouterRefresh } from "~/lib/hooks/useRouterRefresh";
import Loading from "~/components/shared/loading";

interface IBigCalendar {}

export function BigCalendar({}: IBigCalendar) {
   const [changingState, setChangingState] = useState<string>();

   const { refresh } = useRouterRefresh();

   const appointments = useStore.use.appointments();
   const packages = useStore.use.packages();
   const localizer = momentLocalizer(moment);

   const [date, setDate] = useState<Date>(new Date());
   const [view, setView] = useState<View>(Views.MONTH);

   const { mutate, isPending } =
      api.appointments.markServiceAsAttended.useMutation({
         onSuccess: async () => {
            await refresh();
            setChangingState(undefined);
         },
      });

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
            events={appointments
               .sort(
                  (
                     { service: { attended: a } },
                     { service: { attended: b } },
                  ) => (b === a ? 0 : b ? -1 : 1),
               )
               .map(
                  ({
                     booking: { paymentMethod, clientNames, clientPhoneNumber },
                     service: { date, packageId, attended, id },
                  }) => ({
                     end: addHours(date, 2),
                     start: date,
                     paymentMethod,
                     clientNames,
                     clientPhoneNumber,
                     attended,
                     id,
                     packageName: packages.find(({ id }) => id === packageId)
                        ?.name,
                     className: cn(
                        paymentMethod === "COURTESY" &&
                           "bg-violet-100 text-violet-500 border-violet-500",
                        paymentMethod === "LANDING" &&
                           "bg-blue-100 text-blue-500 border-blue-500",
                        paymentMethod === "ONLINE" &&
                           "bg-orange-100 text-orange-500 border-orange-500",
                        paymentMethod === "ON_SITE" &&
                           "bg-green-100 text-green-500 border-green-500",
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
               eventWrapper: ({
                  event: {
                     className,
                     paymentMethod,
                     clientNames,
                     clientPhoneNumber,
                     packageName,
                     attended,
                     id,
                  },
               }) => (
                  <div
                     className={cn(
                        "relative ml-2 flex w-[calc(100%-.5rem)] flex-col justify-center gap-1 truncate rounded-l-lg border-b-3 px-3 py-1",
                        view === "week" && "-right-[10px]",
                        view === "day" ? "-right-4 h-20" : "h-10",
                        className,
                     )}
                  >
                     {view === "day" && (
                        <>
                           <span className="w-full truncate text-lg font-semibold">
                              {packageName} -{" "}
                              {translatePaymentMethod(paymentMethod)}
                           </span>
                           <span className="w-full truncate">
                              {clientNames} - {clientPhoneNumber}
                           </span>
                           <div className="absolute right-4 top-4 flex items-center gap-2">
                              <Button
                                 variant="link"
                                 className={cn(
                                    "h-max border-0 !bg-transparent transition hover:border hover:no-underline",
                                    className,
                                 )}
                                 disabled={
                                    isPending ||
                                    !!attended ||
                                    id === changingState
                                 }
                                 onClick={() => {
                                    setChangingState(id);
                                    mutate(id);
                                 }}
                              >
                                 {isPending && id === changingState ? (
                                    <Loading />
                                 ) : attended ? (
                                    <>Atendido</>
                                 ) : (
                                    <>Marcar asistencia</>
                                 )}
                              </Button>
                           </div>
                        </>
                     )}
                     {view !== "day" && (
                        <span className="w-full truncate">{packageName}</span>
                     )}
                  </div>
               ),
            }}
         />
      </div>
   );
}
