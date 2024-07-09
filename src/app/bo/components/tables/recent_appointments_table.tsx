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
   const services = useStore.use.appointments();

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
                  ({ booking: { paymentMethod } }) =>
                     paymentMethod === "LANDING",
               )
               .sort(
                  (
                     { service: { date: date_1 } },
                     { service: { createdAt: date_2 } },
                  ) => date_2.getTime() - date_1.getTime(),
               )
               .slice(0, 4)
               .map(({ service, booking }) => (
                  <TableRow key={service.id}>
                     <TableCell>{booking.clientNames}</TableCell>
                     <TableCell>
                        {service.date.toDateString()}
                     </TableCell>
                  </TableRow>
               ))}
         </TableBody>
      </Table>
   );
}
