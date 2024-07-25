import { timestamp } from "drizzle-orm/pg-core";
import { createTable, createdAtColumn, uuidColumn } from "../utils";
import { createInsertSchema } from "drizzle-zod";

export const disabledDays = createTable("disabled_day", {
   id: uuidColumn,

   date: timestamp("date").notNull(),

   createdAt: createdAtColumn,
});

export const disabledDaysSchema = createInsertSchema(disabledDays);
