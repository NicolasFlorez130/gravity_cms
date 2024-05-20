"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface ITitleLabel extends HTMLAttributes<HTMLParagraphElement> {}

export default function TitleLabel({ className, ...props }: ITitleLabel) {
   return (
      <p
         {...props}
         className={cn("tracking-din font-din text-muted", className)}
      />
   );
}
