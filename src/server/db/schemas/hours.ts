import { integer, text } from "drizzle-orm/pg-core";
import { createdAtColumn, createTable, uuidColumn } from "../utils";

export const hours = createTable("hours", {
   id: uuidColumn,

   code: text("code").notNull(),
   displayValue: text("display_value").notNull(),
   hour: integer("hour").notNull(),
   minute: integer("minute").notNull(),

   createdAt: createdAtColumn,
});
