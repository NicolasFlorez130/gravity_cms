import type { InferSelectModel } from "drizzle-orm";
import type { appointmentConfirmations } from "~/server/db/schemas/appointments";
import type { bookings } from "~/server/db/schemas/bookings";
import type { services } from "~/server/db/schemas/services";

type Booking = InferSelectModel<typeof bookings>;
type Service = InferSelectModel<typeof services>;
type AppointmentConfirmation = InferSelectModel<
   typeof appointmentConfirmations
>;

type Appointment = {
   service: Service;
   booking: Booking;
   appointment_confirmation: AppointmentConfirmation;
};

type AppointmentPaymentMethod = Booking["paymentMethod"];
