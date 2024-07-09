"use client";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "~/components/bo/ui/table";
import { useStore } from "~/lib/features/store";

interface IRecentAppointmentsTable {}

export default function RecentAppointmentsTable({}: IRecentAppointmentsTable) {
   const services = useStore.use.services();

   return (
      <Table>
         <TableHeader>
            <TableRow>
               <TableHead>Cliente</TableHead>
               <TableHead>Fecha de creación</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {services
               .filter(
                  ({ appointment: { paymentMethod } }) =>
                     paymentMethod === "LANDING",
               )
               .sort(
                  (
                     { appointment_pack: { date: date_1 } },
                     { appointment_pack: { createdAt: date_2 } },
                  ) => date_2.getTime() - date_1.getTime(),
               )
               .slice(0, 4)
               .map(({ appointment_pack, appointment }) => (
                  <TableRow key={appointment_pack.id}>
                     <TableCell>{appointment.clientNames}</TableCell>
                     <TableCell>
                        {appointment_pack.date.toDateString()}
                     </TableCell>
                  </TableRow>
               ))}
         </TableBody>
      </Table>
   );
}
