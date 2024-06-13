"use client";

import { Button } from "~/components/bo/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "~/components/bo/ui/dialog";
import { useState } from "react";
import { convertAppointmentsToExcel } from "~/lib/utils";
import type { DateRange } from "react-day-picker";
import { DateRangePicker } from "~/components/bo/ui/date_range_picker";
import { useStore } from "~/lib/features/store";
import AllAppointmentsTable from "../tables/all_appointments_table";
import { api } from "~/trpc/react";

interface IAppointmentsDialog {}

export default function AppointmentsDialog({}: IAppointmentsDialog) {
   const appointments = useStore.use.appointments();

   const { data, isFetching, isError } =
      api.packages.getTotalPurchased.useQuery();

   const [dates, setDates] = useState<DateRange | undefined>({
      from: undefined,
      to: undefined,
   });

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="secondary">Ver todos</Button>
         </DialogTrigger>
         <DialogContent className="grid h-[90vh] w-[90vw] max-w-none grid-rows-[auto_auto_1fr_auto_auto] gap-0 overflow-auto p-0 text-black">
            <DialogHeader className="px-6 py-4">
               <DialogTitle className="text-base font-medium">
                  Listado completo de reservas
               </DialogTitle>
            </DialogHeader>
            <div className="flex justify-between bg-bo-violet-light p-4">
               <DateRangePicker dates={dates} setDates={setDates} />
               <div className="flex gap-10">
                  <div className="grid gap-1">
                     <p className="text-sm opacity-50">Planes comprados</p>
                     <p className="text-xl font-medium">
                        {isFetching
                           ? "Cargando..."
                           : isError
                             ? "Ocurrió un error"
                             : data?.at(0)?.count}
                     </p>
                  </div>
                  <Button
                     variant="purple"
                     onClick={() =>
                        convertAppointmentsToExcel(
                           appointments,
                           "appointments.xlsx",
                           dates,
                        )
                     }
                  >
                     Descarar XLSX
                  </Button>
               </div>
            </div>
            <AllAppointmentsTable dates={dates} />
         </DialogContent>
      </Dialog>
   );
}
