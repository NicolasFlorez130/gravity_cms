"use client";

import DashboardCard from "../../components/cards/dashboard_card";
import { CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "~/components/bo/ui/separator";
import RecentAppointmentsTable from "../../components/tables/recent_appointments_table";
import DailyAppointmentsChart from "../../components/charts/daily_appointments_chart";
import { useStore } from "~/lib/features/store";
import { useMemo, useState } from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "~/components/bo/ui/select";
import { DateRangePicker } from "~/components/bo/ui/date_range_picker";
import { type DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import MonthlyAppointmentsChart from "../../components/charts/monthly_appointments_chart";
import NextAppointments from "../../components/common/next_appointments";
import Notes from "../../components/common/notes";
import AppointmentsDialog from "../../components/dialogs/appointments_dialog";
import { calculateGrowth, calculateGrowthByCount } from "~/lib/utils";

enum ChartMode {
   monthly,
   daily,
}

interface IDashboard {}

export default function Dashboard({}: IDashboard) {
   const bookings = useStore.use.bookings();

   const sellsAmountMetrics = useMemo(
      () => ({
         title: "Venta total",
         ...calculateGrowth(bookings),
      }),
      [bookings],
   );

   const sellsCountMetrics = useMemo(
      () => ({
         title: "Total de compras",
         ...calculateGrowthByCount(bookings),
      }),
      [bookings],
   );

   const [chartMode, setChartMode] = useState(ChartMode.monthly);
   const [dates, setDates] = useState<DateRange | undefined>({
      from: subDays(new Date(), 180),
      to: new Date(),
   });

   return (
      <div className="relative grid h-max grid-cols-[1fr_auto_auto]">
         <div className="grid h-max gap-5 px-12 py-10">
            <h2 className="text-4xl font-medium">Métricas generales</h2>
            <section className="grid grid-cols-3 gap-5">
               {[sellsAmountMetrics, sellsCountMetrics].map((el, i) => (
                  <DashboardCard className="grid gap-2" key={i}>
                     <h3 className="text-sm">{el.title}</h3>
                     <p className="text-xl font-semibold">{el.total}</p>
                     <p className="flex items-center gap-2 text-sm text-gray-700">
                        {el.grow < 0 ? (
                           <CaretDown className="text-red-500" />
                        ) : (
                           <CaretUp className="text-green-500" />
                        )}{" "}
                        {el.grow}%
                     </p>
                  </DashboardCard>
               ))}
            </section>
            <section>
               <DashboardCard className="grid gap-2">
                  <div className="flex items-center justify-between">
                     <h2 className="text-gray-700">
                        Reservas recientes (landing)
                     </h2>
                     <AppointmentsDialog />
                  </div>
                  <RecentAppointmentsTable />
               </DashboardCard>
            </section>
            <section>
               <DashboardCard className="grid gap-2">
                  <div className="flex justify-between">
                     <h2 className="text-gray-700">Rendimiento</h2>
                     <div className="flex gap-4">
                        <Select
                           value={chartMode.toString()}
                           onValueChange={val => setChartMode(Number(val))}
                        >
                           <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Selecciona un modo" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value={ChartMode.daily.toString()}>
                                 Diario
                              </SelectItem>
                              <SelectItem value={ChartMode.monthly.toString()}>
                                 Mensual
                              </SelectItem>
                           </SelectContent>
                        </Select>
                        <DateRangePicker dates={dates} setDates={setDates} />
                     </div>
                  </div>
                  <div className="h-80">
                     {(arr =>
                        arr.length ? (
                           chartMode === ChartMode.daily ? (
                              <DailyAppointmentsChart
                                 bookings={arr}
                                 dates={dates}
                              />
                           ) : (
                              <MonthlyAppointmentsChart
                                 bookings={arr}
                                 dates={dates}
                              />
                           )
                        ) : (
                           <div className="grid h-full place-content-center">
                              <p>No hay reservas para mostrar</p>
                           </div>
                        ))(
                        bookings.filter(
                           ({ createdAt }) =>
                              !dates ||
                              ((!dates.from || createdAt >= dates.from) &&
                                 (!dates.to || createdAt <= dates.to)),
                        ),
                     )}
                  </div>
               </DashboardCard>
            </section>
         </div>
         <Separator orientation="vertical" />
         <div className="sticky top-0 box-content grid h-max max-h-screen w-72 gap-6 overflow-y-auto px-4 py-7">
            <NextAppointments />
            <Notes />
         </div>
      </div>
   );
}
