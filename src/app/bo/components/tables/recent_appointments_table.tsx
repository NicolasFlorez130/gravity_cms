"use client";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "~/components/bo/ui/table";
import { formatCurrency } from "~/lib/utils";
import { useStore } from "~/lib/features/store";

interface IRecentAppointmentsTable {}

export default function RecentAppointmentsTable({}: IRecentAppointmentsTable) {
   const appointments = useStore.use.populatedAppointments();

   return (
      <Table>
         <TableHeader>
            <TableRow>
               <TableHead>Cliente</TableHead>
               <TableHead>Fecha</TableHead>
               <TableHead>Total pagado</TableHead>
               <TableHead>Fecha de creación</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {appointments
               .filter(
                  ({ appointment: { paymentMethod } }) =>
                     paymentMethod === "LANDING",
               )
               .sort(
                  (
                     { appointment_pack: { createdAt: date_1 } },
                     { appointment_pack: { createdAt: date_2 } },
                  ) => date_2.getTime() - date_1.getTime(),
               )
               .slice(0, 4)
               .map(({ appointment, appointment_pack: { date } }) => (
                  <TableRow key={appointment.id}>
                     <TableCell>{appointment.clientNames}</TableCell>
                     <TableCell>{date.toDateString()}</TableCell>
                     <TableCell>
                        {formatCurrency(appointment.totalAmount)}
                     </TableCell>
                     <TableCell>
                        {appointment.createdAt.toDateString()}
                     </TableCell>
                  </TableRow>
               ))}
         </TableBody>
      </Table>
   );
}
