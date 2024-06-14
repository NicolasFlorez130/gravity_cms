"use client";

import { useEffect } from "react";
import { useStore } from "~/lib/features/store";
import type { Appointment } from "~/types/appointments";

interface IBoSetter {
   appointments: Appointment[];
}

export default function BoSetter({ appointments }: IBoSetter) {
   const setAppointments = useStore.use.setAppointments();

   useEffect(() => {
      setAppointments(appointments);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [appointments]);

   return true;
}
