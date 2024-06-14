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
import StatusBadge from "~/components/bo/ui/status_badge";
import { useEffect, useState } from "react";
import { Button } from "~/components/bo/ui/button";
import {
   CaretLeft,
   CaretRight,
   DotsThree,
} from "@phosphor-icons/react/dist/ssr";
import { Input } from "~/components/bo/ui/input";
import { Separator } from "~/components/bo/ui/separator";
import type { DateRange } from "react-day-picker";
import { cn, dateFilterFunction, formatCurrency } from "~/lib/utils";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from "~/components/bo/ui/dropdown-menu";
import { api } from "~/trpc/react";
import { useRouterRefresh } from "~/lib/hooks/useRouterRefresh";
import TableHeaderSortingToggle from "~/components/bo/ui/table_header_sorting_toggle";

interface IAllAppointmentsTable {
   dates: DateRange | undefined;
}

export default function AllAppointmentsTable({ dates }: IAllAppointmentsTable) {
   const { refresh } = useRouterRefresh();
   const [changingState, setChangingState] = useState<string>();

   const { mutate } = api.appointments.updateStatus.useMutation({
      onError: () => setChangingState(undefined),
      onSuccess: async () => {
         await refresh();
         setChangingState(undefined);
      },
   });

   const columns: ColumnDef<Appointment>[] = [
      {
         accessorKey: "clientNames",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Cliente
            </TableHeaderSortingToggle>
         ),
         cell: ({ row }) => <div>{row.getValue("clientNames")}</div>,
      },
      {
         accessorKey: "clientEmail",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Email
            </TableHeaderSortingToggle>
         ),
         cell: ({ row }) => <div>{row.getValue("clientEmail")}</div>,
      },
      {
         accessorKey: "date",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Fecha
            </TableHeaderSortingToggle>
         ),
         cell: ({ row }) => (
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            <div>{(row.getValue("date") as Date).toDateString()}</div>
         ),
         filterFn: dateFilterFunction,
      },
      {
         accessorKey: "totalAmount",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Total pagado
            </TableHeaderSortingToggle>
         ),
         cell: ({ row }) => (
            <div>{formatCurrency(Number(row.getValue("totalAmount")))}</div>
         ),
      },
      {
         accessorKey: "paymentMethod",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Método de pago
            </TableHeaderSortingToggle>
         ),
         cell: ({ row }) => (
            <PaymentMethodBadge paymentMethod={row.getValue("paymentMethod")} />
         ),
      },
      {
         accessorKey: "status",
         header: ({ column }) => (
            <TableHeaderSortingToggle column={column}>
               Estado
            </TableHeaderSortingToggle>
         ),
         cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
      },
      {
         id: "actions",
         enableHiding: false,
         cell: ({
            row: {
               original: { status, id },
            },
         }) => {
            const nextStatus = (() => {
               switch (status) {
                  case "PENDING":
                     return "PAID";
                  default:
                     return "ATTENDED";
               }
            })();

            return (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant="secondary"
                        disabled={status === "ATTENDED" || id === changingState}
                        className="h-8 w-8 p-0"
                     >
                        <span className="sr-only">Abrir menú</span>
                        <DotsThree size={16} />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuLabel>Cambiar estado</DropdownMenuLabel>
                     {status !== "ATTENDED" && (
                        <>
                           <DropdownMenuItem
                              onClick={() => {
                                 setChangingState(id);
                                 mutate({ id, status: nextStatus });
                              }}
                           >
                              {status === "PENDING" ? "Pagado" : "Atendido"}
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              onClick={() => {
                                 setChangingState(id);
                                 mutate({ id, status: "CANCELED" });
                              }}
                           >
                              Cancelado
                           </DropdownMenuItem>
                        </>
                     )}
                  </DropdownMenuContent>
               </DropdownMenu>
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
                           row.original.id === changingState && "opacity-50",
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
