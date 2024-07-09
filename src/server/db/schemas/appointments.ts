import { text, uuid } from "drizzle-orm/pg-core";
import { createTable, createdAtColumn, uuidColumn } from "../utils";
import { bookings } from "./bookings";

export const appointmentConfirmations = createTable(
   "appointment_confirmation",
   {
      id: uuidColumn,

      bookingId: uuid("booking_id")
         .notNull()
         .references(() => bookings.id),
      paymentReference: text("payment_reference").notNull(),

      createdAt: createdAtColumn,
   },
);
