import { eq } from "drizzle-orm";
import { z } from "zod";
import {
   createTRPCRouter,
   protectedProcedure,
   publicProcedure,
} from "~/server/api/trpc";
import {
   disabledDays,
   disabledDaysSchema,
} from "~/server/db/schemas/disabled_days";
import { setDateTimeTo0 } from "~/server/db/utils";

export const disabledDaysRouter = createTRPCRouter({
   getAll: publicProcedure.query(({ ctx }) =>
      ctx.db.query.disabledDays.findMany(),
   ),

   getAllNext: publicProcedure.query(({ ctx }) =>
      ctx.db.query.disabledDays.findMany({
         where: ({ date }, { gte }) => gte(date, setDateTimeTo0(new Date())),
      }),
   ),

   deleteDisableDate: protectedProcedure
      .input(z.string())
      .mutation(({ ctx, input }) =>
         ctx.db.delete(disabledDays).where(eq(disabledDays.id, input)),
      ),

   disableDates: protectedProcedure
      .input(z.array(disabledDaysSchema))
      .mutation(({ ctx, input }) => ctx.db.insert(disabledDays).values(input)),
});
