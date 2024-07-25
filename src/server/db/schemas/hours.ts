import { text } from "drizzle-orm/pg-core";
import { createdAtColumn, createTable, uuidColumn } from "../utils";

export const hours = createTable("hours", {
   id: uuidColumn,

   value: text("value").notNull(),
   code: text("code").notNull(),
   displayValue: text("display_value").notNull(),

   createdAt: createdAtColumn,
});
