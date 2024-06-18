import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { packages } from "~/server/db/schemas/packages_appointments";

type Package = InferSelectModel<typeof packages>;

type InsertPackage = InferInsertModel<typeof packages>;

type PackageAvailability = Package["availability"];
