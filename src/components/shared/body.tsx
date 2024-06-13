"use client";

import { usePathname } from "next/navigation";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

interface IBody
   extends DetailedHTMLProps<
      HTMLAttributes<HTMLBodyElement>,
      HTMLBodyElement
   > {}

export default function Body({ className, children, ...props }: IBody) {
   const pathname = usePathname();

   return (
      <body
         className={cn(
            !pathname.includes("/bo/") && "bg-background-dark",
            className,
         )}
         {...props}
      >
         {children}
      </body>
   );
}
