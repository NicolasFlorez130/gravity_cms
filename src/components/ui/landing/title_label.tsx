"use client";

import { cn } from "~/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface ITitleLabel extends HTMLAttributes<HTMLParagraphElement> {}

export default function TitleLabel({ className, ...props }: ITitleLabel) {
   return (
      <p
         {...props}
         className={cn(
            "title_label font-din tracking-din text-muted xl:text-2xl",
            className,
         )}
      />
   );
}
