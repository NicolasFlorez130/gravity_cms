import { type InferSelectModel } from "drizzle-orm";
import { type images } from "~/server/db/schemas";

type IImage = InferSelectModel<typeof images>;
