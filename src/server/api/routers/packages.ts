import { appointmentsPackages } from "~/server/db/schemas/packages_appointments";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { count } from "drizzle-orm";

//TODO: Change all procedures to private ones
export const packagesRouter = createTRPCRouter({
   getTotalPurchased: publicProcedure.query(({ ctx }) =>
      ctx.db.select({ count: count() }).from(appointmentsPackages),
   ),
});
