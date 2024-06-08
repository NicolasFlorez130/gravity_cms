import { text } from "drizzle-orm/pg-core";
import { createTable, createdAtColumn, uuidColumn } from "../utils";

export const opinions = createTable("opinion", {
   id: uuidColumn,
   profilePicture: text("profile_picture").notNull(),
   name: text("name").notNull(),
   text: text("text").notNull(),

   created_at: createdAtColumn,
});
