import {
   boolean,
   integer,
   pgEnum,
   real,
   text,
   timestamp,
   uuid,
} from "drizzle-orm/pg-core";
import { createTable, createdAtColumn, uuidColumn } from "../utils";
import { createInsertSchema } from "drizzle-zod";

export const statusEnum = pgEnum("status", ["PAID", "PENDING", "ATTENDED"]);
export const paymentMethodEnum = pgEnum("payment_method", [
   "ONLINE",
   "ON_SITE",
   "LANDING",
   "COURTESY",
]);

export const appointments = createTable("appointment", {
   id: uuidColumn,
   date: timestamp("date", { withTimezone: true }).notNull(),
   clientNames: text("client_names").notNull(),
   clientEmail: text("client_email").notNull(),
   clientPhoneNumber: text("client_phone_number").notNull(),
   totalAmount: real("total_amount").notNull(),
   status: statusEnum("status").notNull(),
   paymentMethod: paymentMethodEnum("payment_method").notNull(),
   reference: text("reference").notNull(),

   createdAt: createdAtColumn,
});

export const packages = createTable("package", {
   id: uuidColumn,
   name: text("name").notNull(),
   price: real("price").notNull(),
   quantity: integer("quantity").notNull(),
   imageUrl: text("image_url").notNull(),
   active: boolean("active").notNull(),
   minutePrice: real("minute_price").notNull(),

   createdAt: createdAtColumn,
});

export const appointmentsPackages = createTable("appointment_pack", {
   id: uuidColumn,

   appointmentId: uuid("app_id")
      .references(() => appointments.id)
      .notNull(),

   packageId: uuid("pack_id")
      .references(() => packages.id)
      .notNull(),

   createdAt: createdAtColumn,
});

export const insertAppointmentSchema = createInsertSchema(appointments);
export const insertPackageSchema = createInsertSchema(packages);
export const insertAppointmentPackageSchema =
   createInsertSchema(appointmentsPackages);
