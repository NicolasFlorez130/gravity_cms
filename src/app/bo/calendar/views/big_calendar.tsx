"use client";

import {
   Calendar,
   type View,
   momentLocalizer,
   Views,
} from "react-big-calendar";
import moment from "moment";
import { set } from "date-fns";
import { useStore } from "~/lib/features/store";
import { ToggleGroup, ToggleGroupItem } from "~/components/bo/ui/toggle-group";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "~/components/bo/ui/button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { cn, translatePaymentMethod } from "~/lib/utils";
import { api } from "~/trpc/react";
import { useRouterRefresh } from "~/lib/hooks/useRouterRefresh";
import Loading from "~/components/shared/loading";
import DisableDayDialog from "../../components/dialogs/disable_day_dialog";
import type { AppointmentPaymentMethod } from "~/types/appointments";

interface IBigCalendar {}

export function BigCalendar({}: IBigCalendar) {
   const disabledDates = useStore.use.disabledDays();

   const hours = useStore.use.hours();

   const [changingState, setChangingState] = useState<string>();
   const [deleting, setDeleting] = useState<string>();

   const { refresh } = useRouterRefresh();

   const appointments = useStore.use.appointments();
   const packages = useStore.use.packages();
   const localizer = momentLocalizer(moment);

   const [date, setDate] = useState<Date>(new Date());
   const [view, setView] = useState<View>(Views.MONTH);

   const { mutate: markAsAttended, isPending: isMarking } =
      api.appointments.markServiceAsAttended.useMutation({
         onSuccess: async () => {
            await refresh();
            setChangingState(undefined);
         },
      });

   const { mutate: deleteDay, isPending: isDeleting } =
      api.disabledDays.deleteDisableDate.useMutation({
         onSuccess: async () => {
            await refresh();
            setDeleting(undefined);
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
            <div className="flex gap-4">
               <ToggleGroup
                  type="single"
                  value={view}
                  onValueChange={value => value && setView(value as View)}
               >
                  <ToggleGroupItem value="month">Mes</ToggleGroupItem>
                  <ToggleGroupItem value="week">Semana</ToggleGroupItem>
                  <ToggleGroupItem value="day">Dia</ToggleGroupItem>
               </ToggleGroup>
               <DisableDayDialog />
            </div>
         </div>
         <Calendar
            toolbar={false}
            localizer={localizer}
            events={[
               ...disabledDates.map(({ date, id }) => ({
                  id,
                  start: date,
                  end: set(date, { hours: 23, minutes: 59 }),
                  className: cn("bg-gray-100 text-gray-500 border-gray-500"),
                  type: "DISABLED_DATE",
               })),
               ...appointments
                  .sort(
                     (
                        { service: { attended: a } },
                        { service: { attended: b } },
                     ) => (b === a ? 0 : b ? -1 : 1),
                  )
                  .map(
                     ({
                        booking: {
                           paymentMethod,
                           clientNames,
                           clientPhoneNumber,
                        },
                        service: { date, packageId, attended, id, hourId },
                     }) => {
                        const hour = hours.find(({ id }) => id === hourId)!;

                        return {
                           type: "SERVICE",
                           end: set(date, {
                              hours: hour.hour,
                              minutes: hour.minute + 120,
                           }),
                           start: set(date, {
                              hours: hour.hour,
                              minutes: hour.minute,
                           }),
                           paymentMethod,
                           clientNames,
                           clientPhoneNumber,
                           attended,
                           id,
                           packageName: packages.find(
                              ({ id }) => id === packageId,
                           )?.name,
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
                        };
                     },
                  ),
            ]}
            views={["day", "week", "month"]}
            startAccessor="start"
            view={view}
            onNavigate={setDate}
            endAccessor="end"
            defaultView={Views.MONTH}
            date={date}
            onView={setView}
            components={{
               // timeGutterWrapper: () => <></>,
               // timeGutterHeader: ({}) => <></>,
               // timeSlotWrapper: ({}) => <></>,
               // event: ({}) => <></>,
               // eventContainerWrapper: () => <>uwu</>,
               event: ({ event }) => {
                  const tEvent = event as {
                     id: string;
                     className: string;
                     end: Date;
                     start: Date;
                  } & (
                     | {
                          type: "SERVICE";
                          paymentMethod: AppointmentPaymentMethod;
                          clientNames: string;
                          clientPhoneNumber: string;
                          attended: boolean | null;
                          packageName: string | undefined;
                       }
                     | {
                          type: "DISABLED_DATE";
                       }
                  );

                  const { className, type, id } = tEvent;

                  return (
                     <div
                        className={cn(
                           "relative ml-2 flex w-[calc(100%-.5rem)] flex-col justify-start gap-1 truncate rounded-l-lg border-b-3 px-3 py-1",
                           view === "week" && "-right-[10px]",
                           view === "day"
                              ? type === "DISABLED_DATE"
                                 ? "-right-4 h-full"
                                 : "-right-4 !h-20"
                              : "h-10",
                           className,
                        )}
                     >
                        {(() => {
                           if (tEvent.type === "SERVICE") {
                              const {
                                 attended,
                                 className,
                                 clientNames,
                                 clientPhoneNumber,
                                 packageName,
                                 paymentMethod,
                              } = tEvent;

                              return (
                                 <>
                                    {view === "day" && (
                                       <>
                                          <span className="w-full truncate text-lg font-semibold">
                                             {packageName} -{" "}
                                             {translatePaymentMethod(
                                                paymentMethod,
                                             )}
                                          </span>
                                          <span className="w-full truncate">
                                             {clientNames} - {clientPhoneNumber}
                                          </span>
                                          <div className="absolute right-4 top-4 flex items-center gap-2">
                                             <Button
                                                variant="link"
                                                className={cn(
                                                   "mr-4 h-max border-0 !bg-transparent transition hover:border hover:no-underline",
                                                   className,
                                                )}
                                                disabled={
                                                   isMarking ||
                                                   !!attended ||
                                                   id === changingState
                                                }
                                                onClick={() => {
                                                   setChangingState(id);
                                                   markAsAttended(id);
                                                }}
                                             >
                                                {isMarking &&
                                                id === changingState ? (
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
                                       <span className="w-full truncate">
                                          {packageName}
                                       </span>
                                    )}
                                 </>
                              );
                           } else {
                              return (
                                 <>
                                    <p className="w-full truncate">
                                       Día deshabilitado
                                    </p>
                                    {view === "day" && (
                                       <div className="absolute right-4 top-4 flex items-center gap-2">
                                          <Button
                                             variant="link"
                                             className={cn(
                                                "mr-4 h-max border-0 !bg-transparent transition hover:border hover:no-underline",
                                                className,
                                             )}
                                             disabled={
                                                isDeleting || id === deleting
                                             }
                                             onClick={() => {
                                                setDeleting(id);
                                                deleteDay(id);
                                             }}
                                          >
                                             {isDeleting && id === deleting ? (
                                                <Loading />
                                             ) : (
                                                <>Habilitar día</>
                                             )}
                                          </Button>
                                       </div>
                                    )}
                                 </>
                              );
                           }
                        })()}
                     </div>
                  );
               },
            }}
         />
      </div>
   );
}
