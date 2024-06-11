import type { InferSelectModel } from "drizzle-orm";
import type { appointments } from "~/server/db/schemas/packages";

type Appointment = InferSelectModel<typeof appointments>;
