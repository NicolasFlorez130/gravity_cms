"use client";

import { cn } from "~/lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Chip({ className, ...props }: ChipProps) {
   return (
      <div
         className={cn(
            "rounded-full text-center bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500",
            className,
         )}
         {...props}
      />
   );
}
