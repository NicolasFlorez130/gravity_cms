import { pgEnum, text } from "drizzle-orm/pg-core";
import { createTable, createdAtColumn, uuidColumn } from "../utils";

export const imageCategory = pgEnum("images_category", [
   "GALLERY",
   "INSTAGRAM_POSTS",
   "PROFILE_PICTURES",
]);

export const images = createTable("image", {
   id: uuidColumn,
   url: text("url").notNull(),
   category: imageCategory("category").notNull(),
   createdAt: createdAtColumn,
});
