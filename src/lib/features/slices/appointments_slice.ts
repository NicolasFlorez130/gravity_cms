import { type StateCreator } from "zustand";
import type { Appointment, PopulatedAppointment } from "~/types/appointments";

export interface AppointmentsSlice {
   appointments: Appointment[];
   populatedAppointments: PopulatedAppointment[];
   setPopulatedAppointments: (arr: PopulatedAppointment[]) => any;
   setAppointments: (arr: Appointment[]) => any;
   setAll: (data: {
      appointments: Appointment[];
      populatedAppointments: PopulatedAppointment[];
   }) => any;
}

export const appointmentsSlice: StateCreator<AppointmentsSlice> = set => ({
   appointments: [],
   populatedAppointments: [],
   setPopulatedAppointments: populatedAppointments =>
      set(state => ({ ...state, populatedAppointments })),
   setAppointments: appointments => set(state => ({ ...state, appointments })),
   setAll: data => set({ ...data }),
});
