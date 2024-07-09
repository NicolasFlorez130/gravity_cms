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
import { z } from "zod";

export const services = createTable("service", {
   id: uuidColumn,
   bookingId: uuid("booking_id")
      .references(() => bookings.id)
      .notNull(),
   packageId: uuid("package_id")
      .references(() => packages.id)
      .notNull(),
   extraMinutes: integer("extra_minutes").default(0),
   date: timestamp("date", { withTimezone: true }).notNull(),
   attended: boolean("attended").default(false),

   createdAt: createdAtColumn,
});

export const insertServiceSchema = createInsertSchema(services, {
   date: z.date().min(setDateTimeTo0(new Date())),
   extraMinutes: z.number(),
});
