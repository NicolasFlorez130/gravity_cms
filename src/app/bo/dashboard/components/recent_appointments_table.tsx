"use client";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "~/components/bo/ui/table";
import { type Appointment } from "../mock/dashboard_mocks";
import { formatCurrency } from "~/lib/utils";

interface IRecentAppointmentsTable {
   transactions: Appointment[];
}

export default function RecentAppointmentsTable({
   transactions,
}: IRecentAppointmentsTable) {
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
            {transactions.map(transaction => (
               <TableRow key={transaction.id}>
                  <TableCell>{transaction.name}</TableCell>
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
