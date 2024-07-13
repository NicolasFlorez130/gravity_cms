import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { desc, eq } from "drizzle-orm";
import { z } from "~/lib/zod_lang";
import { withId } from "~/lib/zod_lang";
import {
   insertPackageChangeSchema,
   insertPackageSchema,
   packageChanges,
   packages,
} from "~/server/db/schemas/packages";

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
   create: protectedProcedure
      .input(insertPackageSchema)
      .mutation(({ ctx, input }) =>
         ctx.db.insert(packages).values(input).returning({ id: packages.id }),
      ),

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

   getLastChanges: protectedProcedure
      .input(z.number())
      .query(({ ctx, input }) =>
         ctx.db
            .select()
            .from(packageChanges)
            .orderBy(desc(packageChanges.createdAt))
            .limit(input),
      ),

   registerNewChange: protectedProcedure
      .input(insertPackageChangeSchema)
      .mutation(({ ctx, input }) =>
         ctx.db.insert(packageChanges).values(input),
      ),
});
