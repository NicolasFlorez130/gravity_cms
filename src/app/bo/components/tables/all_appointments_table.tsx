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
import {
   type ColumnDef,
   type ColumnFiltersState,
   type SortingState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";
import type { Appointment } from "~/types/appointments";
import PaymentMethodBadge from "~/components/bo/ui/payment_method_badge";
import { useEffect, useState } from "react";
import { Button } from "~/components/bo/ui/button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Input } from "~/components/bo/ui/input";
import { Separator } from "~/components/bo/ui/separator";
import type { DateRange } from "react-day-picker";
import { cn, dateFilterFunction, formatDateInSpanish } from "~/lib/utils";
import { api } from "~/trpc/react";
import TableHeaderSortingToggle from "~/components/bo/ui/table_header_sorting_toggle";
import { useRouterRefresh } from "~/lib/hooks/useRouterRefresh";
import { Checkbox } from "~/components/bo/ui/checkbox";

interface IAllAppointmentsTable {
   dates: DateRange | undefined;
}

export default function AllAppointmentsTable({ dates }: IAllAppointmentsTable) {
   const { refresh } = useRouterRefresh();

   const [changingState, setChangingState] = useState<string>();

   const { mutate, isPending } =
      api.appointments.markServiceAsAttended.useMutation({
         onSuccess: async () => {
            await refresh();
            setChangingState(undefined);
         },
      });

   const columns: ColumnDef<Appointment>[] = [
      {
         accessorKey: "booking.clientNames",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Cliente
            </TableHeaderSortingToggle>
         ),
         cell: ({
            row: {
               original: { booking },
            },
         }) => <div>{booking.clientNames}</div>,
      },
      {
         accessorKey: "booking.clientEmail",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Email
            </TableHeaderSortingToggle>
         ),
         cell: ({
            row: {
               original: { booking },
            },
         }) => <div>{booking.clientEmail}</div>,
      },
      {
         accessorKey: "service.date",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Fecha
            </TableHeaderSortingToggle>
         ),
         cell: ({
            row: {
               original: { service },
            },
         }) => <div>{formatDateInSpanish(service.date)}</div>,
         filterFn: dateFilterFunction,
      },
      {
         accessorKey: "service.createdAt",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Fecha de creación
            </TableHeaderSortingToggle>
         ),
         cell: ({
            row: {
               original: { service },
            },
         }) => <div>{formatDateInSpanish(service.createdAt)}</div>,
         filterFn: dateFilterFunction,
      },
      {
         accessorKey: "booking.paymentMethod",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Método de pago
            </TableHeaderSortingToggle>
         ),
         cell: ({
            row: {
               original: { booking },
            },
         }) => <PaymentMethodBadge paymentMethod={booking.paymentMethod} />,
      },
      {
         accessorKey: "service.attended",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Atendido
            </TableHeaderSortingToggle>
         ),
         enableHiding: false,
         cell: ({
            row: {
               original: {
                  service: { id, attended },
               },
            },
         }) => {
            return (
               <Checkbox
                  checked={!!attended}
                  disabled={isPending || !!attended || id === changingState}
                  onClick={() => {
                     setChangingState(id);
                     mutate(id);
                  }}
               />
            );
         },
      },
   ];

   const data = useStore.use.appointments();

   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
   const [sorting, setSorting] = useState<SortingState>([]);

   const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 7,
   });

   const table = useReactTable({
      data,
      columns,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      autoResetAll: false,
      state: {
         sorting,
         pagination,
         columnFilters,
      },
   });

   useEffect(() => {
      table.getColumn("date")?.setFilterValue(dates);
   }, [dates, table]);

   return (
      <>
         <Table>
            <TableHeader>
               {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map(header => (
                        <TableHead key={header.id}>
                           {header.isPlaceholder
                              ? null
                              : flexRender(
                                   header.column.columnDef.header,
                                   header.getContext(),
                                )}
                        </TableHead>
                     ))}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                     <TableRow
                        key={row.id}
                        className={cn(
                           row.original.service.id === changingState &&
                              "opacity-50",
                        )}
                     >
                        {row.getVisibleCells().map(cell => (
                           <TableCell key={cell.id}>
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext(),
                              )}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                     >
                        No hay reservas para mostrar
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
         <Separator />
         <div className="flex justify-between px-6 py-4">
            <div className="flex items-center gap-2">
               <p>Página</p>{" "}
               <Input
                  className="w-20"
                  type="number"
                  min={0}
                  max={table.getPageCount()}
                  value={pagination.pageIndex + 1}
                  onChange={({ target: { value } }) =>
                     setPagination(prev => ({
                        ...prev,
                        pageIndex: Number(value) - 1,
                     }))
                  }
               />
               <p> de {table.getPageCount()}</p>
            </div>
            <div className="flex gap-3">
               <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
               >
                  <CaretLeft size={14} />
               </Button>
               <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
               >
                  <CaretRight size={14} />
               </Button>
            </div>
         </div>
      </>
   );
}
