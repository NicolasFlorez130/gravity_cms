import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schemas/_index";

export const db = drizzle(sql, {
   schema,
});
