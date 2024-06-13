"use client";

import type { Column } from "@tanstack/react-table";
import { Button, type ButtonProps } from "./button";
import {
   CaretDown,
   CaretUp,
   CaretUpDown,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "~/lib/utils";

interface ITableHeaderSortingToggle<T> extends ButtonProps {
   column: Column<T>;
}

export default function TableHeaderSortingToggle<T>({
   column,
   className,
   children,
   ...props
}: ITableHeaderSortingToggle<T>) {
   const isAsc = column.getIsSorted() === "asc";

   return (
      <Button
         variant="ghost"
         className={cn("flex items-center justify-center gap-2", className)}
         {...props}
         onClick={() => column.toggleSorting(isAsc)}
      >
         {children}
         {!column.getIsSorted() ? (
            <CaretUpDown size={16} />
         ) : isAsc ? (
            <CaretDown size={16} />
         ) : (
            <CaretUp size={16} />
         )}
      </Button>
   );
}
