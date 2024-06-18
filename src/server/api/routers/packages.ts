import {
   appointmentsPackages,
   insertPackageSchema,
   packages,
} from "~/server/db/schemas/packages_appointments";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { count, eq } from "drizzle-orm";
import { z } from "zod";
import { withId } from "~/lib/zod_lang";

//TODO: Change all procedures to private ones
export const packagesRouter = createTRPCRouter({
   getTotalPurchased: publicProcedure.query(({ ctx }) =>
      ctx.db.select({ count: count() }).from(appointmentsPackages),
   ),
   getActivePackages: publicProcedure.query(({ ctx }) =>
      ctx.db.query.packages.findMany({
         where: ({ removed }, { eq }) => eq(removed, false),
      }),
   ),
   create: publicProcedure
      .input(insertPackageSchema)
      .mutation(({ ctx, input }) => ctx.db.insert(packages).values(input)),

   updateStatus: publicProcedure
      .input(z.object({ id: z.string(), active: z.boolean() }))
      .mutation(({ ctx, input: { active, id } }) =>
         ctx.db.update(packages).set({ active }).where(eq(packages.id, id)),
      ),

   deleteById: publicProcedure
      .input(z.string())
      .mutation(({ ctx, input }) =>
         ctx.db
            .update(packages)
            .set({ removed: true })
            .where(eq(packages.id, input)),
      ),

   update: publicProcedure
      .input(withId(insertPackageSchema))
      .mutation(({ ctx, input }) =>
         ctx.db.update(packages).set(input).where(eq(packages.id, input.id)),
      ),
});
