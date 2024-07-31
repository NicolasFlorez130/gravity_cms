import type { InferSelectModel } from "drizzle-orm";
import type { hours } from "~/server/db/schemas/hours";

type IHour = InferSelectModel<typeof hours>;
