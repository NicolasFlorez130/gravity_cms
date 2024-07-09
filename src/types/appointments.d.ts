import type { InferSelectModel } from "drizzle-orm";
import type {
   bookings,
   services,
} from "~/server/db/schemas/appointments";

type Appointment = InferSelectModel<typeof bookings>;
type AppointmentsPackages = InferSelectModel<typeof services>;

type Service = {
   appointment_pack: AppointmentsPackages;
   appointment: Appointment;
};

type AppointmentPaymentMethod = Appointment["paymentMethod"];
