import { set } from "date-fns";
import { sql } from "drizzle-orm";
import { pgTableCreator, timestamp, uuid } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(name => `gravity_${name}`);

export const createdAtColumn = timestamp("created_at", { withTimezone: true })
   .default(sql`CURRENT_TIMESTAMP`)
   .notNull();

export const uuidColumn = uuid("id").defaultRandom().primaryKey();

export function setDateTimeTo0(date: Date) {
   return set(date, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
   });
}

export function getBaseUrl() {
   if (typeof window !== "undefined") return window.location.origin;
   if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
   return `http://localhost:${process.env.PORT ?? 3000}`;
}
