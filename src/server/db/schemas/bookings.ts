import { pgEnum, real, text } from "drizzle-orm/pg-core";
import { createTable, createdAtColumn, uuidColumn } from "../utils";
import { createInsertSchema } from "drizzle-zod";
import { onlyNumbers } from "~/lib/regex";
import { insertServiceSchema } from "./services";
import { z } from "~/lib/zod_lang";

export const paymentMethods = [
   "ONLINE",
   "ON_SITE",
   "LANDING",
   "COURTESY",
] as const;

export const paymentMethodEnum = pgEnum("payment_method", paymentMethods);

export const bookings = createTable("booking", {
   id: uuidColumn,
   clientNames: text("client_names").notNull(),
   clientEmail: text("client_email").notNull(),
   clientPhoneNumber: text("client_phone_number").notNull(),
   totalAmount: real("total_amount").notNull(),
   paymentMethod: paymentMethodEnum("payment_method").notNull(),

   createdAt: createdAtColumn,
});

export const insertBookingSchema = createInsertSchema(bookings, {
   clientEmail: z.string().min(1).email(),
   clientNames: z.string().min(1),
   clientPhoneNumber: z.string().regex(onlyNumbers),
});

export const bookAppointmentSchema = insertBookingSchema.extend({
   packages: z.array(insertServiceSchema.omit({ bookingId: true })).min(1),
});
