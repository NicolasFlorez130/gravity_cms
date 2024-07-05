"use client";

import { useEffect } from "react";
import { useStore } from "~/lib/features/store";
import type { Appointment, Service } from "~/types/appointments";

interface IBoSetter {
   appointments: Appointment[];
   services: Service[];
}

export default function BoSetter({ appointments, services }: IBoSetter) {
   const setAll = useStore.use.setAll();

   useEffect(() => {
      setAll({
         appointments,
         services,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [appointments, services]);

   return true;
}
