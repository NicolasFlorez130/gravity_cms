import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { packageChanges, packages } from "~/server/db/schemas/packages";

type IPackage = InferSelectModel<typeof packages>;

type IPackageChange = InferSelectModel<typeof packageChanges>;

type InsertPackage = InferInsertModel<typeof packages>;

type PackageAvailability = IPackage["availability"];
type PackageChangeType = IPackageChange["changeType"];
