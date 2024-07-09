import type { InferSelectModel } from "drizzle-orm";
import type { bookings } from "~/server/db/schemas/bookings";
import type { services } from "~/server/db/schemas/services";

type Booking = InferSelectModel<typeof bookings>;
type Service = InferSelectModel<typeof services>;

type Appointment = {
   service: Service;
   booking: Booking;
};

type AppointmentPaymentMethod = Booking["paymentMethod"];
