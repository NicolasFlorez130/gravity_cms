import type { InferSelectModel } from "drizzle-orm";
import type { appointments } from "~/server/db/schemas/packages_appointments";

type Appointment = InferSelectModel<typeof appointments>;

type AppointmentPaymentMethod = Appointment["paymentMethod"];

type AppointmentStatus = Appointment["status"];
