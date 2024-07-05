import { type StateCreator } from "zustand";
import type { Appointment, Service } from "~/types/appointments";

export interface AppointmentsSlice {
   appointments: Appointment[];
   services: Service[];
   setServices: (arr: Service[]) => any;
   setAppointments: (arr: Appointment[]) => any;
   setAll: (data: { appointments: Appointment[]; services: Service[] }) => any;
}

export const appointmentsSlice: StateCreator<AppointmentsSlice> = set => ({
   appointments: [],
   services: [],
   setServices: services => set(state => ({ ...state, services })),
   setAppointments: appointments => set(state => ({ ...state, appointments })),
   setAll: data => set({ ...data }),
});
