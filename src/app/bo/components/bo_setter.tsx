"use client";

import { useEffect } from "react";
import { useStore } from "~/lib/features/store";
import type { Appointment, PopulatedAppointment } from "~/types/appointments";

interface IBoSetter {
   appointments: Appointment[];
   populatedAppointments: PopulatedAppointment[];
}

export default function BoSetter({
   appointments,
   populatedAppointments,
}: IBoSetter) {
   const setAll = useStore.use.setAll();

   useEffect(() => {
      setAll({
         appointments,
         populatedAppointments,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [appointments, populatedAppointments]);

   return true;
}
