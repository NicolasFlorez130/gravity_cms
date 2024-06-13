"use client";

import { type HTMLAttributes } from "react";
import { Card } from "~/components/bo/ui/card";
import { cn } from "~/lib/utils";

interface IDashboardCard extends HTMLAttributes<HTMLDivElement> {}

export default function DashboardCard({
   children,
   className,
   ...props
}: IDashboardCard) {
   return (
      <Card {...props} className={cn("border-none p-5 shadow", className)}>
         {children}
      </Card>
   );
}
