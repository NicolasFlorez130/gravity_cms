"use client";

import { Chip } from "~/components/bo/ui/chip";
import { availabilityOptions, cn } from "~/lib/utils";
import type { PackageAvailability } from "~/types/packages";

interface IAvailabilityChip {
   value: PackageAvailability;
}

export default function AvailabilityChip({ value }: IAvailabilityChip) {
   const availability = availabilityOptions.find(opt => opt.value === value)!;

   return (
      <Chip className={cn("rounded-lg", availability.colors)}>
         {availability.label}
      </Chip>
   );
}
