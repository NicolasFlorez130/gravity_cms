import { type StateCreator } from "zustand";
import type { Booking, Appointment } from "~/types/appointments";

export interface AppointmentsSlice {
   bookings: Booking[];
   appointments: Appointment[];
   setAppointment: (arr: Appointment[]) => any;
   setBookings: (arr: Booking[]) => any;
   setServicesAndAppointments: (data: {
      bookings: Booking[];
      appointments: Appointment[];
   }) => any;
}

export const appointmentsSlice: StateCreator<AppointmentsSlice> = set => ({
   bookings: [],
   appointments: [],
   setAppointment: appointments => set(state => ({ ...state, appointments })),
   setBookings: bookings => set(state => ({ ...state, bookings })),
   setServicesAndAppointments: data => set({ ...data }),
});
