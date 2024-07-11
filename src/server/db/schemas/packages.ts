import {
   boolean,
   integer,
   pgEnum,
   real,
   text,
   uuid,
} from "drizzle-orm/pg-core";
import { createTable, createdAtColumn, uuidColumn } from "../utils";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const packageAvailabilityEnum = pgEnum("availability", [
   "EVERY_DAY",
   "WORK_DAYS",
   "WEEKEND",
]);

export const packageChangesTypeEnum = pgEnum("change_type", [
   "DELETE",
   "EDIT",
   "CREATE",
]);

export const packages = createTable("package", {
   id: uuidColumn,
   name: text("name").notNull(),
   price: real("price").notNull(),
   active: boolean("active").notNull(),
   minutePrice: real("minute_price").notNull(),
   availability: packageAvailabilityEnum("availability").notNull(),
   removed: boolean("removed").default(false),
   usersQuantity: integer("users_quantity").notNull(),
   forChildren: boolean("for_children").notNull(),
   description: text("description").notNull(),

   createdAt: createdAtColumn,
});

export const packageChanges = createTable("package_change", {
   id: uuidColumn,

   packageId: uuid("package_id")
      .notNull()
      .references(() => packages.id),
   changeType: packageChangesTypeEnum("change_type").notNull(),

   createdAt: createdAtColumn,
});

export const insertPackageSchema = createInsertSchema(packages, {
   name: z.string().min(1),
   price: z.number().min(1000),
   minutePrice: z.number().min(0),
   usersQuantity: z.number().min(1),
});

export const insertPackageChangeSchema = createInsertSchema(packageChanges);
