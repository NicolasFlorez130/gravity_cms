import { boolean, text, timestamp } from "drizzle-orm/pg-core";
import { createTable, createdAtColumn, uuidColumn } from "../utils";
import { createInsertSchema } from "drizzle-zod";
import { z } from "~/lib/zod_lang";

export const notes = createTable("note", {
   id: uuidColumn,

   activeUntil: timestamp("active_until").notNull(),
   title: text("title").notNull(),
   description: text("description").notNull(),
   discarded: boolean("discarded").default(false),

   createdAt: createdAtColumn,
});

export const insertNoteSchema = createInsertSchema(notes, {
   description: z.string().min(1),
   title: z.string().min(1),
   activeUntil: z.date().min(new Date()),
});
