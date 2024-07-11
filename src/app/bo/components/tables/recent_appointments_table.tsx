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
import { formatDateInSpanish, setDateTimeTo0 } from "~/lib/utils";

interface IRecentAppointmentsTable {}

export default function RecentAppointmentsTable({}: IRecentAppointmentsTable) {
   const today = setDateTimeTo0(new Date());

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
                  ({ booking: { paymentMethod }, service: { createdAt } }) =>
                     paymentMethod === "LANDING" &&
                     createdAt.getTime() >= today.getTime(),
               )
               .sort(
                  (
                     { service: { createdAt: date_1 } },
                     { service: { createdAt: date_2 } },
                  ) => date_1.getTime() - date_2.getTime(),
               )
               .slice(0, 4)
               .map(({ service, booking }) => (
                  <TableRow key={service.id}>
                     <TableCell>{booking.clientNames}</TableCell>
                     <TableCell>
                        {formatDateInSpanish(service.createdAt)}
                     </TableCell>
                  </TableRow>
               ))}
         </TableBody>
      </Table>
   );
}
