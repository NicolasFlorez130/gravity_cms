"use client";

import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

interface ILoading {}

export default function Loading({}: ILoading) {
   return (
      <div className="flex items-center gap-2">
         Cargando <CircleNotch className="animate-spin" size={16} />
      </div>
   );
}
