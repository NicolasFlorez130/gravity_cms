import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { notes } from "~/server/db/schemas/notes";

type Note = InferSelectModel<typeof notes>;

type InsertNote = InferInsertModel<typeof notes>;
