"use client";

import DashboardCard from "./components/dashboard_card";
import { CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "~/components/bo/ui/separator";
import { Button } from "~/components/bo/ui/button";
import { metrics } from "./mock/dashboard_mocks";
import RecentAppointmentsTable from "./components/recent_appointments_table";
import DailyAppointmentsChart from "./components/appointments_chart";
import { useStore } from "~/lib/features/store";
import { useState } from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "~/components/bo/ui/select";

enum ChartMode {
   monthly,
   daily,
}

interface IPage {}

export default function Page({}: IPage) {
   const [chartMode, setChartMode] = useState(ChartMode.daily);

   const appointments = useStore.use.appointments();

   return (
      <div className="grid min-h-full grid-cols-[1fr_auto_auto]">
         <div className="grid h-max gap-5 px-12 py-10">
            <h2 className="text-4xl font-medium">Métricas generales</h2>
            <section className="grid grid-cols-3 gap-5">
               {metrics.map((el, i) => (
                  <DashboardCard className="grid gap-2" key={i}>
                     <h3 className="text-sm">{el.title}</h3>
                     <p className="text-xl font-semibold">{el.value}</p>
                     <p className="flex items-center gap-2 text-sm text-gray-700">
                        {el.raise < 0 ? (
                           <CaretDown className="text-red-500" />
                        ) : (
                           <CaretUp className="text-green-500" />
                        )}{" "}
                        {el.raise}%
                     </p>
                  </DashboardCard>
               ))}
            </section>
            <section>
               <DashboardCard className="grid gap-2">
                  <div className="flex items-center justify-between">
                     <h2 className="text-gray-700">
                        Reservas recientes (online)
                     </h2>
                     <Button variant="secondary">Ver todos</Button>
                  </div>
                  <RecentAppointmentsTable />
               </DashboardCard>
            </section>
            <section>
               <DashboardCard className="grid gap-2">
                  <div className="flex justify-between">
                     <h2 className="text-gray-700">Rendimiento mensual</h2>
                     <div>
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
                     </div>
                  </div>
                  <div className="h-80">
                     {appointments.length ? (
                        chartMode === ChartMode.daily ? (
                           <DailyAppointmentsChart
                              appointments={appointments}
                           />
                        ) : (
                           <></>
                        )
                     ) : (
                        <div className="grid h-full place-content-center">
                           <p>No hay reservas para mostrar</p>
                        </div>
                     )}
                  </div>
               </DashboardCard>
            </section>
         </div>
         <Separator orientation="vertical" />
         <div className="px-10"></div>
      </div>
   );
}
