import {
   appointmentsPackages,
   insertPackageSchema,
   packages,
} from "~/server/db/schemas/packages_appointments";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { count, eq } from "drizzle-orm";
import { z } from "zod";
import { withId } from "~/lib/zod_lang";

export const packagesRouter = createTRPCRouter({
   getAll: publicProcedure.query(({ ctx }) =>
      ctx.db.query.packages.findMany({
         where: ({ removed }, { eq }) => eq(removed, false),
      }),
   ),
   getActivePackages: publicProcedure.query(({ ctx }) =>
      ctx.db.query.packages.findMany({
         where: ({ removed, active }, { eq, and }) =>
            and(eq(removed, false), eq(active, true)),
      }),
   ),
   getTotalPurchased: protectedProcedure.query(({ ctx }) =>
      ctx.db.select({ count: count() }).from(appointmentsPackages),
   ),
   create: protectedProcedure
      .input(insertPackageSchema)
      .mutation(({ ctx, input }) => ctx.db.insert(packages).values(input)),

   updateStatus: protectedProcedure
      .input(z.object({ id: z.string(), active: z.boolean() }))
      .mutation(({ ctx, input: { active, id } }) =>
         ctx.db.update(packages).set({ active }).where(eq(packages.id, id)),
      ),

   deleteById: protectedProcedure
      .input(z.string())
      .mutation(({ ctx, input }) =>
         ctx.db
            .update(packages)
            .set({ removed: true })
            .where(eq(packages.id, input)),
      ),

   update: protectedProcedure
      .input(withId(insertPackageSchema))
      .mutation(({ ctx, input }) =>
         ctx.db.update(packages).set(input).where(eq(packages.id, input.id)),
      ),
});
