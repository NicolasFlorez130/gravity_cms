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
   const appointments = useStore.use.appointments();

   return (
      <Table>
         <TableHeader>
            <TableRow>
               <TableHead>Cliente</TableHead>
               <TableHead>Fecha</TableHead>
               <TableHead>Total pagado</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {appointments
               .sort(
                  ({ date: date_1 }, { date: date_2 }) =>
                     new Date(date_2).getTime() - new Date(date_1).getTime(),
               )
               .slice(0, 4)
               .map(transaction => (
                  <TableRow key={transaction.id}>
                     <TableCell>{transaction.clientNames}</TableCell>
                     <TableCell>
                        {new Date(transaction.date).toDateString()}
                     </TableCell>
                     <TableCell>
                        {formatCurrency(transaction.totalAmount)}
                     </TableCell>
                  </TableRow>
               ))}
         </TableBody>
      </Table>
   );
}
