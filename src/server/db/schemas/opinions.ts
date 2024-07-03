import { text, uuid } from "drizzle-orm/pg-core";
import { createTable, createdAtColumn, uuidColumn } from "../utils";
import { images } from "./images";

export const opinions = createTable("opinion", {
   id: uuidColumn,
   profilePicture: uuid("profile_picture")
      .references(() => images.id)
      .notNull(),
   name: text("name").notNull(),
   text: text("text").notNull(),

   created_at: createdAtColumn,
});
