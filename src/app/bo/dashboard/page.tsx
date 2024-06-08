"use client";

import DashboardCard from "./components/dashboard_card";
import { CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "~/components/bo/ui/separator";
import { Button } from "~/components/bo/ui/button";
import { metrics, appointments } from "./mock/dashboard_mocks";
import RecentAppointmentsTable from "./components/recent_appointments_table";
import AppointmentsChart from "./components/appointments_chart";

interface IPage {}

export default function Page({}: IPage) {
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
                  <RecentAppointmentsTable
                     transactions={appointments
                        .sort(
                           ({ date: date_1 }, { date: date_2 }) =>
                              new Date(date_2).getTime() -
                              new Date(date_1).getTime(),
                        )
                        .slice(0, 4)}
                  />
               </DashboardCard>
            </section>
            <section>
               <DashboardCard className="grid gap-2">
                  <h2 className="text-gray-700">Rendimiento mensual</h2>
                  <div className="h-80">
                     {/* <AppointmentsChart appointments={appointments} /> */}
                  </div>
               </DashboardCard>
            </section>
         </div>
         <Separator orientation="vertical" />
         <div className="px-10"></div>
      </div>
   );
}
