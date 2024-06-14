import { appointments } from "~/server/db/schemas/packages_appointments";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";

//TODO: Change all procedures to private ones
export const appointmentsRouter = createTRPCRouter({
   getAll: publicProcedure.query(({ ctx }) =>
      ctx.db.query.appointments.findMany({
         orderBy: ({ date }, { desc }) => desc(date),
      }),
   ),

   getNextAppointments: publicProcedure
      .input(z.number())
      .query(({ ctx, input }) =>
         ctx.db.query.appointments.findMany({
            where: ({ date, status }, { gt, and, eq }) =>
               and(gt(date, new Date()), eq(status, "PAID")),
            orderBy: ({ date }, { asc }) => asc(date),
            limit: input,
         }),
      ),

   updateStatus: publicProcedure
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
