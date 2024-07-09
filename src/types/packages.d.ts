import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { packages } from "~/server/db/schemas/appointments";

type IPackage = InferSelectModel<typeof packages>;

type InsertPackage = InferInsertModel<typeof packages>;

type PackageAvailability = IPackage["availability"];
