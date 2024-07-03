import type { InferSelectModel } from "drizzle-orm";
import type { opinions } from "~/server/db/schemas/opinions";

type IOpinion = InferSelectModel<typeof opinions>;
