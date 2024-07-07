import {
   boolean,
   integer,
   pgEnum,
   real,
   text,
   timestamp,
   uuid,
} from "drizzle-orm/pg-core";
import {
   createTable,
   createdAtColumn,
   setDateTimeTo0,
   uuidColumn,
} from "../utils";
import { createInsertSchema } from "drizzle-zod";
import { z } from "~/lib/zod_lang";

export const statusEnum = pgEnum("status", [
   "PAID",
   "PENDING",
   // "ATTENDED",
   "CANCELED",
]);

export const paymentMethods = [
   "ONLINE",
   "ON_SITE",
   "LANDING",
   "COURTESY",
] as const;

export const paymentMethodEnum = pgEnum("payment_method", paymentMethods);
export const packageAvailabilityEnum = pgEnum("availability", [
   "EVERY_DAY",
   "WORK_DAYS",
   "WEEKEND",
]);

export const appointments = createTable("appointment", {
   id: uuidColumn,
   clientNames: text("client_names").notNull(),
   clientEmail: text("client_email").notNull(),
   clientPhoneNumber: text("client_phone_number").notNull(),
   totalAmount: real("total_amount").notNull(),
   paymentMethod: paymentMethodEnum("payment_method").notNull(),
   reference: text("reference").notNull(),
   status: statusEnum("status").notNull(),

   createdAt: createdAtColumn,
});

export const packages = createTable("package", {
   id: uuidColumn,
   name: text("name").notNull(),
   price: real("price").notNull(),
   active: boolean("active").notNull(),
   minutePrice: real("minute_price").notNull(),
   availability: packageAvailabilityEnum("availability").notNull(),
   removed: boolean("removed").default(false),
   usersQuantity: integer("users_quantity").notNull(),
   forChildren: boolean("for_children").notNull(),
   description: text("description").notNull(),

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
   extraMinutes: integer("extra_minutes").default(0),
   date: timestamp("date", { withTimezone: true }).notNull(),
   attended: boolean("attended").default(false),

   createdAt: createdAtColumn,
});

export const insertAppointmentSchema = createInsertSchema(appointments);
export const insertPackageSchema = createInsertSchema(packages, {
   name: z.string().min(1),
   price: z.number().min(0),
   minutePrice: z.number().min(0),
   usersQuantity: z.number().min(1),
});
export const insertAppointmentPackageSchema = createInsertSchema(
   appointmentsPackages,
   {
      date: z.date().min(setDateTimeTo0(new Date())),
      extraMinutes: z.number(),
   },
);
export const bookAppointmentSchema = insertAppointmentSchema.extend({
   packages: z
      .array(insertAppointmentPackageSchema.omit({ appointmentId: true }))
      .min(1),
});
