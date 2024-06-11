import { type StateCreator } from "zustand";
import type { Appointment } from "~/types/appointments";

export interface AppointmentsSlice {
   appointments: Appointment[];
   setAppointments: (arr: Appointment[]) => any;
}

export const appointmentsSlice: StateCreator<AppointmentsSlice> = set => ({
   appointments: [],
   setAppointments: appointments => set(state => ({ ...state, appointments })),
});
