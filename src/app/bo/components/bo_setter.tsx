"use client";

import { useStore } from "~/lib/features/store";
import type { Appointment } from "~/types/appointments";

interface IBoSetter {
   appointments: Appointment[];
}

export default function BoSetter({ appointments }: IBoSetter) {
   const setAppointments = useStore.use.setAppointments();

   setAppointments(appointments);

   return true;
}
