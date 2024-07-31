import { boolean, integer, timestamp, uuid } from "drizzle-orm/pg-core";
import {
   createTable,
   createdAtColumn,
   setDateTimeTo0,
   uuidColumn,
} from "../utils";
import { packages } from "./packages";
import { bookings } from "./bookings";
import { createInsertSchema } from "drizzle-zod";
import { z } from "~/lib/zod_lang";
import { hours } from "./hours";

export const services = createTable("service", {
   id: uuidColumn,
   bookingId: uuid("booking_id")
      .references(() => bookings.id)
      .notNull(),
   packageId: uuid("package_id")
      .references(() => packages.id)
      .notNull(),
   extraMinutes: integer("extra_minutes").notNull(),
   date: timestamp("date", { withTimezone: true }).notNull(),
   attended: boolean("attended").default(false),
   hourId: uuid("hour_id")
      .references(() => hours.id)
      .notNull(),

   createdAt: createdAtColumn,
});

export const insertServiceSchema = createInsertSchema(services, {
   date: z.date().min(setDateTimeTo0(new Date())),
   extraMinutes: z.number().min(0),
});
