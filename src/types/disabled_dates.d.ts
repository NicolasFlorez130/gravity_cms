import type { InferSelectModel } from "drizzle-orm";
import { type disabledDays } from "~/server/db/schemas/disabled_days";

type DisabledDate = InferSelectModel<typeof disabledDays>;
