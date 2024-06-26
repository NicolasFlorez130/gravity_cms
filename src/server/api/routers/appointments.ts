import { appointments } from "~/server/db/schemas/packages_appointments";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const appointmentsRouter = createTRPCRouter({
   getAll: protectedProcedure.query(({ ctx }) =>
      ctx.db.query.appointments.findMany({
         orderBy: ({ date }, { desc }) => desc(date),
      }),
   ),

   getNextAppointments: protectedProcedure
      .input(z.number())
      .query(({ ctx, input }) =>
         ctx.db.query.appointments.findMany({
            where: ({ date, status }, { gt, and, eq }) =>
               and(gt(date, new Date()), eq(status, "PAID")),
            orderBy: ({ date }, { asc }) => asc(date),
            limit: input,
         }),
      ),

   updateStatus: protectedProcedure
      .input(
         z.object({
            id: z.string(),
            status: z.enum(["PAID", "PENDING", "ATTENDED", "CANCELED"]),
         }),
      )
      .mutation(({ ctx, input: { id, status } }) =>
         ctx.db
            .update(appointments)
            .set({ status })
            .where(eq(appointments.id, id)),
      ),
});
