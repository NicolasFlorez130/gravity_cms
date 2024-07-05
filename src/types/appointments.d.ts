import type { InferSelectModel } from "drizzle-orm";
import type {
   appointments,
   appointmentsPackages,
} from "~/server/db/schemas/packages_appointments";

type Appointment = InferSelectModel<typeof appointments>;
type AppointmentsPackages = InferSelectModel<typeof appointmentsPackages>;

type Service = {
   appointment_pack: AppointmentsPackages;
   appointment: Appointment;
};

type AppointmentPaymentMethod = Appointment["paymentMethod"];

type AppointmentStatus = AppointmentsPackages["status"];
